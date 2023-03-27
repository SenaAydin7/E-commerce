let posterList = [],
    basketList = [],
    favoritList = [],
    imgList = [];


toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": false,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

const toggleModal = () => {
    const basketModalEl = document.querySelector(".basket-modal");
    basketModalEl.classList.toggle("active");
};
const toggleModal1 = () => {
    const favoritModalEl = document.querySelector(".favorit-modal");
    favoritModalEl.classList.toggle("active");
};

const getPosters = () => {
    fetch("./products.json")
      .then((res) => res.json())
      .then((posters) => (posterList = posters));
};

getPosters();

const createPosterStars = (starRate) => {
    let starRateHtml = "";
    for(let i=1 ; i<=5; i++){
        if(Math.round(starRate) >= i) 
         starRateHtml += `<i class="bi bi-star-fill active"></i>`;
        else starRateHtml += `<i class="bi bi-star-fill"></i>`;
    }
    return starRateHtml;
};


const createPosterItemsHtml = () => {
    const posterListEl = document.querySelector(".poster-list");
    let posterListHtml = "";

    posterList.forEach((poster,index) => {
        posterListHtml += `<div class="col-5 ${index % 2 == 0 && "offset-2"}">
        <div class="product-card">
          <div class="product-tumb">
            <img  src="${poster.imgSource}"/>
          </div>
          <div class="poster-details">
            <span class="product-catagory">${poster.type}</span>
            <h4>${poster.name}</h4>
            <span class="poster-star-rate">
                ${createPosterStars(poster.starRate)}<br/>
                <span class="grey">${poster.reviewCount} reviews</span>
            </span>
            <div class="product-bottom-details">
              <div class="product-price"><small>${poster.oldPrice ? `$ 
               ${poster.oldPrice}` : "" }</small>$${poster.price}</div>
              <div class="product-icons">
                <i class="bi bi-heart" onclick="addPosterToFavorit(${poster.id})"></i>
                <i class="bi bi-basket" onclick="addPosterToBasket(${poster.id})"></i>
              </div>
            </div>
          </div>
        </div>
      </div>`;
    });

    posterListEl.innerHTML = posterListHtml;
};



const POSTER_TYPES = {
    ALL: "ALL",
    CARBACK:"Car Back",
    CARFRONT: "Car Front",
    WHEELS:"WHEELS",
    CARLIGHTS: "Car Lights",
    CARLOGO:"Car Logo",
};

const createPosterTypesHtml = () => {
    const filterEl = document.querySelector(".filter");
    let filterHtml = "";

    let filterTypes = ["ALL"];
    posterList.forEach((poster) => {
        if(filterTypes.findIndex((filter) => filter == poster.type) == -1)
        filterTypes.push(poster.type);
    });

    filterTypes.forEach((type, index) => {
        filterHtml += `<li class="${index == 0 ? "active" : null}
        "onclick="filterPosters(this)" data-type="${type}">
        ${POSTER_TYPES[type]|| type}</li>`
    });

    filterEl.innerHTML = filterHtml;
};


const filterPosters = (filterEl) => {
    document.querySelector(".filter .active").classList.remove("active");
    filterEl.classList.add("active");
    let posterType = filterEl.dataset.type;
    getPosters();
    if(posterType != "ALL") 
      posterList = posterList.filter((poster) => poster.type == posterType);
    createPosterItemsHtml();
};


const listBasketItems = () => {
  localStorage.setItem("basketList", JSON.stringify(basketList));
  const basketListEl = document.querySelector(".basket-list");
  const basketCountEl = document.querySelector(".basket-count");
  basketCountEl.innerHTML = basketList.length > 0 ? basketList.length : null;
  const totalPriceEl = document.querySelector(".basket-total-price");

  let basketListHtml = "";
  let totalPrice = 0;
  basketList.forEach((item) => {
    totalPrice += item.product.price * item.quantity;
    basketListHtml += `<li class="basket-item">
    <img src="${item.product.imgSource}" width="100" height="100"/>
    <div class="basket-item-info">
      <h3>${item.product.name}</h3>
      <span class="poster-price">$${item.product.price}</span><br/>
      <span class="poster-remove" onclick="removeItemFromBasket(${item.product.id})">remove</span>
    </div>
    <div class="poster-count">
      <span class="decrease" onclick="decreaseItem(${item.product.id})">-</span>
      <span>${item.quantity}</span>
      <span class="increase" onclick="increaseItem(${item.product.id})">+</span>
    </div>
  </li>`;
  });
  basketListEl.innerHTML = basketListHtml ? basketListHtml : `<li class="basket-item">No items added.</li>`;
  totalPriceEl.innerHTML = totalPrice > 0 ? 
    "Total: " + totalPrice.toFixed(2) + "$" : null;

};





const addPosterToBasket = (posterId) => {
  let foundPoster = posterList.find((poster) => poster.id == posterId);
  if(foundPoster){
      const basketAlreadyIndex = basketList.findIndex(
        (basket) => basket.product.id == posterId
      );
      if(basketAlreadyIndex == -1){
        let addedItem = {quantity: 1, product: foundPoster};
        basketList.push(addedItem);
      }else{
        if (
          basketList[basketAlreadyIndex].quantity <
          basketList[basketAlreadyIndex].product.stock
        )
          basketList[basketAlreadyIndex].quantity += 1;
        else{
          toastr.error("Sorry out of stock.");
          return;
        }
      }
      listBasketItems();
      toastr.success("Item added to basket.");
  }
};

const removeItemFromBasket = (posterId) => {
  const foundIndex = basketList.findIndex(
    (basket) => basket.product.id == posterId
    );
    if (foundIndex != -1){
      basketList.splice(foundIndex, 1);
    }
    listBasketItems();
};

const decreaseItem = (posterId) =>{
  const foundIndex = basketList.findIndex(
    (basket) => basket.product.id == posterId
    );
    if (foundIndex != -1){
      if (basketList[foundIndex].quantity != 1)
        basketList[foundIndex].quantity -= 1;
      else removeItemFromBasket(posterId);
      listBasketItems();
    }
};

const increaseItem = (posterId) =>{
  const foundIndex = basketList.findIndex(
    (basket) => basket.product.id == posterId
    );
    if (foundIndex != -1){
      if (basketList[foundIndex].quantity < basketList[foundIndex].product.stock)
        basketList[foundIndex].quantity += 1;
      else toastr.error("Sorry out of stock.");
      listBasketItems();
    }
};


const listFavoritItems = () => {
  localStorage.setItem("favoritList", JSON.stringify(favoritList));
  const favoritListEl = document.querySelector(".favorit-list");

  let favoritListHtml = "";
  favoritList.forEach((item) => {
    favoritListHtml += `<li class="favorit-item">
    <img src="${item.product.imgSource}" width="100" height="100"/>
    <div class="basket-item-info">
      <h3>${item.product.name}</h3>
      <span class="poster-price">$${item.product.price}</span><br/>
      <span class="poster-remove" onclick="removeItemFromFavorit(${item.product.id})">remove</span>
    </div>
    <div class="poster-count">
    <i class="bi bi-basket" onclick="addPosterToBasket(${item.product.id})"></i>
      </div>
  </li>`;
  });
  favoritListEl.innerHTML = favoritListHtml ? favoritListHtml : `<li class="basket-item">No items added.</li>`;
};

const addPosterToFavorit = (posterId) => {
  let foundPoster = posterList.find((poster) => poster.id == posterId);
  if(foundPoster){
      const favoritAlreadyIndex = favoritList.findIndex(
        (favorit) => favorit.product.id == posterId
      );
      if(favoritAlreadyIndex == -1){
        let addedItem = {quantity: 1, product: foundPoster};
        favoritList.push(addedItem);
      }else{
        
        if (
          favoritList[favoritAlreadyIndex].quantity <
          favoritList[favoritAlreadyIndex].product.stock
        )
        
          favoritList[favoritAlreadyIndex].quantity += 1;
          
        else{
          toastr.error("Sorry out of stock.");
          return;
        }
        
      }
      listFavoritItems();
      toastr.success("Item added to Favorit.");
      
  }
};

const removeItemFromFavorit = (posterId) => {
  const foundIndex = favoritList.findIndex(
    (favorit) => favorit.product.id == posterId
    );
    if (foundIndex != -1){
      favoritList.splice(foundIndex, 1);
    }
    listFavoritItems();
};

if (localStorage.getItem("basketList","favoritList")){
  basketList = JSON.parse(localStorage.getItem("basketList"));
  listBasketItems();
  favoritList = JSON.parse(localStorage.getItem("favoritList"));
  listFavoritItems();
} 

setTimeout(() => {
  createPosterItemsHtml();
  createPosterTypesHtml();
},100);


goUpBtn = document.getElementById("goup");

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 1000 || document.documentElement.scrollTop > 1000) {
    goUpBtn.style.display = "block";
  } else {
    goUpBtn.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

/*
function placeImage(x)
{
    const gallery = document.getElementById("img");

    gallery.innerHTML = ""; // clear images

    for (counter=1;counter<=x;counter++) {
        const image =document.createElement("img");
        image.src="./assets/images/posters"+".jpg";
        gallery.appendChild(image);
    }
}
placeImage();

var counter =0;
listImg();

function listImg(){

  images=['alfaromeo.jpg','amg.jpg'];
  var imgDiv = document.getElementById('gallery');

  if(counter < images.length){
    var img = images[counter];
    imgDiv.innerHTML = "<img src='images/posters/'/>";

    counter += 1;
  }
}
*/