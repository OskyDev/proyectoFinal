let pedido         = [  ];
// let preguntaBurga  = 'pedir';
// let seguirPidiendo = true;

class Burga {
     constructor(nombre , precio){
    this.nombre = nombre;
    this.precio = precio;
     }
}

function hacerPedido( pedidoHamburguesa ){

    switch(pedidoHamburguesa){

        case 'SIMPLE':
            pedido.push( new Burga('Simple',900) );
            break
        case 'DOBLE':
            pedido.push( new Burga('Doble',1050) );
            break
        case 'TRIPLE':
            pedido.push( new Burga('Triple',1250) );
            break
        
        
        case 'VEGGIE':
            pedido.push( new Burga('Veggie',1150) );
            break    
        case 'SMOCKED':
            pedido.push( new Burga('Smocked',1350) );
            break;
        default:
            alert('No ingreso el nombre de la hamburguesa correctamente, complete su pedido desde cero de nuevo presionando aceptar');
           break
    }

 }

// function pedirNombre(){
//     let nombre   = prompt("Ingrese su nombre ");
    
//     if ( nombre == '' ) {
//         alert('No ingreso ningun nombre, presione aceptar y empiece de nuevo ');
//         pedirNombre()
//     } else {

//     alert(`Hola ${nombre}. Presione aceptar para empezar su pedido`)
        
//     }
// }

// function envioPedido(){
    
//     let pedidoOTakeaway = prompt('Prefiere delivery o takeaway? El delivery cuesta 250$ y llega desde 1 a 31 y desde 32 a 72. Ingrese Delivery o Takeaway para seguir  ').toUpperCase();
//     switch( pedidoOTakeaway ){
        
//         case 'TAKEAWAY' || 'TAKE AWAY':
//             alert('Eligio Takeaway , su pedido estara listo para ser retirado en 30 minutos');
//             break;
        
//         case 'DELIVERY': 
//             let direccionDelivery = prompt('Eligio delivery , ingrese su calle ');
//             if (direccionDelivery<32 && direccionDelivery>72 ){
                
//             }
//             ;
        
//         default : 
//             alert('Error. Escriba nuevamente si desea delivery o take away');
//             envioPedido();
//     }
// } 

// Programa Principal

// pedirNombre()

 do {

        let pedidoHamburguesa = prompt(`Que burga desea ${preguntaBurga}  hoy? Nuestras opciones son: Simple , Doble , Triple, Stacker , Veggie o Smocked`).toUpperCase()
         hacerPedido(pedidoHamburguesa) 
    
        let agregarCosas = prompt('Desea agregar algo mas?(SI/NO)').toUpperCase();

        switch(agregarCosas) {

            case 'SI':
                preguntaBurga = 'agregar';
                break
            case 'NO':
                seguirPidiendo = false;
                break
            default:  
                agregarCosas = prompt('No ingreso su respuesta correctamente , ingrese SI o NO').toUpperCase();
                break
             }
       
    } while ( seguirPidiendo == true );
    
    let nombresBurga = pedido.map(burga => burga.nombre);
    let preciosBurga = pedido.map(burga => burga.precio);
    let precioFinal = precios.reduce((acumulador, precio) => acumulador + precio)
    

    alert (`Su pedido incluye : ${ nombres.join('-') } y el precio total es de ${precioFinal}`);


    // prevent default , no deja escribir lo que no esta en tu charcode elegidor