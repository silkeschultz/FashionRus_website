const params = new URLSearchParams(window.location.search);
const category = params.get("category");

const productListContainer = document.querySelector(".product_list_container");
const header = document.querySelector("h1").textContent = category

document.querySelector("#filters").addEventListener("click", showFiltered);
document.querySelector("#sorting").addEventListener("click", showSorted);

function showSorted(event){
  const direction = event.target.dataset.direction;
  if(direction=="lohi"){
    currentData.sort((firstItem,secondItem)=>firstItem.price - secondItem.price);
  }else{
    currentData.sort((firstItem,secondItem)=>secondItem.price - firstItem.price);
  }
  showProducts(currentData);
}

function showFiltered(event){
  console.log(event.target)
  console.log("showFiltered");
  productListContainer.innerHTML = ""
  const gender = event.target.dataset.gender;
  if (gender=="All"){
    currentData = allData
  } else {
    const udsnit = allData.filter(product=>product.gender == gender);
    showProducts(udsnit);
    currentData = udsnit;
  }
}

let allData, currentData;

fetch(`https://kea-alt-del.dk/t7/api/products?limit=30&category=${category}`)
.then((res)=>res.json())
.then(data => {
    allData = currentData = data;
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
