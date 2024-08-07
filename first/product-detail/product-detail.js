const url = window.location.href;
let params = {};
const order = document.querySelector('.product');
const paramRegex = /([^?&=]+)=([^?&=]*)/g;

while ((match = paramRegex.exec(url)) !== null) {
  params[match[1]] = match[2];
}

let apiUrl = `https://fakestoreapi.com/products/${params.id}`;

async function getData() {
  try {
    const res = await fetch(apiUrl);
    const product = await res.json();

    const html = `
      <div class="container">
        <div class="container-left">
          <img src="${product.image}" />
        </div>
        <div class="topUp">
          <div class="container-right">
            <p class="title">${product.title}</p>
            <p class="description">${product.description}</p>
          </div>
          <span>
            <p class="price">$${product.price}</p>
            <div class="quantity-controls">
              <button class="btn-decrease btn" onclick="updateQuantity('decrease')">-</button>
              <h1 class="product-count" id="count-${product.id}">0</h1>
              <button class="btn-increase btn" onclick="updateQuantity('increase')">+</button>
            </div>
          </span>
        </div>
      </div>
    `;
    order.innerHTML = html;

    const cart = getShoppingCart();
    console.log(cart)
    const productInCart = cart.find(item => item.id === product.id);
    console.log(productInCart)
    if (productInCart) {
      document.getElementById(`count-${product.id}`).innerText = productInCart.count ?? 0;
    }
  } catch (error) {
    console.error('Error fetching the product data:', error);
  }
}

getData();

function getShoppingCart() {
  let datas = localStorage.getItem('shoppingCart');
  return datas ? JSON.parse(datas) : [];
}

function updateShoppingCart(cart) {
  localStorage.setItem('shoppingCart', JSON.stringify(cart));
}




async function updateQuantity(action) {
  try {
    let product = await (await fetch(apiUrl)).json();

    let cart = getShoppingCart();

    let currentProduct = cart.find(item => item.id === product.id);

    if (currentProduct) {
      if (action === 'increase') {
        currentProduct.count += 1;
      } else if (action === 'decrease' && currentProduct.count > 0) {
        currentProduct.count -= 1;
      }

      if (currentProduct.count === 0) {
        cart = cart.filter(item => item.id !== product.id);
      }

    } else if (action === 'increase') {
      currentProduct = { ...product, count: 1 };
      cart.push(currentProduct);
    }

    const countElement = document.querySelector(`#count-${product.id}`);
    if (countElement) {
      countElement.innerText = currentProduct?.count ?? 0;
    }

    updateShoppingCart(cart);

  } catch (error) {
    console.error('Error updating quantity:', error);
  }
}
