import { addToCart,dataRetriever } from "./fetchProducts.js";
import { getLogged } from "./login.js";

// check from cookie if user logged in or not
let isLoggedIn = getLogged()!=null
if(isLoggedIn){
    let account=document.getElementById('account')
    account.setAttribute('href','profilePage.html')
}

    var applyFilterBtn = document.querySelector('.btn-primary');

    applyFilterBtn.addEventListener('click', async function() {
        // Retrieve values from form fields
        var priceFrom = document.getElementById('priceFrom').value;
        var priceTo = document.getElementById('priceTo').value;
        var category = document.querySelector('select').value;

        // Retrieve selected rating value
        var rate;
        var ratingInputs = document.getElementsByName('rating');
        for (var input of ratingInputs) {
            if (input.checked) {
                rate = input.id;
                break;
            }
        }

        // Retrieve offers checkbox state
        var includeOffers = document.getElementById('offers').checked;

        // Fetch and filter the products
        var retrievedProducts = await dataRetriever(category);
        var filteredProducts = filterProducts(retrievedProducts, priceFrom, priceTo, rate, includeOffers);

        // Insert filtered products
        productsInsertion(filteredProducts);
    });


function filterProducts(products, priceFrom, priceTo, rate, includeOffers) {
    return products.filter(product => {

        
        // Check each condition only if the corresponding filter option is selected
        var meetsPriceCriteria = true;
        if (priceFrom && priceTo) {
            meetsPriceCriteria = product.price > priceFrom && product.price < priceTo;
        }

        var meetsRatingCriteria = true;
        if (rate) {
            
            // Assuming product.rating is the actual rating of the product
            meetsRatingCriteria = product.rating > rate; 
        }

        var meetsOfferCriteria = true;
        if (includeOffers) {
            
            // Assuming discountPercentage indicates if offers are available
            meetsOfferCriteria = product.discountPercentage > 0; 
        }

        // Return true only if all selected criteria are met
        return meetsPriceCriteria && meetsRatingCriteria && meetsOfferCriteria;
    });
}

function productsInsertion(products) {
    var insertFilteredProducts = document.getElementById("filtered-products");

    // Clear previous content before adding new products
    insertFilteredProducts.innerHTML = '';

    products.forEach(product => {
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
                            </div>`;
            productCard.querySelector('.addcart').addEventListener('click', () => { addToCart(product.id) });
            insertFilteredProducts.appendChild(productCard);
    });
    insertFilteredProducts.style.width = "100%";
    insertFilteredProducts.style.display = "flex";
    insertFilteredProducts.style.flexDirection = "row";
    insertFilteredProducts.style.flexWrap = "wrap";
}

