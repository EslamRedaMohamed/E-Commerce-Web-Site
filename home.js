import products from "./fetchProducts.js";
import { addToCart,searchProducts } from "./fetchProducts.js";
import { getLogged } from "./login.js";

// check from cookie if user logged in or not
let isLoggedIn = getLogged()!=null
if(isLoggedIn){
    let account=document.getElementById('account')
    account.setAttribute('href','./Personal Profile Page/profilePage.html')
}


let searchbtn = document.querySelector(".search-bar button")
searchbtn.addEventListener('click', searchProducts)

var productContainer = document.getElementById('product-container');
let productList = [...products]



// Display every Product thumbnail and title in HTML using DOM

productList.forEach(product => {
    var discountedPrice = Math.round(product.price-product.price*product.discountPercentage/100)-0.01;
        var productCard = document.createElement('div');
        productCard.classList.add('box');

        productCard.innerHTML = `
                <a href="product.html?id=${product.id}">
                            <img src="${product.thumbnail}" alt="${product.title}">
                            <h4>${product.title}</h4>
                            <h3>Price: ${discountedPrice} EGP</h3>
                            <div class="discount">
                            <p  id="old-price">Price: ${product.price} EGP</p>
                            <p id="discoutPercentage">-${product.discountPercentage}%</p>
                            </div>   
                </a>
                <div  class="icons addcart">
                                <i class='bx bxs-cart-add'></i>
                </div>
        `;
        productCard.querySelector('.addcart').addEventListener('click', () => { addToCart(product.id) });
        productContainer.appendChild(productCard);
    });


// slider
var currentIndex = 0;
var autoSlideInterval;
var slideIntervalTime = 5000; 
var userSlideTimeout = 5000; 

function showSlide(index) {
    var slides = document.querySelectorAll('.carousel-item');
    var totalSlides = slides.length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    var offset = -currentIndex * 100;
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
    resetAutoSlide();
}

function prevSlide() {
    showSlide(currentIndex - 1);
    resetAutoSlide();
}

function autoSlide() {
    autoSlideInterval = setInterval(() => {
        nextSlide();
    }, slideIntervalTime);
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    setTimeout(() => {
        autoSlide();
    }, userSlideTimeout);
}

// Initialize the slider
showSlide(currentIndex);
autoSlide();

// Event listeners for manual slide control
document.querySelector('.carousel-control.prev').addEventListener('click', prevSlide);
document.querySelector('.carousel-control.next').addEventListener('click', nextSlide);

