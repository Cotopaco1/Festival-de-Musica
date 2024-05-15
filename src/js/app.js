//Agregamos evento que se cumple cuando se carga el html
document.addEventListener('DOMContentLoaded', function(){
    crearGaleria()  //ejecutamos la funcion
    navegacionFixed()
    resaltarEnlace();
    scrollNav()
})

//Creamos funcion para navegacion fixed
function navegacionFixed(){
    //Seleccionamos la barra de navegacion y la seccion festival.
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.festival')

    //Agregamos un event de scroll, 
    document.addEventListener('scroll', function(){
        let scrollNumber = sobreFestival.getBoundingClientRect().bottom
        if( scrollNumber < 1){
            header.classList.add('header-fixed')

        }
        else{
            header.classList.remove('header-fixed')
        }
        
        
    })
}


//Creamos funcion para crear la galeria.
function crearGaleria(){
    //seleccionamos el contenedor de galeria
    const galeria = document.querySelector('.galeria-imagenes');
    const CANTIDAD_IMAGENES = 16;
    
    //Creamos un for para crear imagenes en bucle.
    for(let i=1; i<= CANTIDAD_IMAGENES; i++){
        //creando imagen
        const imagen = document.createElement('PICTURE');
        imagen.innerHTML = `
        <source srcset="build/img/gallery/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/gallery/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/gallery/thumb/${i}.jpg" alt="imagen galeria">
    `;
        

        // Event handler
        imagen.onclick = function(){
            mostrarModal(i);
        }
        //Insertamos la imagen creada en el contenedor galeria.
        galeria.appendChild(imagen);
        
        

    }


}

//Creamos funcion para crear y mostrar el modal.
function mostrarModal(p){

    //creamos modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');


    //creamos imagen
    const imagen = document.createElement('PICTURE');
    imagen.innerHTML = `
    <source srcset="build/img/gallery/full/${p}.avif" type="image/avif">
    <source srcset="build/img/gallery/full/${p}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/gallery/full/${p}.jpg" alt="imagen galeria">
`;
        

    //Creamos boton
    const botonCerrar = document.createElement('BUTTON');
    botonCerrar.classList.add(`boton-cerrar`);
    botonCerrar.textContent = `X`;


    //agregamos la imagen dentro del modal.
    modal.appendChild(imagen);

    //Agregamos el boton de cerrar al modal
    modal.appendChild(botonCerrar);

    //Agregamos event handler al botonCerrar
    botonCerrar.onclick= function(){
        cerrarModal();
    }
    //event handler para cerrar el modal
    modal.onclick = function(){
        cerrarModal();
    }

    //agregamos modal al body
    const body = document.querySelector('body');
    body.appendChild(modal);
    //quitamos scroll del usuario
    body.classList.add('overflow-hidden');

}

//funcion para eliminar modal
function cerrarModal(){
    //seleccionamos la etiqueta de modal
    const modal = document.querySelector('.modal');

    //Agregamos la clase fadeOut para animacion al cerrarModal
    modal.classList.add('fadeOut');

    //agregamos tiempo de espera
    setTimeout(() => {
        //Seleccionamos el body
        const body = document.querySelector('body');
        //Eliminamos el modal
        modal?.remove();
        //Eliminamos la clase que quita el scroll del body.
        body.classList.remove('overflow-hidden');
    }, 500);
    
}

//funcion para resaltar enlaces.
function resaltarEnlace(){
    //evento de scroll
    document.addEventListener('scroll', () => {
        //traemos los sections y los links de nav en arrays.
        const sections = document.querySelectorAll('section')
        const navLinks = document.querySelectorAll('.navegacion-principal a')
        //declaro variable para guardar la section actual
        let actual = ''
        //realizo un foreach para guardar datos de cada elemento en el momento de scroll
        sections.forEach(element => {
            const offsetTop = element.offsetTop
            const elementHeight = element.clientHeight

            //Usamos los datos guardados para conocer en que secciones estamos.
            //Hacemos un condicionant para guardar el id del elemento en el que 
            //Estamos actualmente
            if( window.scrollY >= (offsetTop - elementHeight / 3)){
                actual = element.id;

            }

            //Usamos un foreach en link para recorrer los links y encontrar el link que tenga el mismo id que la section que estamos actualmente viendo
            navLinks.forEach(link => {
                if(link.getAttribute('href')=== '#' + actual){
                    //agregamos la clase actvio que genera el subrayado amarillo
                    link.classList.add('activo')
                }else{
                    //Si no es la clase activa le quitamos la clase.
                    link.classList.remove('activo')
                }
            })
            
        });
        
    })
}

//funcion para realizar scroll con animacion smooth, al dar click en los linkNav
function scrollNav(){
    //Seleccionamos los links
    const linkNav = document.querySelectorAll('.navegacion-principal a')
    //Iteramos en cada link
    linkNav.forEach(link =>{
        //agregamos evento de click a cada link
        link.addEventListener('click', function(e){
            //quitamos la accion por default que tienen de llevarnos a la seccion
            e.preventDefault()
            //guardamos el href del link clickeado.
            const section =  e.target.getAttribute('href')
            //traemos la seccion con el mismo id que tiene el link.
            const sectionScroll =  document.querySelector(section)
            //Agregamos accion de scrollear hasta la section seleccionada.
            sectionScroll.scrollIntoView({behavior: 'smooth'});
            
        })
        
    })

    
}