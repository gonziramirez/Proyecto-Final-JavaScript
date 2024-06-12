const notification = (text, color) =>
{
    Toastify({
        text: text,
        className: "info",
        gravity: "bottom",
        position: "right",
        style: {
            color: "black",
            border: "1px solid black",
            background: "white",
        }
      }).showToast();
}

const loadEvents = (total) =>
{   
    // checkout functionality
    const btn = document.querySelector('#checkout');
    btn.addEventListener('click', ()=>{
        localStorage.removeItem('cart'); // remove cart
        // location.reload(true); // reload page
        if(total > 0)
        {
            const message = 'Compra finalizada su total es de $' + total;
            notification(message, "#00aa00");
            setTimeout(() => {
                window.location.href = "index.html"; // reditect to index
            }, 4000);
        }
        else
        {
            const message = 'No tenes productos en el carrito!';
            notification(message, "	#ff0000");
        }
    });

    // delete item
    const deleteButtons = document.querySelectorAll('.delete-button');
    for (const button of deleteButtons)
    {   
        button.addEventListener('click', ()=>{
            const newCart = shopCart.filter(element => element.id != button.id);
            localStorage.setItem('cart', JSON.stringify(newCart)); // set new cart in storage
              notification('Producto eliminado con éxito ⛔', "#00a650");
              setTimeout(() => {
                  location.reload(true); // reload page
              }, 2000);
        })
    }
}
// every time a product is added the cart is updated - interaction with HTML
const updateCart = (cart) =>
{
    let cartContainer = document.querySelector('#cart');
    // Get the child element node
    let container = document.getElementById("cartContainer");
    if(container)
    {
        container.parentNode.removeChild(container);
    }
    let div = document.createElement('div');
    div.setAttribute('id','cartContainer');
    div.innerHTML += ` <h2 class="text-center">Carrito de compras</h2>`;
    for (const product of cart)
    {
        div.innerHTML += `
            <div class="cart-item d-flex flex-column align-items-center flex-md-row border m-1">
                <img class="img-fluid imgCarrito m-3" src="${product.image}"></img>
                <h5 class="m-3">Producto: ${product.name}</h5>
                <h5 class="m-3">Precio por unidad: $${product.price}</h5>
                <h5 class="m-3">Cantidad: ${product.quantity}</h5>
                <button class="delete-button button rounded m-3 p-2" id="${product.id}">Eliminar producto</button>
            </div>
        `;
    }
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    div.innerHTML += `
        <div class="cart-item text-center">
            <h4>Total: $${total.toFixed(2)}</h4>
        </div>
    `;
    div.innerHTML += ` <div class="text-center"><button class="button rounded p-2" id="checkout">Finalizar compra</button> </div>`
    cartContainer.appendChild(div);
    loadEvents(total);
}

const shopCart = JSON.parse(localStorage.getItem('cart')) || [];
updateCart(shopCart);