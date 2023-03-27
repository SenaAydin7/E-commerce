let posterList = [],
    basketList = [],
    favoritList = [],
    imgList = [];
    
const toggleModal = () => {
    const basketModalEl = document.querySelector(".basket-modal");
    basketModalEl.classList.toggle("active");
};
const toggleModal1 = () => {
    const favoritModalEl = document.querySelector(".favorit-modal");
    favoritModalEl.classList.toggle("active");
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