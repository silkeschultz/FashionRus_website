const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const productListContainer = document.querySelector(".product_list_container");
const header = document.querySelector("h1").textContent = category

document.querySelectorAll("#filters button").forEach(knap=>knap.addEventListener("click", showFiltered));

function showFiltered(){
  console.log("showFiltered");
  productListContainer.innerHTML = ""
  const gender = this.dataset.gender;
  if (gender=="All"){
    showProducts(allData);
  } else {
    const udsnit = allData.filter(product=>product.gender == gender);
    showProducts(udsnit);
  }
}

let allData

fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&category=${category}`)
.then((res)=>res.json())
.then(data => {
    allData = data;
    showProducts(allData);
  });

function showProducts(products) {  
productListContainer.innerHTML = "";
products.forEach(element=>{
  productListContainer.innerHTML += `<div id="nedsat" class="produkt ${element.soldout && "udsolgt"} ${element.discount && "nedsat"}">
          <a href="product.html?id=${element.id}">
            <img src="https://kea-alt-del.dk/t7/images/webp/640/${element.id}.webp" alt="sko 1" />
            <h3>${element.brandname}</h3>
            <h4>${element.productdisplayname}</h4>
            <p class="nedsat_pris">${Math.round(element.price - element.price*element.discount/100)} kr</p>
            <p>Price: ${element.price} kr</p>
          </a>
        </div>
        ` ;
})
  }
