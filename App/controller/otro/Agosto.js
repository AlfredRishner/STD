/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.controller.Agosto', {
    extend: 'Ext.app.Controller',
    stores: ['AgostoStore','StoreComboGrupo'],
    models: ['EjecucionModel'],
    views: ['agosto.gridAgosto', 'agosto.formAgosto', 'agosto.winAgosto'],
    refs: [
        {
            ref: 'list',
            selector: 'gridAgosto'
        }],
    init: function() {
        this.control({
            'gridAgosto dataview': {
                itemdblclick: this.add
            },
            'gridAgosto button[action=nuevo]': {
                //click: this.editarContato
                click: this.add
            },
            'gridAgosto button[action=eliminar]': {
                click: this.eliminarPepeleta
            },
            'formAgosto button[action=guardarEjecucion]': {
                //click: this.updateContato
                click: this.guardarEjecucion
            },
            'gridAgosto button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridAgosto button[action=modificar]': {
                click: this.repoterDiario
            }
            ,
            'gridAgosto button[action=printerEjec]': {
                click: this.imprimeReporte
            }
        });
    },
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('formAgosto'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('AgostoStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.EjecucionModel');
            record.set(values);
            this.getStore('AgostoStore').add(record);
            store.sync();
            win.close();
            this.getStore('AgostoStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');

            return true;
        }
        else
            return false;
    },
    guardarEjecucion: function(btn) {
        var me = this,
                form = btn.up('formAgosto'),
                win = form.up('winAgosto'),
                basicForm = form.getForm(),
                store = this.getStore('AgostoStore'), //grid.getStore(),
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
                this.getStore('AgostoStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();
            
             

            if (nuevo) { //faz reload para atualziar
                this.getStore('AgostoStore').load();
                Ext.example.msg('Mensaje', 'Item Creado   Correctamente!!');
            }
            this.getStore('AgostoStore').load();
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
        var view = Ext.widget('winAgosto');
        if (record) {
            view.down('form').loadRecord(record);
        }


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
                                
                                
                            this.imprimirDocumentosEnviados('ReporteEject', 'mes=Agosto&nombremeta='+json.registros[0].nombre+'&idmeta='+json.registros[0].idmeta+'&meta='+json.registros[0].codigo+'&idmes=8', 'Impresion de Reporte');
                            //window.open('reportes/ReporteEject.php?'+'mes=Enero&nombremeta='+json.registros[0].nombre+'&idmeta='+json.registros[0].idmeta+'&meta='+json.registros[0].codigo+'&idmes=1', "nuevo", "directories=no, location=no, menubar=no, scrollbars=yes, statusbar=no, tittlebar=no, width=400, height=400");
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
    eliminarPepeleta: function(button) {
        var panel = button.up('panel'),
                selection = panel.getSelectionModel().getSelection()[0];
        if (selection)
        {
            if (selection.get('firmapersonal') == '1' || selection.get('firmaadministracion') == '1' || selection.get('firmajefeinmediato') == '1')
                Ext.example.msg('Mensaje', 'No es Posible Eliminar por Estar Autorizado!!');
            else {
                var store = this.getStore('AgostoStore');
                Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro Seleccionado?',
                        function(btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                                store.sync();

                            }
                        });
                this.getStore('AgostoStore').load();
            }
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




