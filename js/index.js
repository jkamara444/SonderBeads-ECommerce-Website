import AOS from "simple-aos";
import 'animate.css';

AOS.init();



document.addEventListener('DOMContentLoaded', () => {
  // Define your elements
  const orderIcon = document.getElementById('order-icon');
  const popoutCart = document.getElementById('popout-cart');
  const closeCartButton = document.getElementById('close-cart');
  const addToCartButtons = document.querySelectorAll('.addcart');
  const menuIcon = document.getElementById('menu-icon');
  const popoutMenu = document.getElementById('popout-menu');
  const closeMenuIcon = document.getElementById('close-menu');
  const overlay = document.getElementById('overlay');

  // Check if all required elements exist
  if (!orderIcon || !popoutCart || !closeCartButton || !menuIcon || !popoutMenu || !closeMenuIcon || !overlay) {
    console.error('One or more required elements are missing.');
    return;
  }

  // Event listener for showing the cart
  orderIcon.addEventListener('click', () => {
    console.log('Order icon clicked.');
    popoutCart.classList.add('show');
    overlay.classList.add('show');
  });

  // Event listener for hiding the cart
  closeCartButton.addEventListener('click', () => {
    console.log('Close cart button clicked.');
    popoutCart.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Event listener for showing the menu
  menuIcon.addEventListener('click', () => {
    console.log('Menu icon clicked.');
    popoutMenu.classList.add('show');
    overlay.classList.add('show');
  });

  // Event listener for hiding the menu
  closeMenuIcon.addEventListener('click', () => {
    console.log('Close menu button clicked.');
    popoutMenu.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Event listener for overlay clicks (hide both cart and menu)
  overlay.addEventListener('click', () => {
    console.log('Overlay clicked.');
    popoutMenu.classList.remove('show');
    popoutCart.classList.remove('show');
    overlay.classList.remove('show');
  });

  // Event listeners for add to cart buttons
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      console.log('Add to cart button clicked.');
      popoutCart.classList.add('show');
      overlay.classList.add('show');
    });
  });
});




//  nav sticky and transparency

document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const placeholder = document.getElementById('nav-placeholder');
  const sticky = navbar.offsetTop;

  window.addEventListener('scroll', () => {
    placeholder.style.height = window.scrollY >= sticky ? navbar.offsetHeight + 'px' : '0px';
    navbar.classList.toggle('sticky', window.scrollY >= sticky);
  });
});

// policies open close

document.addEventListener('DOMContentLoaded', () => {
  const faqHeaders = document.querySelectorAll('.faq-header');

  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const faqContent = header.nextElementSibling;
      const isActive = faqContent.style.maxHeight !== '';

      document.querySelectorAll('.faq-content').forEach(content => {
        content.style.maxHeight = '';
      });

      faqContent.style.maxHeight = isActive ? '' : `${faqContent.scrollHeight}px`;
    });
  });
});

// filter and sort

document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.getElementById("filter-button");
  const sortButton = document.getElementById('sort-button');
  const items = document.querySelectorAll(".product-row .product");

  if (filterButton) {
    console.log('Filter button found:', filterButton);
    filterButton.addEventListener("change", () => filterItems(filterButton.value));
  } else {
    console.error('Filter button not found.');
  }

  if (sortButton) {
    console.log('Sort button found:', sortButton);
    sortButton.addEventListener('change', () => {
      const sortOption = sortButton.value;
      const productsContainer = document.querySelector('.product-row');
      const productsArray = Array.from(productsContainer.querySelectorAll('.product'));

      productsArray.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('h4').innerText.replace('$', ''));
        const priceB = parseFloat(b.querySelector('h4').innerText.replace('$', ''));

        return (sortOption === 'low-high') ? priceA - priceB : (sortOption === 'high-low') ? priceB - priceA : 0;
      });

      productsContainer.innerHTML = '';
      productsArray.forEach(product => productsContainer.appendChild(product));
    });
  } else {
    console.error('Sort button not found.');
  }

  function filterItems(category) {
    items.forEach(item => {
      const itemCategory = item.getAttribute("data-category");
      item.style.display = (category === "all" || category === itemCategory) ? "block" : "none";
    });
  }
});


document.addEventListener('DOMContentLoaded', () => {
  const typeSelect = document.querySelector('#product-1 #type'); // Select dropdown element for product type
  const priceElement = document.querySelector('#product-1 .unit-price'); // Element to display the unit price
  const nameElement = document.querySelector('#product-1 .product-name'); // Element to display the product name

  if (typeSelect && priceElement && nameElement) { // Check if all elements are present
    typeSelect.addEventListener('change', (event) => {
      const selectedOption = event.target.selectedOptions[0]; // Get the selected option
      const unitPrice = parseFloat(selectedOption.getAttribute('data-price')); // Get the price from the data attribute
      const productName = selectedOption.getAttribute('data-name'); // Get the name from the data attribute

      priceElement.textContent = `$${unitPrice.toFixed(2)}`; // Update the text content with the formatted price
      nameElement.textContent = productName; // Update the product name
    });
  } else {
    console.error('Type select, price element, or name element not found.');
  }
});




// popup

document.addEventListener('DOMContentLoaded', () => {

  function showPopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'flex';
      sessionStorage.setItem('popupShown', 'true');
    } else {
      console.error('Element with id "popup" not found.');
    }
  }

  function closePopup() {
    const popup = document.getElementById('popup');
    if (popup) {
      popup.style.display = 'none';
    } else {
      console.error('Element with id "popup" not found.');
    }
  }

  window.onload = function () {
    if (!sessionStorage.getItem('popupShown')) {
      setTimeout(showPopup, 4000);
    }
  }

  const closeButton = document.getElementById('close-button');
  if (closeButton) {
    closeButton.addEventListener('click', closePopup);
  } else {
    console.error('Element with id "close-button" not found.');
  }

});
