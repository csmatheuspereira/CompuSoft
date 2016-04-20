function listaUsuariosLocais() {
    $('#cmbUsuarioMainPage option[value!="0"]').remove();
    dati.selectAll("tblUsers", function(registros) {
        
        $.each(registros, function(c, usuarios){
            
            $('#cmbUsuarioMainPage').append($('<option>', {
                value: usuarios.ID,
                text: usuarios.NOME
            }));
            
        })
        
        
    })
    
}

function loginMainPage(json){
    
    if (json.result==true) {
        $("#txtSenhaMainPage").val("");
        activate_page("#activitymain");        
    } else {
        if(json.msg != "" || json.msg != null || json.msg != undefined){
            navigator.notification.alert("Usuário ou senha incorreto(s).");        
        }else{
            navigator.notification.alert(json.msg);            
        }
    }
    
}

$(document).on("change", "#cmbUsuarioMainPage", function() {
   
    $("#txtSenhaMainPage").val("");
    
});
    
