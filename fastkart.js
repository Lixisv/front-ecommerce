const URL_API = "http://localhost:5000/products";

let products = [];

//Capturo el contenedor de las cards

const contenedorCards = document.getElementById("contenedorCards");

// Creo una funcion para crear las tarjetas con los datos del array de json-server

const printCards = (products, contenedor) => {
  contenedor.innerHTML = "";
  products.forEach((element) => {
    contenedor.innerHTML += `
    <article class="card">
    <figure class="card-figure">
    <img src=${element.image} alt=${element.name}${element.category}>
    </figure>
    <section class="card-section">
    <span class="span-category">${element.category} </span>
    <h3 class="h3-products">${element.name} </h3>
    <span class="span-price">$${Number(element.price).toLocaleString()}</span>
    <button id=${element.id} class="boton-add">Add</button>
    <button id=${
      element.id
    } class="boton-favoritos"><img src="https://cdn-icons-png.flaticon.com/512/20/20119.png"></button>
    </section>
    </article>
    `;
  });
};

// Creo funcion para agregar al carrito

const addToCarrito = () => {
  const addButtons = document.querySelectorAll(".boton-add");

  //Recorro los botones para obtener el id y escuchar el evento click
  addButtons.forEach((btn) => {
    const id = btn.getAttribute("id");
    btn.addEventListener("click", async () => {
      // Hago una peticion de tipo GET al endpoint products/id  pata obtener el producto
      const prod = await fetch(`${URL_API}/${id}`);
      const prodJson = await prod.json();
      prodJson["quantity"] = 1;
      prodJson["total"] = Number(prodJson.price);
      let carrito = localStorage.getItem("carrito");
      if (carrito) {
        carrito = JSON.parse(carrito);
        carrito.push(prodJson);
      } else {
        carrito = [prodJson];
      }
      localStorage.setItem("carrito", JSON.stringify(carrito));
      alert("Se agregó el producto al carrito.");
    });
  });
};

const addToWishlist = () => {
  const buttonFavoritos = document.querySelectorAll(".boton-favoritos");

  //Recorro los botones para obtener el id y escuchar el evento click
  buttonFavoritos.forEach((btn) => {
    const id = btn.getAttribute("id");
    btn.addEventListener("click", async () => {
      // Hago una peticion de tipo GET al endpoint products/id  pata obtener el producto
      const prod = await fetch(`${URL_API}/${id}`);
      const prodJsonWishlist = await prod.json();
      let wishlist = localStorage.getItem("wishlist");
      if (wishlist) {
        wishlist = JSON.parse(wishlist);
        wishlist.push(prodJsonWishlist);
      } else {
        wishlist = [prodJsonWishlist];
      }
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      alert("Se agregó el producto a favoritos.");
    });
  });
};

// Filtro por Categorias

const filterButtons = document.querySelectorAll(".boton-categoria");

const filterProducts = async (category = "") => {
  try {
    // const endpoint = "products";
    const url = category ? `${URL_API}?category=${category}` : `${URL_API}`;

    const resp = await fetch(url);
    const response = await resp.json();
    return response;
  } catch (error) {
    console.log(error);
    return [];
  }
};

filterButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const category = button.id === "all" ? "" : button.id;
    const products = await filterProducts(category);
    printCards(products, contenedorCards);
    addToCarrito();
    addToWishlist();
  });
});

// Hago una peticion HTTP tipo get para obtener los productos del array de json server

fetch(URL_API)
  .then(function (response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error en la solicitud");
    }
  })
  .then(function (products) {
    printCards(products, contenedorCards);
    addToCarrito();
    addToWishlist();
  })
  .catch(function (error) {
    console.log(error);
  });




// hover carrito

// Obtener el elemento del carrito de compras
let cartIcon = document.getElementById('cart-icon');
console.log(cartIcon);

// Obtener el elemento emergente del carrito de compras
let cartPopup = document.getElementById('cart-popup');

// Función para mostrar los elementos del carrito
function showCartItems() {
  // Obtener los elementos del carrito desde el localStorage
  let cartItems = JSON.parse(localStorage.getItem('carrito'));
  // Obtener el elemento de la lista de productos
  let cartItemList = document.getElementById('cart-items');

  // Limpiar la lista de productos
  cartItemList.innerHTML = '';

  console.log(cartItems.length);
  if (cartItems.length > 0){
      // Mostrar cada producto en la lista
  cartItems.forEach(function(item) {

    cartItemList.innerHTML += `
    <article class= "article-hover">
      <figure class="figure-hover">
    <img class = "imagen-hover" src=${item.image} alt=${item.name}${item.category}>
    </figure>
      <div class="div-hover">
      <h3 class="nombre-hover">${item.name} </h3>
      <span class="precio-hover">${item.quantity} x $${Number(item.price).toLocaleString()}</span>
      </div>
    </article>
      `
    });

    // Mostrar el carrito emergente
    cartPopup.style.display = 'block';
  }

};

// Función para ocultar los elementos del carrito
function hideCartItems() {
  // Ocultar el carrito emergente
  cartPopup.style.display = 'none';
};

// Escuchar el evento 'mouseenter' en el carrito de compras
cartIcon.addEventListener('mouseenter', showCartItems);

// Escuchar el evento 'mouseleave' en el carrito de compras
cartIcon.addEventListener('mouseleave', hideCartItems);