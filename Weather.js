
let request = new XMLHttpRequest();

let arrCiudades = new Array('Sevilla', 'Cracovia', 'London', 'Berlin', 'Paris');

let select_tag = document.getElementsByTagName('select');

let div_principal = document.getElementById('container');
div_principal.style = "width: 300px; margin: 0 auto; text-align: center;box-shadow: 5px 10px #8CCAD0;background-color:rgb(144, 208, 214,0.2);";

let divDatos = document.createElement('div');
//le damos estilo para que salga hacia abajo los datos.
divDatos.style = "display: flex; flex-direction: column;";
divDatos.id = 'divDatos';

for (let i = 0; i < arrCiudades.length; i++) {
    let ciudad = arrCiudades[i];

    let option = document.createElement('option');
    option.value = ciudad;
    option.innerText = ciudad;
    //para que el valor de las opciones inicial no sea ninguna ciudad
    select_tag[0].appendChild(option);
}

let seleccion = select_tag[0].onchange = (ciudad) => {
    if (ciudad.target.value !== 'null') {
        request.open('GET', 'http://api.openweathermap.org/data/2.5/weather?q=' + ciudad.target.value + '&appid=ab330cff9f93cc2735e3342473038b18');

        request.onload = () => {
            if (request.readyState === 4) {
                let datosCiudadSeleccionada = JSON.parse(request.response);
                console.log(datosCiudadSeleccionada);
                divDatos.innerHTML = `<br>Los datos para ${ ciudad.target.value} son:<br>
                                    <br>Temperatura Actual: ${ datosCiudadSeleccionada.main.temp }º Kelvin<br>
                                    Humedad: ${ datosCiudadSeleccionada.main.humidity }%<br>
                                    Presion atmosferica: ${ datosCiudadSeleccionada.main.pressure } bar/es<br>
                                    Temperatura máxima hoy: ${ datosCiudadSeleccionada.main.temp_max } º Kelvin<br>
                                    Temperatura mínima hoy: ${ datosCiudadSeleccionada.main.temp_min } º Kelvin `;
                                   


            } else {
                alert('No ha sido posible realizar la petición', request.onerror);
            }
        }

        request.send();
    } else {
        divDatos.innerHTML = '';
    }

    div_principal.appendChild(divDatos);
}
