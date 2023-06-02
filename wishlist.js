const URL_API = "http://localhost:5000/products";


let wishlist = localStorage.getItem('wishlist');
wishlist = JSON.parse(wishlist);
console.log(typeof(wishlist))

const contenedorWishlist = document.getElementById("wishlist-productos");


//Funcion para pintar las Cards

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
      <button id=${element.id} class="boton-favoritos" onclick="removeFromWishlist(${element.id})"><img src="https://cdn-icons-png.flaticon.com/512/20/20119.png"></button>
      </section>
      </article>
      `;
    });
  };

// Funcion para agregar al carrito

const addToCarrito = () => {
    const addButtons = document.querySelectorAll(".boton-add");
  
    //Recorro los botones para obtener el id y escuchar el evento click
    addButtons.forEach((btn) => {
      const id = btn.getAttribute("id");
      btn.addEventListener("click", async () => {
        // Hago una peticion de tipo GET al endpoint products/id  pata obtener el producto
        const prod = await fetch(`${URL_API}/${id}`);
        const prodJson = await prod.json();
        let carrito = localStorage.getItem("carrito");
        if (carrito) {
          carrito = JSON.parse(carrito);
          carrito.push(prodJson);
        } else {
          carrito = [prodJson];
        }
        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert('Se ha agregado el ID "' + id + '" al carrito.');
      });
    });
  };


// Funcion para eliminar de favoritos

  const removeFromWishlist = (id) => {
    let wishlist = localStorage.getItem('wishlist');
    wishlist = JSON.parse(wishlist);
  
    // Buscar el índice del elemento en el array de wishlist
    const index = wishlist.findIndex(item => item.id === id);
    if (index !== -1) {
      wishlist.splice(index, 1); // Eliminar el elemento del array
      localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Actualizar el localStorage
      alert('Elemento eliminado de la lista de favoritos.');
      location.reload();
    }
  };


  printCards(wishlist, contenedorWishlist);

  addToCarrito();

  removeFromWishlist();







