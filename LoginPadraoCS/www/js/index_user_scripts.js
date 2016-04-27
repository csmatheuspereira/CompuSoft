/*jshint browser:true */
/*global $ */(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    var dispToken = "";
    
     /* button  #btnNovo */
    $(document).on("click", "#btnNovoMainPage", function(evt)
    {
         /*global activate_page */
         activate_page("#novousuario"); 
    });
    
        /* button  #btnVoltarNovoUsuario */
    $(document).on("click", "#btnVoltarNovoUsuario", function(evt)
    {
         /*global activate_page */
        listaUsuariosLocais();
        
        activate_page("#mainpage"); 
    });
    
        /* button  #btnLoginNovoUsuario */
    $(document).on("click", "#btnLoginNovoUsuario", function(evt)
    {
        var dispUUID = device.uuid;
        var dispNome = device.manufacturer +" "+ device.model;
        
        if (checaWS()) {
            
            var valuesCheca = [ $("#txtNomeNovoUsuario").val(), $("#txtSenhaNovoUsuario").val() ];
            
            localStorage.setItem("login", $("#txtNomeNovoUsuario").val());
            localStorage.setItem("senha", Cript($("#txtSenhaNovoUsuario").val()));
            
            var values = {'acao':'login','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'DispUUID':dispUUID,'DispNome':dispNome,'DispToken':dispToken};

            if(!checaCampo(valuesCheca)){
                webService(values, "#retorno", login);
            } else {
                navigator.notification.alert("Digite valores corretos!", "Erro");
            }
        } else {
            navigator.notification.alert("Defina a URL de serviço!", "Atenção");
            activate_page("#configuracoes");
        }            
    });
    
    
        /* listitem  #btnLimparBDMainPage */
    $(document).on("click", "#btnLimparBDMainPage", function(evt)
    {
        localStorage.setItem("urlWS", "");
        dati.emptyTable("tblUsers",function(status){
            listaUsuariosLocais();
        }); 
    });
    
        /* button  #btnConfigMainPage */
    $(document).on("click", "#btnConfigMainPage", function(evt)
    {
        
         uib_sb.toggle_sidebar($(".uib_w_15"));  
    });
    
        /* button  #btnVoltarMainPage */
    $(document).on("click", "#btnVoltarMainPage", function(evt)
    {
        
         uib_sb.toggle_sidebar($(".uib_w_15"));  
    });
    
        /* listitem  #btnURLMainPage */
    $(document).on("click", "#btnURLMainPage", function(evt)
    {
        uib_sb.close_sidebar($(".uib_w_15"));   
            
        document.getElementById("txtURLConfiguracoes").value = localStorage.getItem("urlWS");            
        
        activate_page("#configuracoes");
    
        
    });
    
        /* button  #btnCancelarConfiguracoes */
    $(document).on("click", "#btnCancelarConfiguracoes", function(evt)
    {
         /*global activate_page */
         activate_page("#mainpage");
    });
        
    
        /* button  #btnSalvarConfiguracoes */
    $(document).on("click", "#btnSalvarConfiguracoes", function(evt)
    {
        localStorage.setItem("urlWS", $("#txtURLConfiguracoes").val());
        activate_page("#mainpage");
    });
     
     listaUsuariosLocais();
     if (!checaWS()) { 
         navigator.notification.alert("Defina a URL de serviço", "Atenção");
         activate_page("#configuracoes");
     } ;
    
    
    
    
        /* button  #btnLoginMainPage */
    $(document).on("click", "#btnLoginMainPage", function(evt)
    {
        var dispUUID = device.uuid;
        var dispNome = device.manufacturer +" "+ device.model;

        if (checaWS()) {
            
            var cmbText = document.getElementById("cmbUsuarioMainPage");
            
            var valuesCheca = [ cmbText.options[cmbText.selectedIndex].text, $("#txtSenhaMainPage").val() ];
            
            localStorage.setItem("login", cmbText.options[cmbText.selectedIndex].text);
            localStorage.setItem("senha", Cript($("#txtSenhaMainPage").val()));
            
            var values = {'acao':'login','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'DispUUID':dispUUID,'DispNome':dispNome,'DispToken':dispToken};
                        
            if(!checaCampo(valuesCheca)){
                webService(values, "#retorno", loginMainPage);
            } else {
                navigator.notification.alert("Digite valores corretos!", "Erro");
            }
        } else {
            navigator.notification.alert("Defina a URL de serviço!", "Atenção");
            activate_page("#configuracoes");
        }         
    });
     
        checaWS();
     
     if(device.platform == "android"){
        $("#loader").removeClass("hidden");
        var push = PushNotification.init({ "android": {"senderID": "788790867910"},
            "ios": {"alert": "true", "badge": "true", "sound": "true"}, "windows": {} } );

        push.on('registration', function(data) {
            //console.log(data.registrationId);
            //$("#gcm_id").html(data.registrationId);
            $("#loader").addClass("hidden");
            dispToken = data.registrationId;
           // navigator.notification.alert(dispToken);
        });

        push.on('notification', function(data) {
            console.log(data.message);
            alert(data.title+" Message: " +data.message);
            // data.title,
            // data.count,
            // data.sound,
            // data.image,
            // data.additionalData
        });

        push.on('error', function(e) {
            console.log(e.message);
        });
     }   
    
        /* button  #btnLogoutActivityMain */
    $(document).on("click", "#btnLogoutActivityMain", function(evt)
    {
        var values = {'acao':'logout','Login':localStorage.getItem("login"),'Senha':localStorage.getItem("senha"),'FlagSenha':flagSenha,'dispUUID':device.uuid};
        
        if (checaWS()) {
            webService(values, "#retorno", logout);
        } else {
            navigator.notification.alert("Defina a URL de serviço!", "Atenção");
            activate_page("#configuracoes");
        }     
    });

     
    }
       
    document.addEventListener("app.Ready", register_event_handlers, false);
        
})();
