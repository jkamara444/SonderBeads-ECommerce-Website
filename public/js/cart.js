document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.addcart');
    const subtotalElement = document.querySelector('.totalamt h4');
    const cartCountElement = document.querySelector('#order-icon span');
    const popoutCart = document.querySelector('#popout-cart');
    const overlay = document.querySelector('#overlay');


    document.querySelectorAll('.item-type').forEach(select => {
        select.addEventListener('change', (event) => {
            const selectedOption = event.target.selectedOptions[0];
            const unitPrice = parseFloat(selectedOption.getAttribute('data-price'));
            const parentItem = event.target.closest('.item-text-container');
            const priceElement = parentItem.querySelector('h4');
            if (priceElement) {
                priceElement.textContent = `$${unitPrice.toFixed(2)}`;
            }
        });
    });

    function updateCart(item) {
        const minusButton = item.querySelector('.minus');
        const plusButton = item.querySelector('.plus');
        const quantityElement = item.querySelector('.quantity');
        const cartTotalElement = item.querySelector('.carttotal');
        const unitPriceElement = item.querySelector('.unit-price');
        let unitPrice = parseFloat(unitPriceElement.textContent.replace('$', ''));

        function updateQuantity(change) {
            let quantity = parseInt(quantityElement.textContent) + change;
            if (quantity <= 0) {
                item.remove();
                updateSubtotal();
                updateCartCount();
                updateLocalStorage();
                return;
            }
            quantityElement.textContent = quantity;
            cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
            updateSubtotal();
            updateCartCount();
            updateLocalStorage();
        }

        minusButton.addEventListener('click', () => updateQuantity(-1));
        plusButton.addEventListener('click', () => updateQuantity(1));

        const showNoteLink = item.querySelector('.show-note');
        if (showNoteLink) {
            showNoteLink.addEventListener('click', () => {
                const noteParagraph = item.querySelector('.note');
                if (noteParagraph) {
                    noteParagraph.style.display = noteParagraph.style.display === 'none' ? 'block' : 'none';
                    showNoteLink.textContent = noteParagraph.style.display === 'none' ? 'Show Note' : 'Hide Note';
                }
            });
        }
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const parentItem = button.closest('.item-text-container');
            const productName = parentItem.querySelector('h2').innerText;
            const selectedColor = parentItem.querySelector('#color')?.value || 'N/A';
            const size = parentItem.querySelector('#size')?.value || '';
            if (!size) {
                alert('Size needs to be inputted');
                return;
            }
            const size2 = parentItem.querySelector('#size2')?.value || '';
            const selectedSize = size ? (size2 ? `${size} in / ${size2} in` : `${size} in`) : '';
            const selectedTypeElement = parentItem.querySelector('#type');
            const selectedType = selectedTypeElement ? selectedTypeElement.value : 'N/A';
            const customNote = parentItem.querySelector('#note')?.value || 'N/A';
            const unitPriceElement = parentItem.querySelector('h4');
            let unitPrice = 0;
            if (unitPriceElement) {
                unitPrice = parseFloat(unitPriceElement.textContent.replace('$', ''));
            } else if (selectedTypeElement && selectedTypeElement.tagName === 'SELECT') {
                const selectedOption = selectedTypeElement.selectedOptions[0];
                unitPrice = parseFloat(selectedOption.getAttribute('data-price')) || 0;
            }

            const firstImageSrc = document.querySelector('#main-carousel .splide__slide img')?.src || '';

            let cartItem = Array.from(document.querySelectorAll('.cartlist')).find(item => {
                const cartItemName = item.querySelector('.cartname').textContent.trim();
                const cartItemColor = item.querySelector('.item-description .color')?.textContent || 'N/A';
                const cartItemSize = item.querySelector('.item-description .size')?.textContent || 'N/A';
                const cartItemType = item.querySelector('.item-description .type')?.textContent.replace('Type: ', '') || 'N/A';
                const cartItemNote = item.querySelector('.item-description .note')?.textContent || 'N/A';

                return (
                    cartItemName === productName &&
                    cartItemColor === selectedColor &&
                    cartItemSize === selectedSize &&
                    cartItemType === selectedType &&
                    cartItemNote === customNote
                );
            });
            if (cartItem) {
                console.log('Item already in cart');
                const quantityElement = cartItem.querySelector('.quantity');
                const cartTotalElement = cartItem.querySelector('.carttotal');
                const quantity = parseInt(quantityElement.textContent) + 1;
                quantityElement.textContent = quantity;
                cartTotalElement.textContent = `$${(unitPrice * quantity).toFixed(2)}`;
                updateSubtotal();
                updateCartCount();
                updateLocalStorage();
            } else {
                console.log('Adding new item to cart');
                const cartItem = document.createElement('div');
                cartItem.classList.add('cartlist');
                cartItem.innerHTML = `
                    <div class="cartimg">
                        <img src="${firstImageSrc}" alt="${productName}">
                    </div>
                    <div class="cartdetails">
                        <div class="cartname">${productName}</div>
                        <div class="item-description">
                            ${selectedColor !== 'N/A' ? `<p class="color">${selectedColor}</p>` : ''}
                            ${selectedSize ? `<p class="size">${selectedSize}</p>` : ''}
                            ${selectedType !== 'N/A' ? `<p class="type">Type: ${selectedType}</p>` : ''}
                            ${customNote !== 'N/A' ? `
                                <a href="#" class="show-note">Show Note</a>
                                <p class="note" style="display: none;">${customNote}</p>
                            ` : ''}
                        </div>
                        <div class="cartquantity">
                            <span class="minus">&lt;</span>
                            <span class="quantity">1</span>
                            <span class="plus">&gt;</span>
                        </div>
                    </div>
                    <div class="carttotal" data-unit-price="${unitPrice.toFixed(2)}">$${unitPrice.toFixed(2)}</div>
                    <div class="unit-price" style="display: none;">$${unitPrice.toFixed(2)}</div>
                `;

                const cartContainer = document.querySelector('#popout-cart .carttab');
                if (cartContainer) {
                    cartContainer.appendChild(cartItem);
                }

                updateCart(cartItem);
                updateSubtotal();
                updateCartCount();
                updateLocalStorage();

                popoutCart.classList.add('show');
                overlay.classList.add('show');
            }
        });
    });


    function updateSubtotal() {
        let subtotal = 0;
        document.querySelectorAll('.carttotal').forEach(cartTotalElement => {
            subtotal += parseFloat(cartTotalElement.textContent.replace('$', ''));
        });
        subtotalElement.textContent = `$${subtotal.toFixed(2)} USD`;
    }

    function updateCartCount() {
        let totalItems = 0;
        document.querySelectorAll('.cartlist').forEach(cartItem => {
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent);
            totalItems += quantity;
        });
        cartCountElement.textContent = totalItems;
    }

    function updateLocalStorage() {
        const cartItems = [];
        document.querySelectorAll('.cartlist').forEach(cartItem => {
            const productName = cartItem.querySelector('.cartname').textContent;
            const selectedColor = cartItem.querySelector('.item-description .color')?.textContent || '';
            const selectedSize = cartItem.querySelector('.item-description .size')?.textContent || '';
            const selectedType = cartItem.querySelector('.item-description .type')?.textContent || '';
            const customNote = cartItem.querySelector('.item-description .note')?.textContent || '';
            const unitPrice = parseFloat(cartItem.querySelector('.carttotal').getAttribute('data-unit-price'));
            const quantity = parseInt(cartItem.querySelector('.quantity').textContent, 10);
            const firstImageSrc = cartItem.querySelector('.cartimg img')?.src || '';

            cartItems.push({
                productName,
                selectedColor,
                selectedSize,
                selectedType,
                customNote,
                unitPrice,
                quantity,
                firstImageSrc
            });
        });

        localStorage.setItem('cart', JSON.stringify(cartItems));
    }


    function loadCartFromLocalStorage() {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

        // Clear existing cart items
        const cartContainer = document.querySelector('#popout-cart .carttab');
        if (cartContainer) {
            cartContainer.innerHTML = '';
        }

        cartItems.forEach(item => {
            const existingCartItem = Array.from(cartContainer.querySelectorAll('.cartlist')).find(cartItem =>
                cartItem.querySelector('.cartname').textContent.trim() === item.productName &&
                cartItem.querySelector('.item-description .color')?.textContent === item.selectedColor &&
                cartItem.querySelector('.item-description .size')?.textContent === item.selectedSize &&
                cartItem.querySelector('.item-description .type')?.textContent === item.selectedType &&
                cartItem.querySelector('.item-description .note')?.textContent === item.customNote
            );


            if (existingCartItem) {
                // Update existing item
                const quantityElement = existingCartItem.querySelector('.quantity');
                const cartTotalElement = existingCartItem.querySelector('.carttotal');
                const newQuantity = parseInt(quantityElement.textContent, 10) + item.quantity;
                const unitPrice = parseFloat(cartTotalElement.getAttribute('data-unit-price'));

                quantityElement.textContent = newQuantity;
                cartTotalElement.textContent = `$${(unitPrice * newQuantity).toFixed(2)}`;
            } else {
                // Add new item
                const cartItem = document.createElement('div');
                cartItem.classList.add('cartlist');

                cartItem.innerHTML = `
                    <div class="cartimg">
                        <img src="${item.firstImageSrc}" alt="${item.productName}">
                    </div>
                    <div class="cartdetails">
                        <div class="cartname">${item.productName}</div>
                        <div class="item-description">
                            ${item.selectedColor ? `<p class="color">${item.selectedColor}</p>` : ''}
                            ${item.selectedSize ? `<p class="size">${item.selectedSize}</p>` : ''}
                            ${item.selectedType ? `<p class="type">${item.selectedType}</p>` : ''}
                            ${item.customNote ? `
                                <a href="#" class="show-note">Show Note</a>
                                <p class="note" style="display: none;">${item.customNote}</p>
                            ` : ''}
                        </div>
                        <div class="cartquantity">
                            <span class="minus">&lt;</span>
                            <span class="quantity">${item.quantity}</span>
                            <span class="plus">&gt;</span>
                        </div>
                    </div>
                    <div class="carttotal" data-unit-price="${item.unitPrice.toFixed(2)}">$${(item.unitPrice * item.quantity).toFixed(2)}</div>
                    <div class="unit-price" style="display: none;">$${item.unitPrice.toFixed(2)}</div>
                `;

                if (cartContainer) {
                    cartContainer.appendChild(cartItem);
                }
                updateCart(cartItem);
            }
        });

        updateSubtotal();
        updateCartCount();
    }

    function updateCartFromLocalStorage(event) {
        if (event.key === 'cart') {
            loadCartFromLocalStorage();
        }
    }

    window.addEventListener('storage', updateCartFromLocalStorage);

    function clearCart() {
        document.querySelectorAll('.cartlist').forEach(item => item.remove());
        updateSubtotal();
        updateCartCount();
        localStorage.removeItem('cart');
    }

    const checkoutButton = document.querySelector('.checkout');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', clearCart);
    }

    loadCartFromLocalStorage(); // Load cart items from local storage on page load
});