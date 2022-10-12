const Products = [];
const cart = JSON.parse(localStorage.getItem('cart')) || [];

const setQuantity = () =>
{
    const label = document.querySelector('#cart-quantity');
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    if(total > 0)
    {
        label.innerText = total;
    }
}

const notification = (text) =>
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

// click event is loaded to each button - events
const loadEvents = () =>
{
    let buttons = document.querySelectorAll('.button');
    for (const button of buttons) 
    {
        button.addEventListener('click', ()=>{

            let found = cart.find(element => element.id == button.id);
            if(found)
            {
                // esta en el carrito
                found.quantity++;
                localStorage.setItem('cart', JSON.stringify(cart));
                notification('✔ Producto añadido al carrito con éxito.')
            }
            else
            {
                let product = Products.find(element => element.id == button.id);
                if(product)
                {
                    let newProduct = {
                        id:product.id,
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        image: product.image,
                        quantity: 1
                    }
                    cart.push(newProduct);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    notification('✔ Producto añadido al carrito con éxito.');
                }
            }
            setQuantity(cart);
        })
    }
}

// dynamic loading of products - interaction with HTML
const loadProducts = (Products) =>
{
    let container = document.querySelector('#container');
    for (const product of Products)
    {   
        let div = document.createElement('div');
        div.setAttribute('class', 'card');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.description}">
            <h3>$${product.price}</h3>
            <h4>${product.name}</h4>
            <button class="button rounded" id="${product.id}">Agregar al carrito</button>
        `;
        container.appendChild(div);
    }
    loadEvents();
}


const getData = async () =>
{
    try
    {
        const response = await fetch('/data.json');
        const data = await response.json();
        loadProducts(data);
        Products.push(...data);
        setQuantity();
    }
    catch(e)
    {
        console.log(e);
    }
}

getData();




