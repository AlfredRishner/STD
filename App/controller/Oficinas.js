Ext.define('proyecto.controller.Oficinas', {
    extend: 'Ext.app.Controller',
    stores: ['OficinasStore'],
    models: ['OficinasModel'],
    views: ['oficinas.gridOficinas'/*, 'oficinas.formMesaAyuda', 'oficinas.winMesaAyuda'/*,'mesa.ComboMesEjecucion'*/],
    refs: [
        {
            ref: 'gridOficinas',
            selector: 'viewport > gridOficinas'
        }],
    init: function() {
        this.control({
           // 'gridOficinas[xtype=option.list]': {
           // 		edit: this.save,
           // 		//canceledit: this.cancel,
           // 		//beforerender: this.loadRecords,
           // 		//itemcontextmenu: this.showContextMenu
           // 	},
            'gridOficinas[xtype=gridOficinas]': {
               edit: this.save
              //  canceledit: this.cancel
        },
            'gridOficinas dataview': {
               // itemdblclick: this.add
            },
            'gridOficinas button[action=nuevo]': {
                //click: this.editarContato
                click: this.add
            },
            'gridOficinas button[action=eliminar]': {
                click: this.eliminar
            },
            'formMesaAyuda button[action=guardarEjecucion]': {
                //click: this.updateContato
                click: this.guardarEjecucion
            },
            'gridOficinas button[action=printerDiario]': {
                click: this.repoterDiario
            }/*,
            'gridOficinas button[action=nuevo]': {
                click: this.repoterDiario
            }*/
            ,
            'gridOficinas button[action=modificar]': {
                click: this.repoterDiario
            }
            ,
            'gridOficinas button[action=printerEjec]': {
                click: this.imprimeReporte
            }
        });
    },
     save: function( editor, context, eOpts ) {
    	var record = Ext.create('proyecto.model.OficinasModel');
       this.getStore('OficinasStore').sync();
       //alert('ok');
    },
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('formMesaAyuda'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('FebreroStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.EjecucionModel');
            record.set(values);
            this.getStore('FebreroStore').add(record);
            store.sync();
            win.close();
            this.getStore('FebreroStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');

            return true;
        }
        else
            return false;
    },
    
    guardarEjecucion: function(btn) {
        var me = this,
                form = btn.up('formMesaAyuda'),
                win = form.up('winMesaAyuda'),
                basicForm = form.getForm(),
                store = this.getStore('FebreroStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
    if (basicForm.isValid())
        {
            var nuevo = false;
            if (values.id>0) {
                record.set(values);
                //this.getStore('EneroStore').load();
            } else {
                record = Ext.create('proyecto.model.EjecucionModel');
                record.set(values);
                this.getStore('FebreroStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();
            
             

            if (nuevo) { //faz reload para atualziar
                this.getStore('FebreroStore').load();
                Ext.example.msg('Mensaje', 'Item Creado   Correctamente!!');
            }
            this.getStore('FebreroStore').load();
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
                var  record = Ext.create('proyecto.model.OficinasModel');
                record.set('idoficinas'	, ""); 
                record.set('nombre'	, ""); 
                record.set('abreviatura'	, ""); 
                
                //  record.set(values);
                this.getStore('OficinasStore').add(record);
                
      /*  var store=this.getStore('OficinasStore');//.sync();
       
		
		this.gridOficinas.stopEditing();
		this.store.insert(0,contact);
		this.gridOficinas.startEditing(0,1);
                
        var view = Ext.widget('winMesaAyuda');
        if (record) {
            view.down('form').loadRecord(record);
        }
*/

    },
    repoterDiario: function(grid, record) {
        //this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
        this.imprimirDocumentosEnviados('ReporteDiario', /*Ext.getCmp('fecha').getValue()*/'', 'Impresion de Reporte Diario');
    },
       imprimeReporte: function(button) {
             Ext.Ajax.request({
			url : 'index.php/RecordarUsuario/getMeta' ,
			method: 'POST',
			//params: {access_log:true},
	        success: function(result,request) {
                    
		        var json = Ext.JSON.decode(result.responseText);
		        if(json.success){
		        	Ext.example.msg('Mensaje','Rreporte Generado!');
                                
                                
                            this.imprimirDocumentosEnviados('ReporteEject', 'mes=Febrero&nombremeta='+json.registros[0].nombre+'&idmeta='+json.registros[0].idmeta+'&meta='+json.registros[0].codigo+'&idmes=2', 'Impresion de Reporte');
//                            window.open('reportes/ReporteEject.php?'+'mes=Febrero&nombremeta='+json.registros[0].nombre+'&idmeta='+json.registros[0].idmeta+'&meta='+json.registros[0].codigo+'&idmes=2', "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
                        }
                        else {
                           
                           Ext.create('proyecto.view.acceso').show();
                        }
			},
	        failure: function(result,request){
                   // Ext.create('proyecto.view.acceso').show();
                    // alert("failure");
              
	        },
                scope       : this
		});
    },
    editarContato: function(grid, record) {

        var view = Ext.widget('usuarioedit');

        view.down('form').loadRecord(record);
      
    },
    updateContato: function(button) {
     
    },
    eliminar: function(button) {
        var panel = button.up('panel'),
                selection = panel.getSelectionModel().getSelection()[0];
        if (selection)
        {
            //if (selection.get('firmapersonal') == '1' || selection.get('firmaadministracion') == '1' || selection.get('firmajefeinmediato') == '1')
             //   Ext.example.msg('Mensaje', 'No es Posible Eliminar por Estar Autorizado!!');
            //else
                  var store = this.getStore('OficinasStore');
                Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro SeleccioFebreroStorenado?',
                        function(btn) {
                            if (btn == 'yes') {
                              
                                store.remove(selection);
                                store.sync();
                                this.getStore('OficinasStore').load();
                            }
                        });
               
        }
        else
        {
            Ext.example.msg('Mensaje', 'Seleccione una fila para eliminar...!!');
        }
    },
    imprimirDocumentosEnviados: function(nombre, params, titulo) {
        if (titulo == null)
            titulo = nombre;
        var open = Ext.get(nombre);
        if (!open) {
            var msg = Ext.get('msg');
            msg.load({
                url: 'reportes/printDocumento.php',
                scripts: true,
                params: {params: params, nombre: nombre, titulo: titulo},
                text: 'Cargando...'
            });
            msg.show();
        }
    }
});