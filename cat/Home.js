


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
var productContainer = document.getElementById('product-container');
async function displayProducts() {
    var products = await fetchProducts();
    

    products.forEach(product => {

        if(!cat || product.category === cat){            
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

            productContainer.appendChild(productCard);}
        
    });
    cat = null
}

document.addEventListener('DOMContentLoaded', displayProducts);



var categories = document.getElementById("category-list")
var li = categories.querySelectorAll('li')
console.log(li)


var cat = null

li.forEach((i) =>{
    i.addEventListener("click", function(){
        // var url = i.getAttribute('data-url')
        cat = i.getAttribute('data-cat')
        if(typeof cat === "string"){productContainer.innerHTML = ``}
        console.log("this is cat: ",cat)        
        // window.location.href = url;
        displayProducts()
    })
})



var home = document.querySelector("a[class=logo]")
home.addEventListener("click", function(){
    productContainer.innerHTML = ``
    displayProducts()
})


