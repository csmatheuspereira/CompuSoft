var urlWS = "";
var flagSenha = "N";

function checaWS(){
    
    if (localStorage.getItem("urlWS") === null) {
        localStorage.setItem("urlWS", "");
        urlWS = "";    
        return false;
    } else {
    
        if (localStorage.getItem("urlWS").length > 0) {
            urlWS = localStorage.getItem("urlWS");
            return true;            
        } else {
            localStorage.setItem("urlWS", "");
            urlWS = "";
            return false;
        }
    }
}

function webService(values, status, callback){
        $.ajax({
            type: "POST",
            dataType: "json",
            url: urlWS,
            data: values,
            success: function(json) {
                callback(json);
            },
            beforeSend: function() {
                $("#loader").removeClass("hidden");
            }
        })
        .done(function() {
            $("#loader").addClass("hidden");
        })
        .fail(function(jqXHR, textStatus) {
            $("#loader").addClass("hidden");
            alert( "Request failed: " + textStatus );
        });
}

function checaCampo(values) {

    var erro = false;

    for (var i = 0; i <= values.length -1; i++) {

        if (values[i] == undefined || values[i] == "") {
            i = (values.length + 1);
            erro = true;
        }
    }

    return erro;

}

function dump(obj) {
    var out = '';
    for (var i in obj) {
        out += i + ": " + obj[i] + "\n";
    }

    navigator.notification.alert(out);
    //alert(out);
}

function Cript(dados){

    var chave = 487;
    var addTexto = "7NSgN7UGiU5pGae6ovO5TCk9LlEA087hKezQ";

    var word = dados;
    word += addTexto;
    var s = (word.length+1);
    var nw = "";
    var n = chave;
    var nindex,m;

    for (var x = 1; x < s; x++){
        m = x*n;
        if (m > s){
            nindex = m % s;
        }
        else if (m < s){
            nindex = m;
        }
        if (m % s == 0){
            nindex = x;
        }
        nw = nw+word[nindex-1];
    }
    return nw;
}


// Controla qualquer badge que precise no aplicativo

// Parametro quantidade(1): quantidade recebida do JSON, serve tambem para comparasao.
// Parametro objeto(2): deve ser passado o ID ou CLASSSE do objeto que sera inserido o numero

// Modo de uso:
//  badge(variavelDeEntradaJSON, ".classeDoObjeto"); Exemplo com CLASSE do objeto
//  badge(variavelDeEntradaJSON, "#idDoObjeto"); Exemplo com ID do objeto

function badge(quantidade,objeto,clique){
    
    if(quantidade > 0 && quantidade < 100 && clique == "0"){
        $(objeto).removeClass("hidden");
        $(objeto).html(" ");
        $(objeto).html(quantidade);
    }else if(quantidade > 99 && clique == "0"){
        $(objeto).removeClass("hidden");
        $(objeto).html(" ");
        $(objeto).html("+99");
    }else{
        $(objeto).addClass("hidden");
    }
    
}

function geraData(separador,posicao){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    
    if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    }
    
    if(posicao == 1){
        today = dd+separador+mm+separador+yyyy;
    }else if(posicao == 2){
        today = yyyy+separador+mm+separador+dd;
    }
    
    return today;
    
}