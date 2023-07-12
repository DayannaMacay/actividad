const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const BotonCotizacion = document.getElementById('btn-cotizacion');
const BotonRolPagos = document.getElementById('btn-rolPagos');

const expresiones = {
    /*FORMULARIO COTIZACION */
    ci: /^[0-9]+$/, //Solo numeros del 0 al 9
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    apellido: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    direccion: /^[a-zA-Z0-9_.+-]+[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$/,
    precio: /^[0-9]+$/,
    /*FORMULARIO CONTABILIDAD*/
    nombreE: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
    hExtras: /^[0-9]+([,][0-9]+)?$/
}

const campos = {
    /*FORMULARIO COTIZACION */
    ci: false,
    nombre: false,
    apellido: false,
    direccion: false,
    precio: false,
    /*FORMULARIO CONTABILIDAD*/
    nombreE: false,
    horasT: false
}

const validarFormulario = (e) => {
    /*FORMULARIO COTIZACION */
    switch (e.target.name) {
        case "ci":
            validarCampo(expresiones.ci, e.target, 'ci');
            break;
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
            break;
        case "apellido":
            validarCampo(expresiones.apellido, e.target, 'apellido');
            break;
        case "direccion":
            validarCampo(expresiones.direccion, e.target, 'direccion');
            break;
        case "precio":
            validarCampo(expresiones.precio, e.target, 'precio');
            break;
        /*FORMULARIO CONTABILIDAD*/
        case "nom-em":
            validarCampo(expresiones.nombreE, e.target, 'nom-em');
            break;
        case "htrabajadas":
            validarCampo(expresiones.horasT, e.target, 'htrabajadas');
            break;
    }
}

const validarCampo = (expresion, input, campo) => {
    if (expresion.test(input.value)) {
        document.getElementById(`${campo}`).style.backgroundColor = "#68EC41";
        campos[campo] = true;
    } else {
        document.getElementById(`${campo}`).style.backgroundColor = "#FE564B";
        campos[campo] = false;
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

/*FORMULARIO COTIZACION*/
const ImprimirDatosCotizacion = () => {
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const cedula = document.getElementById('ci').value;
    const tipoVehiculo = document.getElementById('grupo__tipo-auto').value;
    const precio = document.getElementById('precio').value;

    const precioParcial = parseFloat(precio);
    let precioFinal;

    if (tipoVehiculo === "Ford Fiesta") {
        precioFinal = precioParcial - (precioParcial * 0.05);
    } else {
        precioFinal = precioParcial - (precioParcial * 0.10);
    }
    alert(`Datos del cliente:\nNombre: ${nombre}\nApellido: ${apellido}\nCedula: ${cedula}\nPrecio Final: ${precioFinal}`);
}
BotonCotizacion.addEventListener('click', ImprimirDatosCotizacion);

/*FORMULARIO CONTABILIDAD*/
const ImprimirDatosRolPagos = () => {
    const nombreE = document.getElementById('nom-em').value;
    const cargo = document.getElementById('selecCargo').value;
    const horasExtras = document.getElementById('htrabajadas').value;

    const horasExtrasT = parseFloat(horasExtras);
    let sueldoParcial = 0;
    let sueldoTotal;

    if (cargo === "Administrativo") {
        sueldoParcial = 700;
    } else if (cargo === "Supervisor") {
        sueldoParcial = 650;
    } else if (cargo === "Operario") {
        sueldoParcial = 440;
    } else if (cargo === "Control de Calidad") {
        sueldoParcial = 490;
    }

    sueldoTotal = sueldoParcial + (horasExtrasT * 10);

    alert(`Datos del empleado:\nNombre: ${nombreE}\ncargo: ${cargo}\nSueldo Total: ${sueldoTotal}`);
}
BotonRolPagos.addEventListener('click', ImprimirDatosRolPagos);