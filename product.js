import { fetchProductById,addToCart,searchProducts } from "./fetchProducts.js";

let searchbtn = document.querySelector(".search-bar button")
searchbtn.addEventListener('click', searchProducts)



function getProductIdFromURL() {
    var params = new URLSearchParams(window.location.search);
    return params.get('id');
}

// print  product in console for Test
console.log(fetchProductById(getProductIdFromURL()))



    var productId = getProductIdFromURL();
    var product = await fetchProductById(productId);
    var discountedPrice = Math.round(product.price-product.price*product.discountPercentage/100)-0.01;

    document.getElementById('product-image').src = product.thumbnail;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-brand').textContent ='Brand: '+product.brand;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Price: ${discountedPrice} EGP`;
    document.getElementById('old-price').textContent = `Price: ${product.price} EGP`;
    document.getElementById('discoutPercentage').textContent = `-${product.discountPercentage}%`;



    if(product.stock > 0){
        document.getElementById('product-stock').textContent = 'In Stock'
    }else{
        document.getElementById('product-stock').textContent = 'Out Of Stock'
    }

    
    var ratingHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < product.rating) {
            ratingHtml += '<i class="bx bxs-star"></i>';
        } else {
            ratingHtml += '<i class="bx bx-star"></i>';
        }
    }
    document.getElementById('product-rating').innerHTML = ratingHtml;



    function displayProductReviews(reviews) {
        var reviewsContainer = document.getElementById('product-reviews');
        reviewsContainer.innerHTML = ''; // Clear previous reviews
    
        reviews.forEach(function(review) {
            // Generate HTML for star ratings
            var ratingHtml = '';
            for (let i = 0; i < 5; i++) {
                if (i < review.rating) {
                    ratingHtml += '<i class="bx bxs-star"></i>';
                } else {
                    ratingHtml += '<i class="bx bx-star"></i>';
                }
            }
    
            // Generate HTML for the review
            var reviewHtml = `
                <div class="review">
                    <p id="user-name">${review.reviewerName}</p>
                    <div id="user-rating" class="rating">${ratingHtml}</div>
                    <p>${review.comment}</p>
                    <p><strong>Date:</strong> ${new Date(review.date).toLocaleDateString()}</p>
                </div>
            `;
            reviewsContainer.innerHTML += reviewHtml;
        });
    }

    displayProductReviews(product.reviews);

var addCartBtn = document.getElementById('add-to-cart');
addCartBtn.addEventListener('click', () => {addToCart(productId) })