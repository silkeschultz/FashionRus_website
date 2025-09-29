
const productListContainer = document.querySelector(".product_list_container");


fetch(`https://kea-alt-del.dk/t7/api/products?limit=30`)
.then((res)=>res.json())
.then(data =>showProducts(data))

function showProducts(products) {  
      console.log(products);
products.forEach(element=>{
console.log(element)
  productListContainer.innerHTML += `<div id="nedsat" class="produkt ${element.soldout && "udsolgt"} ${element.discount && "nedsat"}">
          <a href="product.html?id=${element.id}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="sko 1" />
            <h3>${element.brandname}</h3>
            <h4>${element.productdisplayname}</h4>
            <p class="nedsat_pris">${Math.round(element.price - element.price*element.discount/100)} kr</p>
            <p>Normal price: ${element.price} kr</p>
          </a>
        </div>
        ` ;
})
  }
