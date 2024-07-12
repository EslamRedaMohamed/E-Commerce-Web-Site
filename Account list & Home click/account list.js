


// Get products data from API with Error handling
async function fetchProducts() {
    try {
        var response = await fetch('https://dummyjson.com/products');
        var data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    // finally{
    //     console.log("Data Fetched");
    // }
}



// Display every Product thumbnail and title in HTML using DOM
var productContainer = document.getElementById('product-container');
async function displayProducts() {
    var products = await fetchProducts();

    sliderData(products);

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



// Category list navigator

var categories = document.getElementById("category-list")
var li = categories.querySelectorAll('li')


var cat = null

li.forEach((i) =>{
    i.addEventListener("click", function(){
        cat = i.getAttribute('data-cat')
        if(typeof cat === "string"){productContainer.innerHTML = ``}       
        displayProducts()
    })
})


// Logo navigate into the home page

var home = document.querySelector("a[class=logo]")
home.addEventListener("click", function(){
    productContainer.innerHTML = ``
    displayProducts()
})



// Acccount list navigator

var accountList = document.getElementById("account-list")
var auth = accountList.querySelectorAll("li")

auth.forEach((link) =>{
    link.addEventListener("click", function(){
        var page = link.getAttribute("data-url")
        window.location.href = page
    })
})



if(cat == null){
    // insert Data into the slider


    var slider = document.querySelector(".slider")
    var slide = slider.querySelectorAll(".slide")

    function sliderData(products){
        var counter = 0
        var categories = ['beauty', 'fragrances', 'furniture', 'groceries']
        var avoider = 1
            products.forEach((product) =>{
                if(product.category == "fragrances" && avoider == 1){
                    avoider --
                }
                else if(product.category == categories[counter]){
                        if(product.thumbnail.length > 10){
                            
                            slide[counter].style.background = `url(${product.thumbnail})`
                            slide[counter].style.backgroundPosition = "center center"
                            slide[counter].style.backgroundSize = "cover"
                            slide[counter].setAttribute("data-category", `${categories[counter]}`);

                            counter++}
                }
            })
    }



    // slider transform


    var index = 0;

    setInterval(function() {
        
        if (index > 0) {
            slide[index - 1].style.transform = "scale(1)";
        } else if (index === 0 && slide.length > 1) {
            slide[slide.length - 1].style.transform = "scale(1)";
        }
        slide[index].style.transform = "scale(1.4)";

        index = (index + 1) % slide.length;
        }, 2000);



    // Show More Event 

    window.addEventListener('load', function() {
        slide.forEach((i)=>{
        i.addEventListener("click", function(){
            var x = i.getAttribute("data-category")
            cat = x
            productContainer.innerHTML = ``
            displayProducts()
        })
    })
    });}
else if (cat !== null){
    var s = document.querySelector(".slider-sec")
    s.style.display = "none"
}


console.log(cat)