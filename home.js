import products from "./fetchProducts.js";
import { addToCart,searchProducts } from "./fetchProducts.js";

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