
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
                <a href="product.html?id=${product.id}">
                            <img src="${product.thumbnail}" alt="${product.title}">
                            <h4>${product.title}</h4>
                            <h3>Price: ${product.price} EGP</h3>
                </a>
        `;

        productContainer.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);

// Function to filter products based on search input
function searchProducts() {
    var searchTerm = document.getElementById('search-input').value.trim().toLowerCase();
    var productCards = document.querySelectorAll('.box');

    productCards.forEach(card => {
        var title = card.querySelector('h4').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';

        } else {
            card.style.display = 'none';   
        }
    });
}