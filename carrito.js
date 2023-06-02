let carrito = localStorage.getItem("carrito");
carrito = JSON.parse(carrito);

const contenedorCarrito = document.getElementById("carrito-productos");

let totalFinalElement = document.querySelector('.total-numeros');
let totalFinal = 0;
carrito.forEach( (element) => {
  totalFinal += element.total; 
});
totalFinalElement.textContent = String(totalFinal);
localStorage.setItem('total', totalFinal); 

const printCards = (products, contenedor) => {
  contenedor.innerHTML = "";
  products.forEach((element) => {
    contenedor.innerHTML += `
      <article class="card">
      <figure class="card-figure">
      <img src=${element.image} alt=${element.name}${element.category}>
      </figure>
      <div class="div-name-price">
      <span class="span-category">${element.category}</span>
      <h3 class="h3-products">${element.name}</h3>
      <span class="span-price">$${Number(element.price).toLocaleString()}</span>
      </div>
      <div class="quantity">
      <button class="btn-quantity btn-less" onclick="decreaseQuantity(${element.id})">-</button>
      <span class="quantity-value">${element.quantity}</span>
      <button class="btn-quantity btn-more" onclick="increaseQuantity(${element.id})">+</button>
      </div>
      <div class="total">
        <span>Total:</span>
        <span id=${element.id}>$ ${element.total}</span>
        </div>
        <button id="deleteBtn" class="btn-delete" onclick="removeFromCarrito(${
          element.id
        })">Delete</button>
      </article>
      `;
  });
};


// Funcion para eliminar el producto del carrito
const removeFromCarrito = (id) => {
  let carrito = localStorage.getItem("carrito");
  carrito = JSON.parse(carrito);

  // Buscar el índice del elemento en el array de carrito
  const index = carrito.findIndex((item) => item.id === id);
  if (index !== -1) {
    carrito.splice(index, 1); // Eliminar el elemento del array
    localStorage.setItem("carrito", JSON.stringify(carrito)); // Actualizar el localStorage
    console.log("Elemento eliminado del carrito.");
    location.reload(); // Recargar la página
  }
};

// Función para aumentar la cantidad en 1
const increaseQuantity = (id) => {
  let carrito = localStorage.getItem('carrito');
  carrito = JSON.parse(carrito);
  let objetoEncontrado = carrito.find(objeto => objeto.id === id);
  objetoEncontrado.quantity += 1;
  objetoEncontrado.total = objetoEncontrado.quantity * objetoEncontrado.price;
  const indiceObjeto = carrito.findIndex(objeto => objeto.id === objetoEncontrado.id);
  //El metodo findIndex retorna "-1" si no encuentra nada
  if (indiceObjeto !== -1) {
    // Si se encontró el objeto, actualízalo dentro del arreglo
    carrito[indiceObjeto] = objetoEncontrado;
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  location.reload(); // Recargar la página
};

// Función para disminuir la cantidad en 1
const decreaseQuantity = (id) => {
  let carrito = localStorage.getItem('carrito');
  carrito = JSON.parse(carrito);
  let objetoEncontrado = carrito.find(objeto => objeto.id === id);
  if (objetoEncontrado.quantity > 0) {
    objetoEncontrado.quantity -= 1;
    objetoEncontrado.total = objetoEncontrado.quantity * objetoEncontrado.price;
    const indiceObjeto = carrito.findIndex(objeto => objeto.id === objetoEncontrado.id);
    //El metodo findIndex retorna "-1" si no encuentra nada
    if (indiceObjeto !== -1) {
      // Si se encontró el objeto, actualízalo dentro del arreglo
      carrito[indiceObjeto] = objetoEncontrado;
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    location.reload(); // Recargar la página
  }

};

printCards(carrito, contenedorCarrito);
removeFromCarrito();


