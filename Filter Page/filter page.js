
document.addEventListener('DOMContentLoaded', function() {
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
});

async function dataRetriever(category) {
        if(category !== "all"){
        var url = `https://dummyjson.com/products/category/${category}`;
    }
    else{
        var url = `https://dummyjson.com/products?limit=0`;
    }


    // Fetch data from the constructed URL
    var response = await fetch(url);
    var data = await response.json();
    return data.products;
}

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
        insertFilteredProducts.innerHTML += `
            <div class="product-card" style="text-align:center">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h4>${product.title}</h4> 
                <p>Price: ${product.price}</p>
                <p>Discount percentage: ${product.discountPercentage}</p>            
            </div>`;
    });

    insertFilteredProducts.style.width = "100%";
    insertFilteredProducts.style.display = "flex";
    insertFilteredProducts.style.flexDirection = "row";
    insertFilteredProducts.style.flexWrap = "wrap";
}

