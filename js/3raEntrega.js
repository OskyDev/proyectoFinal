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



//Creacion y funciones carrito
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
    if (burgasCarrito.length >= 1 ){
    const borrarTodo     = document.createElement('h3');
    borrarTodo.innerText = "Borrar todos los productos";
    borrarTodo.className = 'borrarTodo';

    borrarTodo.addEventListener('click', () =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            // buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: 'Estas seguro de borrar todo el carrito?',
            text: "Empezara tu pedido desde 0",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Si, quiero empezar de nuevo !',
            cancelButtonText: 'No, mantener mi pedido !',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Eliminado!',
                'Ya podes empezar tu pedido desde 0',
              ) 
            burgasCarrito.length = 0;
            localStorage.setItem('burgasCarrito', JSON.stringify(burgasCarrito));
            saveLocal();
            pintarCarrito();

            } else if (
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Todo sigue igual 😊',
                'Tu pedido se mantuvo'
              )
              
            }
          })

       

    });

    modalHeader.append(borrarTodo);
    }  
    

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
    
    


    //Total
    const total       = burgasCarrito.reduce((acc, el) => acc + el.precio, 0);
    const totalCompra = document.createElement('div');
    
    totalCompra.className = 'totalCompra';
    totalCompra.innerHTML = `Precio total : ${total } `;
    modalContainer.append(totalCompra)

};
verCarrito.addEventListener('click', pintarCarrito);

//Funciones burgas

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
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background:"#9d0919",
          
        },
        onClick: function(){} // Callback after click
      }).showToast();
    
    burgasCarrito.push({
    id: burga.id,
    nombre: burga.nombre,
    precio: burga.precio

} )
saveLocal();
    
});


})};

// Local Storage
const saveLocal = () =>{
    localStorage.setItem('burgasCarrito', JSON.stringify(burgasCarrito));
}

