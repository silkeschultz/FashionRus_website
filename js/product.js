const productContainer = document.querySelector(".productContainer");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://kea-alt-del.dk/t7/api/products/${id}`)
.then((res)=>res.json())
.then(data =>showProduct(data))
  
  function showProduct(product) {  
  productContainer.innerHTML = `
  <div class="product-image">
  <img src="https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp" alt="rød puma trøje" />
  </div>
  <div class="product-info">
  <h1>Product Information</h1>
  <ul>
  <li><strong>Model name</strong>: ${product.productdisplayname}</li>
  <li><strong>Category</strong>: ${product.category}</li>
  <li><strong>Season</strong>: ${product.season}</li>
  </ul>
  <div class="brand-logo">${product.brandname}</div>
  <p class="brand-slogan">FOREVER. FASTER. FOREVER. BETTER.</p>
  </div>
  <div class="purchase-info">
  <h2>${product.productdisplayname}</h2>
  <p class="brand-category">${product.brandname} ︳${product.articletype}</p>
  <p class="price"> ${product.price},- </p>
  <div class="size-selector">
  <label for="size">Choose a size</label>
  <select id="size" name="size">
  <option value="S">S</option>
  <option value="M">M</option>
  <option value="L">L</option>
  <option value="XL">XL</option>
  </select>
  </div>
  <button class="add-to-basket">Add to basket</button>
  </div>
  `;
  }