
// fetch all Products
const products=await fetchProducts()
async function fetchProducts() {
    try {
        var response = await fetch('https://dummyjson.com/products?limit=0');
        var data = await response.json();
        return data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
    }
    finally{
        console.log("Data Fetched");
    }
}

// fetch single Product By Id 
async function fetchProductById(id) {
    try {
        var response = await fetch(`https://dummyjson.com/products/${id}`);
        var data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching product:', error);
    }
}

//fetch products for category
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




//function to init cart details and update in session storage
const addToCart = function (pId) {
    var cart = []
    //load cart from session storage
    if (sessionStorage.getItem('cart') != null)
        cart = [...JSON.parse(sessionStorage.getItem('cart'))]
    //add cart item to cart
    let found = false;
    let getItem = cart.forEach((cartItem) => {
        if (pId == cartItem.id) {
            cartItem['quantity'] += 1
            found = true
        }
    })
    if (!found) {
        cart.push({
            'id': pId,
            'quantity': 1
        })

    }
    //update cart in session
    sessionStorage.setItem('cart', JSON.stringify(cart));
    console.log(sessionStorage.getItem('cart'));

    //make label with cart items
    let label = document.getElementById('cart-item-n')
        label.innerHTML = cart.length;
    
}




export default products
export {fetchProductById,addToCart,dataRetriever,searchProducts}


