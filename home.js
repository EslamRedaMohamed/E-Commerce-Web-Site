
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
    console.log(products[0])
    products.forEach(product => {
        var productCard = document.createElement('div');
        productCard.classList.add('box');

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <h3>Price: ${product.price} EGP</h3>
            <div onClick="addToCart(${product.id})" class="icons" id="addcart">
                <i class='bx bxs-cart-add'></i>
            </div>
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



function addToCart(pId){
    var cart=[]
    //load cart from session storage
    if(sessionStorage.getItem('cart')!=null)
    cart = [...JSON.parse(sessionStorage.getItem('cart'))]
    //add cart item to cart
    let found=false;
    let getItem=cart.forEach((cartItem)=>{
        if(pId==cartItem.id){
            cartItem['quantity']+=1
            found=true
        }
    })
    if(!found){
        cart.push({
        'id':pId,
        'quantity':1
    })

    }
    //update cart in session
    sessionStorage.setItem('cart',JSON.stringify(cart));
    console.log(sessionStorage.getItem('cart'));

    //make label with cart items
    let label=document.querySelector('.cart-item-n')
    label.innerHTML=cart.length
}