const $mostrar = $('#mostrar');
const $error = $('p')

function limpiarLista($ul){
    if($ul.length>=1){
        $ul.empty();
    }
}

function chequeartipo($tipo){

    if(!/[A-z]+$/.test($tipo)){
        $error.text('Recuerde que el tipo de moneda SOLO DEBE TENER LETRAS!')
        $error.removeClass('visually-hidden');
        $error.addClass('alert alert-danger')
        return false;      
    }else{
        if($tipo.length === 3){
            $error.addClass('visually-hidden');
            $error.removeClass('alert alert-danger');
            return true;
        }else if($tipo.length !== 3){
            $error.text('Recuerde que el tipo de moneda debe tener 3 letras!')
            $error.removeClass('visually-hidden');
            $error.addClass('alert alert-danger')
            return false;
        }
    }     
}

$mostrar.click(function(){
    const $tipo = $('#tipo').val();
    chequeartipo($tipo);
    if(chequeartipo($tipo)===true){
    fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=aa67ce9922608097cb34d06810df9414&symbols=${$tipo}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        const $ul = $('ul');
        limpiarLista($ul);
        $('#titcambio').text(`Cambios a la fecha (${respuesta.date}) --- Base: ${respuesta.base}` )

        Object.keys(respuesta.rates).forEach(tipoMoneda => {
            $('ul').append($(`<li>${tipoMoneda} : ${respuesta.rates[tipoMoneda]}</li>`))
        })
        
    })
    .catch(error => {
        $('#titcambio').text('Hubo un fallo en el servidor.')
        console.error('error.', error);
    })
    }
});


