//Variables
let burgas = [];
fetch("./js/burgas.json")
    .then(response => response.json())
    .then(data =>{
        burgas = data;
        cargarBurgas(burgas)

    }) 

let burgasCarrito = JSON.parse(localStorage.getItem('burgasCarrito')) || [];

const shopContent    = document.getElementById('menuCardContainer');
const modalContainer = document.getElementById('modalContainer');
const verCarrito     = document.getElementById('verCarrito');

//Funciones 
//Crea el carrito al hacer click en el icono
const pintarCarrito = () =>{
    
    modalContainer.innerHTML ='';
    modalContainer.style.display = 'flex';
    const modalHeader     = document.createElement('div');
    modalHeader.className = "modalHeader";
    modalHeader.innerHTML = `
        <h2 class="tituloCarrito">Carrito </h2>
        `;
    modalContainer.append(modalHeader);

    const modalButton     = document.createElement('h3');
    modalButton.innerText = "X";
    modalButton.className = 'modalHeaderBtn';

    modalButton.addEventListener('click', () =>{

        modalContainer.style.display = 'none';

    });
    modalHeader.append(modalButton);


    
    
    // Burga en carrito, crea una linea con el precio nombre y el boton eliminar burga

    burgasCarrito.forEach((burga)=> {
    let carritoContent       = document.createElement('div');
    carritoContent.className = 'contenidoModal'
    carritoContent.innerHTML = `
        <p class ='nombreCarrito'>${burga.nombre}</p>
        <p class ='precioCarrito'>${burga.precio}</p>
        <span class='borrarBurga'>❌</span>
        `;

    modalContainer.append(carritoContent);

    let borrarBurga = carritoContent.querySelector('.borrarBurga');
    borrarBurga.addEventListener('click', ()=>{
        eliminarBurga(burga.id);
    });
    });

    const eliminarBurga = (id) =>{

            const buscarID = burgasCarrito.find((element) => element.id === id);
        
            burgasCarrito = burgasCarrito.filter((carritoID) =>{
                return carritoID !== buscarID;
            });

            saveLocal();
            pintarCarrito();

        }
    
    //Boton Finalizar Pedido, crea el elemento html de finalizar pedido y ejecuta con el click la alerta, vacia el carrito y renueva el savelocal
    if (burgasCarrito.length >= 1 ){
    const finalizarPedido     = document.createElement('h3');
    finalizarPedido.innerText = 'Finalizar pedido';
    finalizarPedido.className = 'finalizarPedido';
    
    finalizarPedido.addEventListener('click', () =>{

        Swal.fire({
            title: 'Desea finalizar el pedido?',
            text: `El total es de ${total}`,
            icon: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Finalizar pedido'
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Ya estamos haciendo tu pedido',
                'En 30 minutos podras retirarlo por nuestro local ',
                'success'
              )
              burgasCarrito.length = 0;
              localStorage.setItem('burgasCarrito', JSON.stringify(burgasCarrito));
              saveLocal();
              pintarCarrito();
  
            }
          })

    })
    modalContainer.append(finalizarPedido);
    }

   

 //Crea el elemento html de vaciar carrito y ejecuta con el click la alerta, vacia el carrito y renueva el savelocal
    if (burgasCarrito.length >= 1 ){
    const vaciarCarrito     = document.createElement('h3');
    vaciarCarrito.innerText = "Vaciar Carrito";
    vaciarCarrito.className = 'vaciarCarrito';

    vaciarCarrito.addEventListener('click', () =>{

          Swal.fire({
            title: 'Desea vaciar el carrito?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si, deseo vaciar el carrito',
            denyButtonText: `No, no deseo vaciar el carrito`,
          }).then((result) => {
            
            if (result.isConfirmed) {
              Swal.fire('🗑️✅', 'Carrito Vacio', 'Empiece de nuevo su pedido');
              burgasCarrito.length = 0;
            localStorage.setItem('burgasCarrito', JSON.stringify(burgasCarrito));
            saveLocal();
            pintarCarrito();


            } else if (result.isDenied) {
              Swal.fire('✅','El carrito se mantuvo' )
            }
          })

    });

    modalContainer.append(vaciarCarrito);
    }  
    //Calcula el  total, suma los precios de cada burga con la funcion reduce
    const total       = burgasCarrito.reduce((acc, el) => acc + el.precio, 0);
    const totalCompra = document.createElement('div');
    
    totalCompra.className = 'totalCompra';
    totalCompra.innerHTML = `Precio total : ${total } `;
    modalContainer.append(totalCompra)

};

const saveLocal = () =>{
    localStorage.setItem('burgasCarrito', JSON.stringify(burgasCarrito));
}
 function cargarBurgas(){burgas.forEach((burga) => {

    let content = document.createElement('div');
    content.className ='cardContainer'
    content.innerHTML = `
    
    <div class="cardBody">
    <img class="imagen" src="Fotos Burgas/simple.jpg" alt="">
    <h2 class="nombreBurga">${burga.nombre}</h2>
    <p class="descripcionBurga">${burga.descripcion}</p>
    <p class="precio"> ${burga.precio} </p>
    
    </div>
    `;
    shopContent.append(content);


//Agrega la burga al carrito, pushea su informacion  y muestra la alerta
let agregar = document.createElement('button');
agregar.innerText = "Agregar";
agregar.type = "button";
agregar.id = "btn"
content.append(agregar)
agregar.addEventListener('click', () =>{
    Toastify({
        text: "Burga agregada",
        duration: 1000,
        newWindow: true,
        gravity: "top", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background:"#9d0919",
          
        },
        onClick: function(){} 
      }).showToast();
    
    burgasCarrito.push({
    id: burga.id,
    nombre: burga.nombre,
    precio: burga.precio

} )
saveLocal();
    
});


})};


//Program
verCarrito.addEventListener('click', pintarCarrito);







