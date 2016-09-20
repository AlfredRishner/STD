Ext.application({
    name: 'proyecto',
    appFolder: 'App',
    stores: ['treeStore'],
    controllers: ['Oficinas','TipoDocumento','PELT',/*'Julio','Junio','Agosto','Setiembre','Octubre','Noviembre','Diciembre','Ejecucion','Grupo','PPTO','Papeletas','LicenciasControl','AutorizacionFueraHorario'*/],
    launch: function() {
        Ext.Ajax.request({
			url : 'index.php/RecordarUsuario/login' ,
			method: 'POST',
			//params: {access_log:true},
	        success: function(result,request) {
                    
		        var json = Ext.JSON.decode(result.responseText);
		        if(json.success)
		        	Ext.example.msg('Mensaje', json.msg);
                        else {
                           
                            Ext.create('proyecto.view.acceso').show();
                        }
			},
	        failure: function(result,request){
                    Ext.create('proyecto.view.acceso').show();
                    // alert("failure");
              
	        }
		});
       // Ext.create('proyecto.view.acceso').show();
        Ext.QuickTips.init();
        
        Ext.create('proyecto.view.MyViewport');
    }
    
});