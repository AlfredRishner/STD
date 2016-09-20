/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.controller.LicenciasControl', {
    extend: 'Ext.app.Controller',
    stores: ['LicenciasStore'],
    models: ['LicenciasModel'],
    views: ['licencias.gridLicencias', 'licencias.formLicencias', 'licencias.winLicencias'],
    refs: [
        {
            ref: 'list',
            selector: 'gridLicencias'
        }],
    init: function() {
        this.control({
            'gridLicencias dataview': {
                itemdblclick: this.add
            },
            'gridLicencias button[action=add]': {
                //click: this.editarContato
                click: this.add
            },
            'gridLicencias button[action=delete]': {
                click: this.deleteContato
            },
            'formLicencias button[action=guardarLicencias]': {
                //click: this.updateContato
                click: this.guardarLicencias
            },
            'gridLicencias button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridPapeletas button[action=modificar]': {
                click: this.repoterDiario
            }
            ,
            'gridLicencias button[action=printerDetalle]': {
                click: this.imprimeReporte
            }
        });
    },
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('usuarioform'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('LicenciasStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.Agenda');
            record.set(values);
            this.getStore('LicenciasStore').add(record);
            store.sync();
            win.close();
            this.getStore('LicenciasStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');
            
            return true;
        }
        else
            return false;
    },
    guardarLicencias: function(btn) {
        var me = this,
                form = btn.up('formLicencias'),
                win = form.up('winLicencias'),
                basicForm = form.getForm(),
                store = this.getStore('LicenciasStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            var nuevo = false;
            if (values.id > 0) {
                record.set(values);
            } else {
                record = Ext.create('proyecto.model.LicenciasModel');
                record.set(values);
                this.getStore('LicenciasStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();
            this.getStore('LicenciasStore').load();
            if (nuevo) { //faz reload para atualziar
                this.getStore('LicenciasStore').load();
                Ext.example.msg('Mensaje', 'Item Creado   Correctamente!!');
            }
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
        var view = Ext.widget('winLicencias');
        if (record) {
            view.down('form').loadRecord(record);
            
        }


    },
    repoterDiario: function(grid, record) {

        //this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
        this.imprimirDocumentosEnviados('ReporteDiario', Ext.getCmp('fecha').getValue(), 'Impresion de Reporte Diario');
    },
    imprimeReporte: function(grid, record) {
       /* var gridq = Ext.getCmp('gridcitas');
        if (gridq.getSelectionModel().hasSelection())
        {
            var record = gridq.getSelectionModel().getSelection()[0];*/
            this.imprimirDocumentosEnviados('ReporteDetallado','' /*record.data.id*/, 'Impresion de Cita');
       /* }
        else
            Ext.example.msg('Mensaje', 'Seleccione una fila a imprimir');
        if (record) {
            grid.getForm().loadRecord(record);
            grid.edit.down('form').loadRecord(record);
        }/*editar*/
    },
    editarContato: function(grid, record) {

        var view = Ext.widget('usuarioedit');

        view.down('form').loadRecord(record);
        /*var edit = Ext.create('proyecto.view.Formulario').show();
         
         /* if(record){
         edit.down('form').loadRecord(record);
         }*/



        /* if(record){
         grid.getForm().loadRecord(record);
         grid.edit.down('form').loadRecord(record);
         }*/

    },
    updateContato: function(button) {
       /*var win    = button.up('window'),
         form   = win.down('form'),
         record = form.getRecord(),
         values = form.getValues();
         // Ext.example.msg('Mesaje', 'Informacion procesado correctamente');
         var novo = false;
         
         if (values.id > 0){
         record.set(values);
         } else{
         record = Ext.create('proyecto.model.Agenda');
         record.set(values);
         //Ext.getCmp('gridcitas').getStore().add(record);
         this.getStore('LicenciasStore').add(record);
         //this.getdatosStore().add(record);
         novo = true;
         }
         
         win.close();
         this.getStore('LicenciasStore').sync();

         if (novo){ //faz reload para atualziar
         this.getAgendasStore().load();
         }*/
    },
    deleteContato: function(button) {
        var panel = button.up('panel'),
                selection = panel.getSelectionModel().getSelection()[0];
        if (selection)
        {          
            if (selection.get('jefepersonal') == '1' || selection.get('jefeadministracion') == '1' || selection.get('jefeinmediato') == '1')
                Ext.example.msg('Mensaje', 'No es Posible Eliminar por Estar Autorizado!!');
            else {
                var store = this.getStore('LicenciasStore');
                Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro Seleccionado?',
                        function(btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                                store.sync();

                            }
                        });
                this.getStore('LicenciasStore').load();
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


