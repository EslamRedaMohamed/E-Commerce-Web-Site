
// Get products data from API with Error handling
async function fetchProducts() {
    try {
        var response = await fetch('https://dummyjson.com/products');
        var data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    finally{
        console.log("Data Fetched");
    }
}

// print All products in console for Test
console.log(fetchProducts())


// Display every Product thumbnail and title in HTML using DOM

async function displayProducts() {
    var products = await fetchProducts();
    var productContainer = document.getElementById('product-container');

    products.forEach(product => {
        var productCard = document.createElement('div');
        productCard.classList.add('box');

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <h3>Price: ${product.price}</h3>
            <div class="icons" id="addcart">
                <a href="#"><i class='bx bxs-cart-add'></i></a>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);



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
