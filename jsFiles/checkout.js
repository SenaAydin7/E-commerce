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
  
      const totalPayment = document.getElementById("to-pay");
      totalPayment.setAttribute("value"," Pay " + totalPrice.toFixed(2) + "$" );
  };
  
  
  
if (localStorage.getItem("basketList","favoritList")){
basketList = JSON.parse(localStorage.getItem("basketList"));
listBasketItems();
};