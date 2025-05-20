document.addEventListener('DOMContentLoaded', () => {
  let cart = [];
  const cartItemsContainer = document.querySelector('.cart__items');
  const totalAmountElement = document.getElementById('totalAmount');
  const checkoutButton = document.getElementById('checkout');
  const modal = document.getElementById('checkoutModal');
  const closeButton = document.querySelector('.close-button');
  const modalCartItems = document.querySelector('.modal-cart-items');
  const modalTotalAmount = document.getElementById('modalTotalAmount');
  const confirmOrderButton = document.querySelector('.confirm-order-button'); // Select the confirm order button

  // Add event listeners to restaurant buttons
  document.querySelectorAll('.restaurant-card__button').forEach(button => {
    button.addEventListener('click', () => {
      const restaurant = button.dataset.restaurant;
      const items = JSON.parse(button.dataset.items);
      addToCart(restaurant, items);
    });
  });

  // Add items to the cart
  function addToCart(restaurant, items) {
    items.forEach(item => {
      cart.push({ restaurant, item });
    });
    renderCartItems();
  }

  // Render cart items in the cart section with remove button
  function renderCartItems() {
    cartItemsContainer.innerHTML = '';
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="cart__empty-message">Your cart is empty.</p>';
    } else {
      cart.forEach(({ restaurant, item }, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart__item');
        cartItem.innerHTML = `
          <p>${item} from ${restaurant}</p>
          <button class="remove-item-button" data-index="${index}">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
    }
    totalAmountElement.textContent = calculateTotalPrice(); // Update total price in the cart

    // Add event listeners to all remove buttons
    document.querySelectorAll('.remove-item-button').forEach(button => {
      button.addEventListener('click', () => {
        const index = button.dataset.index;
        removeItemFromCart(index);
      });
    });
  }

  // Remove item from the cart based on its index
  function removeItemFromCart(index) {
    cart.splice(index, 1); // Remove item from the cart array
    renderCartItems(); // Re-render the cart items and update the total
  }

  // Calculate total price (using a sample price of ₹150 per item)
  function calculateTotalPrice() {
    const pricePerItem = 150; // You can replace this with dynamic pricing
    return (cart.length * pricePerItem).toFixed(2);
  }

  // Show the modal with cart items on checkout
  checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
      alert("Your cart is empty. Please add some items.");
      return;
    }
    modalCartItems.innerHTML = '';
    cart.forEach(({ restaurant, item }) => {
      const modalItem = document.createElement('div');
      modalItem.classList.add('modal-cart-item');
      modalItem.innerHTML = `<p>${item} from ${restaurant}</p>`;
      modalCartItems.appendChild(modalItem);
    });
    modalTotalAmount.textContent = calculateTotalPrice();
    modal.style.display = 'block'; // Show the modal
  });

  // Close the modal when the close button is clicked
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Hide the modal
  });

  // Close the modal if the user clicks outside the modal content
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Redirect to payment page on confirm order
  confirmOrderButton.addEventListener('click', () => {
    window.location.href = 'payment.html'; // Redirect to the payment page
  });
});
