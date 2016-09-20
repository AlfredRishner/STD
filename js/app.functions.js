//Funci�n utilizada para comprobar si hay usuario conectado a la sesi�n


	//Crea un nuevo tab en el tabpanel central
 function addTabPostComprobacion(id,title,url,type)
	{
		//alert(url);
		var open = !app.tabpanel.getItem(id);
		if (open)
		{

			switch (type)
			{
				case 'iframe':

					//Creamos un nuevo ifram y cargamos dentro la url
					var newPanel = new Ext.Panel({
				        id : id,
				        title: title,
				        loadScripts: true,
				        autoScroll: true,
				        closable: true,
				        iconCls:id+'_icon',
				        layout:'fit',

				        items: [ new Ext.ux.IFrameComponent({ id: id, url: url, name: id}) ]
			      	});
			     	app.tabpanel.add(newPanel);
			      	app.tabpanel.setActiveTab(newPanel);
				break;
				case 'load':
					//Cargamos la pesta�a por ajax

	            	var newPanel = new Ext.Panel({
				        id : id,
						layout: 'fit',
				        title: title,
				        loadScripts: true,
				        closable: true,
				        border:false,
				        //iconCls:id+'_icon',
						autoLoad: {
							url: url,
							border:false,
							scripts: true,
							scope: this
						}

			      	});
			     	app.tabpanel.add(newPanel);
			     	app.tabpanel.setActiveTab(newPanel);
				break;
				default:
					alert("Tipo de tab no definido");
				break;
			}
		}
		else {
			//Si ya tenemos la pestaña creada la seleccionaremos
			app.tabpanel.setActiveTab(id);
		}
	}

	function dosDecimales(value){
		return Math.round(value*100)/100;
	}

	function setFieldValue(name_field, value, si_vacio){
		var field = Ext.getCmp(name_field);
			if(si_vacio && field.getValue()=='')
				field.setValue(value);
			else if(!si_vacio)
				field.setValue(value);
	}

	function colorColumn(value, cell) {
		cell.css = "red-column";
		cell.attr = "style='background-color:#AAC1EA;color: white;'";
		cell.attr = "style='background-color:#EEE;'";
		return value;
	}

	//Funci�n para obtener el registro de un combo dado un property y el valor del mismo
	function getRegistroCombo(combo, property){
		var reg = null;
		if(combo!=null && combo.getValue()!=""){
			var indice = combo.store.find(property, combo.getValue());
			reg = combo.store.getAt(indice);
		}
		return reg;
	}


	function actualizarGrids(arrayGrids){
		for(i=0; i<arrayGrids.length; i++){
			var grid = Ext.getCmp(arrayGrids[i]);
			if(grid!=null)
				grid.getStore().reload();
		}
	}


	//Funci�n utilizada para actualizar todos los grid que están involucrados en el proceso de facturación ventas..
	function actualizarGridsFacturacionVenta(){
		actualizarGrids(['gridAlbaranesSinFacturar', 'gridVentas', 'gridAlbaranes']);
	}

	function actualizarCalendarioLaboral(){
		var form = Ext.getCmp('form_filtro_calendario');
		if(form!=null)
			form.buscar();
	}

	/******************************************************************************************************/
	//Funci�n utilizada para procesar los mensajes de retorno a llamadas AJAX.
	function procesarRespuestaAjax(result) {
		try{
			var json = doJSON(result.responseText);
			var param = getParametro(json.parametros, "msg");
			if(json.success)
				Ext.utiles.msg('Mensaje ',Text2Html(param.valor));
			else
				Ext.MessageBox.alert('Mensaje ',Text2Html(param.valor));

			var validar = getParametro(json.parametros, "validar");
			if(validar!=null){
				Ext.utiles.msg('Mensaje ',Text2Html(param.valor));
				mostrarWinValidar();
			}

			return json;
		}catch(Exception){
			Ext.MessageBox.alert('Error', 'Problemas durante el proceso. Perdone las molestias');
		}
	}

	//Funci�n utilizada para procesar los mensajes de retorno a llamadas a Formularios..
	function procesarRespuestaForm(action) {
		try{
			var json = action.result;
			var param = getParametro(json.parametros, "msg");
			if(json.success)
				Ext.utiles.msg('Mensaje ',Text2Html(param.valor));
			else
				Ext.MessageBox.alert('Mensaje ',Text2Html(param.valor));

			var validar = getParametro(json.parametros, "validar");
			if(validar!=null){
				Ext.utiles.msg('Mensaje ',Text2Html(param.valor));
				mostrarWinValidar();
			}

			return json;
		}catch(Exception){
			Ext.MessageBox.alert('Error', 'Problemas durante el proceso. Perdone las molestias');
		}
	}
	/******************************************************************************************************/

	function comprobarSeleccionado(grid){
		if(!grid.getSelectionModel().hasSelection()){
			Ext.utiles.msg('Aviso!!', 'Debe seleccionar el registro a Eliminar.');
	    	return false;
	    }
	    return true;
	}

	//M�todo utilizado para obtener el registro seleccionado de un grid
	function getRegSelected(grid){
		var selected = grid.getSelectionModel().getSelected();
        //if(selected.length==0)
        	//return null;
        //return selected[0];
        return selected;
    }

	function getRegSelectedEditGrid(grid){
		var selected = grid.getSelectionModel().getSelectedCell();
		var reg = null;
		if(selected!=null)
			reg = grid.getStore().getAt(selected[0]);
		return reg;
	}


	function mostrarFicha(divName, urlDestino, id){
  		var open=Ext.get(divName);
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: urlDestino,
				scripts: true,
				params: 'id='+id,
				text: 'Cargando...'
			});
			msg.show();
		}
	}

	function mostrarSubirDocumentoAsociado(grid, tabla, id){
  		var open=Ext.get('newDocumento');
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: 'documento.jsp',
				scripts: true,
				params: 'grid='+grid+'&tabla='+tabla+'&id='+id,
				text: 'Cargando...'
			});
			msg.show();
		}
	}

	function mostrarVentanaAsociar(idVentana, grid, tabla, id){
		idVentana='asociar'+idVentana;
  		var open=Ext.get(idVentana);
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: idVentana+'.jsp',
				scripts: true,
				params: 'grid='+grid+'&tabla='+tabla+'&id='+id,
				text: 'Cargando...'
			});
			msg.show();
		}
	}


	function borrarAsociacion(url, grid, tabla, id_asociacion){
		var reg = getRegSelected(grid);
        if(reg==null)
        	return;
		Ext.Ajax.request({
				url : url ,
				params : 'id='+reg.get('id')+'&tabla='+tabla+'&id_asociado='+id_asociacion,
				method: 'POST',
				success: function (result,request){
					procesarRespuestaAjax(result);
					grid.getStore().reload();
				},
				failure: function (result,request){
					procesarRespuestaAjax(result);
				}
		});
	}

	//Devolvemos true, si se lleva a cabo el proceso de borrado, es decir confirman...
	function borrarRegistro(grid, url, id, postFuncion){

		if(id==null) id='id'; //Por defecto id='id'
		var reg = getRegSelected(grid);
        if(reg==null){
	        Ext.utiles.msg("Aviso!!", "Debes seleccionar el registro a Eliminar.");
        	return false;
        }

		//Pedimos confirmación...
		Ext.Msg.confirm('Confirmar', 'Seguro que desea eliminar el Registro Seleccionado?',
		function(btn){
			if(btn=='yes'){
				Ext.Ajax.request({
						url : url ,
						params : 'id='+reg.get(id),
						method: 'POST',
						success: function (result,request){
							procesarRespuestaAjax(result);
							grid.getStore().reload();
							if(postFuncion!=null) eval(postFuncion);
						},
						failure: function (result,request){
							procesarRespuestaAjax(result);
						}
				});
			}
		});

		return true;
	}

	function borrarRegistroEditGrid(grid, url, id, postFuncion){
		var reg = getRegSelectedEditGrid(grid)
        if(reg==null){
	        Ext.utiles.msg("Aviso!!", "Debes seleccionar el registro a Eliminar.");
        	return false;
        }

		if(id==null) id='id'; //Por defecto id='id'
		//Pedimos confirmaci�n...
		Ext.Msg.confirm('Confirmar', 'Seguro que desea eliminar el Registro Seleccionado?',
		function(btn){
			if(btn=='yes'){
				//Si el registro no estaba guardado, e.d id=0, solo lo eliminamos del grid sin llamar al Servlet
				if(reg.get(id)==0)
					grid.getStore().remove(reg);
				else
					Ext.Ajax.request({
							url : url ,
							params : 'id='+reg.get(id),
							method: 'POST',
							success: function (result,request){
								procesarRespuestaAjax(result);
								grid.getStore().reload();
								if(postFuncion!=null) eval(postFuncion);
							},
							failure: function (result,request){
								procesarRespuestaAjax(result);
							}
					});
			}
		});

	}

  	function enviarDocumento( url,identificador,parametros, titulo){
	  	//if(titulo==null) titulo=nombre;
  		var open=Ext.get(identificador);
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: url,
				scripts: true,
				params: {parametros:parametros,id:identificador,titulo:titulo},
				text: 'Cargando...'
			});
			msg.show();
		}
  	}

	//Funci�n utilizada para imprimir los documentos pdf, por lo general
  	function imprimirDocumento(nombre, id_value, titulo){
	  	if(titulo==null) titulo=nombre;
  		/*if(id_value==0){
  			Ext.utiles.msg("Aviso!!", "Debes guardar previamente.");
  			return;
  		}*/
  		var open=Ext.get(nombre);
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: 'enviarDocumento.php',
				scripts: true,
				params: {id:id_value,nombre:nombre,titulo:titulo},
				text: 'Cargando...'
			});
			msg.show();
		}
  	}

	//Funci�n utilizada para imprimir los listados Excell
  	function imprimirListado(nombre, params, titulo){
	  	if(titulo==null) titulo=nombre;
  		var open=Ext.get(nombre);
		if(!open){
			var msg = Ext.get('msg');
			msg.load({
				url: 'printListado.jsp',
				scripts: true,
				params: {params:params,nombre:nombre,titulo:titulo},
				text: 'Cargando...'
			});
			msg.show();
		}
  	}

