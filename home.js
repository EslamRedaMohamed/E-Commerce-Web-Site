
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
            <h3>Price: ${product.price} EGP</h3>
            <div class="icons" id="addcart">
                <a href="#"><i class='bx bxs-cart-add'></i></a>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', displayProducts);