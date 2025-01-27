let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add("active");
};

closeCart.onclick = () => {
    cart.classList.remove("active");
};


//cart work

if(document.readyState=='loading'){
    document.addEventListener('DOMContentLoaded',ready);
} else {
    ready();
}
//Function

function ready(){
    var removeCartButton= document.getElementsByClassName('cart-remove')
    console.log(removeCartButton)
    for (var i = 0; i < removeCartButton.length;i++ )
    {
        var button = removeCartButton[i]
        button.addEventListener('click',removeCartItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for(var i = 0; i < quantityInputs.length;i++ )
    {
        var input = quantityInputs[i];
        input.addEventListener('change',quantityChanged);

    }
    var addCart = document.getElementsByClassName('add-cart');
    for (var i = 0; i < addCart.length;i++ )
    {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);

    }
    document
        .getElementsByClassName('btn-buy')[0]
        .addEventListener('click',buyButtonClicked);
}
function buyButtonClicked(event){
    alert('Your Order is placed');
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);
    }
    updatetotal();
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updatetotal();
}
function quantityChanged(event){
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0){
        input.value = 1;
    }
updatetotal();
}
function addCartClicked(event){
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("product-price")[0].innerText;
    //var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    console.log(title, price, "https://127.0.0.1:5500/IMAGES/produit01.jpg");
    addProductToCart(title,price,"https://127.0.0.1:5500/IMAGES/produit01.jpg");
    updatetotal();
}
function addProductToCart(title, price, productImg)
{
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = document.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length;i++ )
    {
        if (cartItemsNames[i].innerText == title)
        {
        alert('You have already added this item to cart ! ');
        return;
        }
    }

var cartBoxContent = `
<img src="IMAGES/produit01.jpg" alt="" class="cart-img">
                        
<div class="detail-box">

    <div class="cart-product-title">${title}</div>
    <div class="cart-price">${price}</div>
    <input type="number" value="1" class="cart-quantity">
</div>
<i class='bx bxs-trash-alt cart-remove'></i>
`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox
    .getElementsByClassName('cart-remove')[0]
    .addEventListener('click',removeCartItem);
cartShopBox
    .getElementsByClassName('cart-quantity')[0]
    .addEventListener('change',quantityChanged);


}
function updatetotal(){
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length;i++ )
    {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace('$',""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
        total = Math.round(total * 100) / 100;
        document.getElementsByClassName('total-price')[0].innerText = '$' + total;
    

}
const form = document.getElementById('form');
const Nom = document.getElementById('Nom');
const Email = document.getElementById('Email');
const fmessage = document.getElementById('message');

form.addEventListener('Envoyer', e => {
    e.preventDefault();
});

const setError = (element,message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');

}
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = '';
    inputControl.classList.add('success')
    inputControl.classList.remove('error');
}
const isValidEmail = Email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(Email).toLowerCase());
}
const validateInputs = () => {
    const NomValue = Nom.value.trim();
    const EmailValue = Email.value.trim();
    const messageValue = Message.value.trim();
    
    if(NomValue === '') {
        setError(Nom, 'Nom is required');

    } else {
        setSuccess(Nom);
    }
    if(EmailValue === '') {
        setError(Email, 'Email is required');

    } else if (!isValidEmail(EmailValue)) {
        setError(Email, 'Provide a valid email address');
    } else {
        setSuccess(Email);
    } 
    

}
