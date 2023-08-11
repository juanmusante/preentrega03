const padre = document.getElementById('productos')

/** ARRAY DE PRODUCTOS */
const maquinas = [{id: 1, tipo: "Rotativa", modelo: "J4", precio: 10000, img: "assets/img/rotativa1.jpeg"},
{id: 2, tipo: "Rotativa", modelo: "Z4", precio: 9000, img: "./assets/img/rotativa2.jpg"},
{id: 3, tipo: "Rotativa", modelo: "H0", precio: 7500, img: "./assets/img/rotativa3.jpg"},
{id: 4, tipo: "Bobina", modelo: "Esmeralda", precio: 12000, img: "./assets/img/bobina1.jpg"},
{id: 5, tipo: "Bobina", modelo: "León", precio: 6000, img: "./assets/img/bobina2.jpg"},
{id: 6, tipo: "Bobina", modelo: "Control", precio: 5000, img: "./assets/img/bobina3.jpg"},
{id: 7, tipo: "Bobina", modelo: "Dragón", precio: 4500, img: "./assets/img/bobina4.jpg"},
{id: 8, tipo: "Bobina", modelo: "Zona", precio: 8600, img: "./assets/img/bobina5.jpg"},
{id: 9, tipo: "Lápiz", modelo: "B12", precio: 9800, img: "./assets/img/lapiz1.jpg"},
{id: 10, tipo: "Lápiz", modelo: "M11", precio: 13000, img: "./assets/img/lapiz2.jpg"},
{id: 11, tipo: "Rotativa", modelo: "F2", precio: 6700, img: "./assets/img/rotativa4.jpg"},
{id: 12, tipo: "Rotativa", modelo: "F5", precio: 9400, img: "./assets/img/rotativa5.jpg"}];

/** valor del carrito almacenado en storage */
function agregarLocalStorage(maquina){
    let maquinas = localStorage.getItem('maquinas');
    
    let arrayMaquinas = [];

    maquinas !== null && (arrayMaquinas = maquinas.split(','));

    arrayMaquinas.push(maquina.precio);

    localStorage.setItem('maquinas', arrayMaquinas);

    console.log(arrayMaquinas);
}

/* Armado de HTML por medio de DOM */
maquinas.forEach((maquina) => {
    const divMaster = document.createElement('div');
    divMaster.classList.add('cadaProducto')
    const p = document.createElement('p');
    p.innerHTML = 'Modelo "' + maquina.modelo + '"';
    divMaster.appendChild(p);
    const img = document.createElement('article');
    img.innerHTML = `<img class="imgProd" src=${maquina.img}>`;
    divMaster.appendChild(img);
    const divPrecio = document.createElement('div');
    divPrecio.classList.add('divPrecio');
    divMaster.appendChild(divPrecio);
    const p3 = document.createElement('p');
    p3.innerHTML = '$'
    divPrecio.appendChild(p3);
    const p2 = document.createElement('p');
    p2.classList.add('precio')
    p2.innerHTML = parseInt(maquina.precio);
    divPrecio.appendChild(p2);
    const button = document.createElement('button');
    button.classList.add('botonCarro')
    button.innerHTML = 'Añadir al carrito'
    divMaster.appendChild(button);
    padre.appendChild(divMaster);

    button.addEventListener('click', () => {
        agregarLocalStorage(maquina);
        Toastify({
            text: "Maquina Agregada",
            duration: 1500,
            destination: "./carro.html",
            newWindow: true,
            gravity: "bottom",
            position: "right",
            stopOnFocus: true,
            style: {
              background: "linear-gradient(to top, rgb(107, 105, 105), rgb(230, 223, 223))",
            },
        }).showToast();
    })
})



/** suma de precios */
let total = 0;

function clickParaAgregar(event){
    
    const eventoBoton = event.target;
    const cadaProducto = eventoBoton.closest(('.cadaProducto'))

    const precio = Number (cadaProducto.querySelector('.precio').textContent);

    eventoBoton.addEventListener('click',() => {
        total += precio;
        document.getElementById('carrito').innerHTML = `Agregaste $${total}`;
    })
};

/** Evento de boton para añadir al carro */
const agregarAlCarrito = document.querySelectorAll('.botonCarro');
agregarAlCarrito.forEach(botonAgregarAlCarro => {
    botonAgregarAlCarro.addEventListener('click', clickParaAgregar);
})

/** vaciado de carrito */
const botonVaciar = document.getElementById('botonVaciar');
botonVaciar.addEventListener('click', () => {
    document.getElementById('carrito').innerHTML = 'CARRITO';
    localStorage.clear();
    Swal.fire({
        title: 'LISTO!',
        text: 'Carrito vaciado con éxito',
        icon: 'success',
        confirmButtonText: 'OK'
    })

    total = 0;

    arrayMaquinas = [];
});
