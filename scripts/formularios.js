formulario = document.getElementById('form-cliente');
const URL_API = "http://localhost:5000/compras"
const enviarDatos = async (e) => {
    e.preventDefault();
    const {nombre, direccion, telefono} = e.target
    if(nombre.value.length === 0 || direccion.value.length === 0 || telefono.value.length === 0 ) {
        alert('Todos los campos son obligatorios')
    }
    else {
        datosCliente = {nombre: nombre.value, direccion: direccion.value, telefono: telefono.value};
        productos = JSON.parse(localStorage.getItem('carrito'));
        total = JSON.parse(localStorage.getItem('total'));
        compra = {datosCliente: datosCliente, productos: productos, total: total}
        try {
            const response = await fetch(URL_API , {
                method: 'POST',
                body: JSON.stringify(compra),
                headers: {
                    "Content-type": "application/json"
                }
            })
            localStorage.clear();
            location.reload();
            return response;
        } catch (error) {
            console.log(error);
            return error
        }
        
    }
}

formulario.addEventListener('submit', enviarDatos);