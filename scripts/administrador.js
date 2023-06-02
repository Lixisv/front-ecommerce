// Capturo los elementos que necesito


const formularioAdministrador = document.getElementById('formulario-administrador');
const tBodyProducts = document.getElementById('tBodyProducts');
const inputImage = document.getElementById('image');
const inputName = document.getElementById('name');
const inputPrice = document.getElementById('price');
const inputCategory = document.getElementById('category');
const botonAdd = document.getElementById('boton-add')
const URL_API = 'http://localhost:5000/products';
const URL_COMPRAS = 'http://localhost:5000/compras';
const botonNuevoProducto = document.getElementById('boton-nuevo-producto');
const botonCrear = document.getElementById('boton-crear');

let isEdit = false;

const historialTabla = document.getElementById('historialTabla');


const abrirFormulario = () => {
    formularioAdministrador.classList.remove('hidden');
    botonNuevoProducto.innerHTML = 'Nuevo producto';
    botonCrear.innerHTML = 'Guardar';
    formularioAdministrador.reset();
    isEdit = false;
}



//Creo una funcion para agregar los productos desde el array de json server en la tabla

const getProducts = async () => {
    const response = await fetch(URL_API);
    const data = await response.json();
    // tBodyProducts.innerHTML='';
    data.forEach(products => {
        tBodyProducts.innerHTML +=`
        <tr>
        <td>${products.image}</td>
        <td>${products.name}</td>
        <td>${products.price}</td>
        <td>${products.category}</td>
        <td><button class="edit" data-id="${products.id}">Edit</button></td>
        <td><button class="delete" data-id="${products.id}">Delete</button></td>
    </tr>`

    });
    getElementsTable();
};




// Creo una funcion para agregar nuevo producto desde el formulario 


const nuevoProducto = async (e) => {
    e.preventDefault();

    // Validar Campos del Formulario
    if (!inputImage.value || !inputName.value || !inputPrice.value || !inputCategory.value) {
        alert('Todos los campos son obligatorios')
        return
    };

    
    const newProduct = {
        image: inputImage.value,
        name: inputName.value,
        price: Number(inputPrice.value),
        category: inputCategory.value
    }

    if (isEdit) {
        const response = await updateProducts(newProduct);
        if (response.status === 200) {
            alert('Producto Actualizado Exitosamente')
        }
        else {
            alert('Oops, hubo un error al actualizar el producto')
        }
    }
    else {
        const response = await saveProduct(newProduct);
    if (response.status === 201) {
        alert('Producto Guardado Correctamente')
    }
    else {
        alert('Oops, hubo un error al guardar el producto')
    }
    }

    formularioAdministrador.reset();
    formularioAdministrador.classList.add('hidden')

    getProducts()
};


const updateProducts = async (products) => {
    try {
        const response = await fetch(`${URL_API}/${idProductEdit}`, {
            method: 'PATCH',
            body: JSON.stringify(products),
            headers: {
                "Content-type": "application/json"
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return error;
    }

};

const saveProduct = async(product) => {
    try {
        const response = await fetch(URL_API, {
            method: 'POST',
            body: JSON.stringify(product),
            headers: {
                "Content-type": "application/json"
            }
        })
        return response;
    } catch (error) {
        console.log(error);
        return error
    }
};


// Creo funciones para botones de Editar y Eliminar

// Uso fetch para eliminar producto de la lista 

const deleteProduct = async (id) => {
    console.log(id)
    const response = await fetch(`${URL_API}/${id}`, {
        method: 'DELETE',
    });
    if(response.status === 200) {
        alert('producto eliminado exitosamente')
    } else {
        alert('Hubo un error al eliminar productos')
    }

    getProducts()
};

const editProduct = async (id) => { 
    isEdit = true;
    idProductEdit=id;
    formularioAdministrador.classList.remove('hidden')
    const response = await fetch(`${URL_API}/${id}`);
    const products = await response.json();
    console.log(products)
    inputImage.value = products.image;
    inputName.value = products.name;
    inputPrice.value = products.price;
    inputCategory.value = products.category;

    botonNuevoProducto.innerHTML = 'Actualizar producto';
    botonCrear.innerHTML = 'Actualizar';
};

const getElementsTable = () => {
    const deleteElements = document.querySelectorAll('.delete');
    const editElements = document.querySelectorAll('.edit');
    
    deleteElements.forEach((element) => {
        const id = element.getAttribute('data-id');
        element.addEventListener('click', () => {
            deleteProduct(id);
        });
    });
    editElements.forEach(element => {
        const id = element.getAttribute('data-id');
        element.addEventListener('click', () => {
            editProduct(id);
        });
    });
};




botonNuevoProducto.addEventListener('click', abrirFormulario);

formularioAdministrador.addEventListener('submit', (e) => {
    nuevoProducto(e)
});

getProducts();




// Funcion para obtener los datos del array compras de json server y que aparezcan en la tabla de historial de compras

const getCompras = async () => {
    const response = await fetch(URL_COMPRAS);
    const data = await response.json();
    // tBodyProducts.innerHTML='';
    data.forEach(compras => {
        let productosStr = ''
        let productosLista = compras.productos;
        productosLista.forEach((prod) => {
            productosStr += `${prod.name}:${prod.quantity} - `
        });

        historialTabla.innerHTML +=`
        <tr>
        <td>${compras.datosCliente.nombre}</td>
        <td>${compras.datosCliente.direccion}</td>
        <td>${compras.datosCliente.telefono}</td>
        <td>${productosStr}</td>
        <td>${compras.total}</td>
    </tr>`

    });
};

getCompras();



































