import products from "./products.js";

let searchbtn = document.querySelector(".search-bar button")
searchbtn.addEventListener('click', searchProducts)


var productContainer = document.getElementById('product-container');
let productList = [...products]

productList.forEach(product => {
    var productCard = document.createElement('div');
    productCard.classList.add('box');

    productCard.innerHTML =
        `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <h3>Price: ${product.price} EGP</h3>
            <div  class="icons addcart">
                <i class='bx bxs-cart-add'></i>
            </div>
        `;
        //getting add cart button from product card and add on click event 
    productCard.querySelector('.addcart').addEventListener('click', () => { addToCart(product.id) })

    productContainer.appendChild(productCard);
});

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
function addToCart(pId) {
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
    let label = document.querySelector('.cart-item-n')
    label.innerHTML = cart.length
}
