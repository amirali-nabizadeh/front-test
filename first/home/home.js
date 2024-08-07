const products = document.querySelector('.products');
let data;

let apiUrl = 'https://fakestoreapi.com/products'
async function getData() {
  await fetch(apiUrl)
    .then(res => res.json())
    .then(json => {
      data = json;
    });
  data.forEach((product) => {
    console.log(product.title.length)
    let shortTitle = product.title.length > 45 ? `${product.title.slice(0, 50).trim()}...` : product.title
    const html = `
<div class="container">
  <div class="container-header">
  <div class="bg-image">
    <img src="${product.image}" />
    </div>
    <div class="tooltip">
    ${shortTitle}
    <p class="tooltiptext">${product.title}</p>
    </div>
  </div>
  <div class="container-footer">
    <p class="price">$${product.price}</p>
    <button
      class="btn"
      onclick="showProductDetails(${product.id})"
      id="${product.id}"
    >
      دیدن جزيیات
    </button>
  </div>
</div>

  `;

    const node = document.createElement('div');
    node.innerHTML = html;

    products.appendChild(node);
  });
}

getData();

function showProductDetails(id) {
  window.location.href = 'file:///home/amir/front-test/product-detail/product-detail.html?id=' + id;
}

function a() {
  window.location.href = 'file:///home/amir/front-test/shop/shop.html'
}

function b() {
  window.location.href = 'file:///home/amir/front-test/home/home.html'
}

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    // slides[i].style?.['justify-content'] = "center";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}