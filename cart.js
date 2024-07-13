import products from "./fetchProducts.js";


console.log("geting " + products)

var cartDiv = document.querySelector('.cart-items')


//get all cart items from session storage
let cart = [...JSON.parse(sessionStorage.getItem('cart'))]
var total = 0
// console.log(cart);
if (cart != null) {
    cart.forEach((cartItem) => {
        // get product data
        let product = products.find((product) => product.id == cartItem['id'])
        //calculate total
        var discountedPrice = Math.round(product.price-product.price*product.discountPercentage/100)-0.01;
        total += +cartItem.quantity * +discountedPrice
        total = Math.round(total)

        // init cart item
        let itemDiv = document.createElement('div')
        itemDiv.classList.add('cart-item')
        itemDiv.innerHTML =
            `
                <img src="${product.images[0]}" alt="Product Image">
                <div class="item-details">
                    <h3>${product.title}</h3>
                    <p>Price: ${discountedPrice} EGP</p>
                    <p>Quantity: ${cartItem.quantity}</p>
                </div>
                <div class="item-actions">
                    <button class="btn-remove">Remove</button>
                </div>
            `
        cartDiv.appendChild(itemDiv)

        //remove button
        let removeBtn = itemDiv.querySelector('.btn-remove')
        removeBtn.addEventListener('click', () => {
            cart = cart.filter((item) => {
                return item.id != product.id
            })
            sessionStorage.setItem('cart', JSON.stringify(cart))
            window.location = window.location

            console.log(cart);
        })

    })
    calculateTotal();
}

function calculateTotal() {
    let totalItems = document.getElementById('total-items')
    let totalPrice = document.getElementById('total-price')
    totalItems.innerHTML = cart.length
    totalPrice.innerHTML = `${total} EGP`
}
