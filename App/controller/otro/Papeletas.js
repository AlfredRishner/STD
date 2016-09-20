Ext.define('proyecto.controller.Papeletas', {
    extend: 'Ext.app.Controller',
    stores: ['PapeletaStore', 'treeStore'],
    models: ['PapeletaModel'],
    views: ['papeleta.gridPapeletas', 'papeleta.formPapeleta', 'papeleta.winPapeleta','papeleta.ComboMesResumen'],
    refs: [
        {
            ref: 'list',
            selector: 'gridPapeletas'
        }],
    init: function() {
        this.control({
            'gridPapeletas combo[action=cargar]':{
                select:this.actualizar
            },
            /*'gridPapeletas dataview': {
                itemdblclick: this.add
            },
            'gridPapeletas button[action=nuevo]': {
                //click: this.editarContato
                click: this.add
            },
            'gridPapeletas button[action=eliminar]': {
                click: this.eliminarPepeleta
            },
            'formPapeleta button[action=guardarPapeleta]': {
                //click: this.updateContato
                click: this.guardarPapeleta
            },
            'gridPapeletas button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridPapeletas button[action=modificar]': {
                click: this.repoterDiario
            }
*/

       
'gridPapeletas field[action=cargar]': {
                click: this.actualizar
            }
            ,
            'gridPapeletas button[action=printer]': {
                click: this.imprimeReporte
            }
        });
    },
     actualizar: function(combo) {
          //console.log('ComboBox Selected, the value is:' + combo.getValue()) ;
          this.getStore('PapeletaStore').load({params:{mes:combo.getValue()}});
       /*   var tt=combo.up('gridPapeletas');
          tt.set*/

    },
    
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('usuarioform'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('PapeletaStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.Agenda');
            record.set(values);
            this.getStore('PapeletaStore').add(record);
            store.sync();
            win.close();
            this.getStore('PapeletaStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');

            return true;
        }
        else
            return false;
    },
    guardarPapeleta: function(btn) {
        var me = this,
                form = btn.up('formPapeleta'),
                win = form.up('winPapeleta'),
                basicForm = form.getForm(),
                store = this.getStore('PapeletaStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            var nuevo = false;
            if (values.id > 0) {
                record.set(values);
                this.getStore('PapeletaStore').add(record);
            } else {
                record = Ext.create('proyecto.model.PapeletaModel');
                record.set(values);
                this.getStore('PapeletaStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();

            if (nuevo) { //faz reload para atualziar
                this.getStore('PapeletaStore').load();
                Ext.example.msg('Mensaje', 'Item Creado   Correctamente!!');
            }
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
        var view = Ext.widget('winPapeleta');
        if (record) {
            view.down('form').loadRecord(record);
        }


    },
    repoterDiario: function(grid, record) {
        //this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
        this.imprimirDocumentosEnviados('ReporteDiario', /*Ext.getCmp('fecha').getValue()*/'', 'Impresion de Reporte Diario');
    },
    imprimeReporte: function(button) {
        
      var comb= Ext.ComponentQuery.query('gridPapeletas combo')[0];
        var value1=comb.getValue();
        if (value1)
        {
         Ext.Ajax.request({
			url : 'index.php/RecordarUsuario/getMeta' ,
			method: 'POST',
			//params: {access_log:true},
	        success: function(result,request) {
                    
		        var json = Ext.JSON.decode(result.responseText);
		        if(json.success){
		        	Ext.example.msg('Mensaje','Rreporte Generado!');
                            this.imprimirDocumentosEnviados('ReporteResumen', 'idmes='+value1+'&nombre='+json.registros[0].nombre+'&codigo='+json.registros[0].codigo+'&idmeta='+json.registros[0].idmeta, 'Impresion de Reporte Resumen');
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
                
        
            //this.imprimirDocumentosEnviados('ReporteResumen', 'id='+value1, 'Impresion de Reporte');
        }
        else
        {    Ext.example.msg('Mensaje', 'Seleccione una Mes para imprimir');
        
         }
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
                var store = this.getStore('PapeletaStore');
                Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro Seleccionado?',
                        function(btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                                store.sync();

                            }
                        });
                this.getStore('PapeletaStore').load();
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


