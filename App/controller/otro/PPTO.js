/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.controller.PPTO', {
    extend: 'Ext.app.Controller',
    stores: ['PPTOStore', 'StoreComboEspecificas'],
    models: ['PPTOModel'],
    views: ['programa.gridPPTO', 'programa.formPPTO', 'programa.winPPTO'],
    refs: [
        {
            ref: 'list',
            selector: 'gridPPTO'
        }],
    init: function() {
        this.control({
            'gridPPTO dataview': {
                itemdblclick: this.add
            },
            'gridPPTO button[action=nuevo]': {
                //click: this.editarContato
                click: this.add
            },
            'gridPPTO button[action=eliminar]': {
                click: this.eliminarPPTO
            },
            'formPPTO button[action=guardarPPTO]': {
                //click: this.updateContato
                click: this.guardarPPTO
            },
            'gridPPTO button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridPPTO button[action=modificar]': {
                click: this.repoterDiario
            }


            /*,
             'usuarioedit button[action=save]': {
             //click: this.updateContato
             click: this.guardarnuevo
             }
             */

            ,
            'gridPPTO button[action=printer]': {
                click: this.imprimeReporte
            }
        });
    },
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('usuarioform'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('PPTOStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.Agenda');
            record.set(values);
            this.getStore('PPTOStore').add(record);
            store.sync();
            win.close();
            this.getStore('PPTOStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');

            return true;
        }
        else
            return false;
    },
    guardarPPTO: function(btn) {
        var me = this,
                form = btn.up('formPPTO'),
                win = form.up('winPPTO'),
                basicForm = form.getForm(),
                store = this.getStore('PPTOStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            var nuevo = false;
            if (values.idprogramacion > 0) {
                record.set(values);
                Ext.example.msg('Mensaje', 'PPTO Actualizada Correctamente!!');
            } else {
                record = Ext.create('proyecto.model.PPTOModel');
                record.set(values);
                this.getStore('PPTOStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();

            if (nuevo) { //faz reload para atualziar
                this.getStore('PPTOStore').load();
                Ext.example.msg('Mensaje', 'PPTO Creada Correctamente!!');
            }
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
        var view = Ext.widget('winPPTO');
        if (record) {
            view.down('form').loadRecord(record);
        }
    },
    repoterDiario: function(grid, record) {
        this.imprimirDocumentosEnviados('ReporteDiario', /*Ext.getCmp('fecha').getValue()*/'', 'Impresion de Reporte Diario');
    },
    imprimeReporte: function(grid, record) {
        this.imprimirDocumentosEnviados('ReporteResumen', /*record.get('id')*/2, 'Impresion de Cita');
    },
    editarContato: function(grid, record) {

        var view = Ext.widget('usuarioedit');

        view.down('form').loadRecord(record);


    },
    updateContato: function(button) {

    },
    eliminarPPTO: function(button) {
        var panel = button.up('panel'),
                selection = panel.getSelectionModel().getSelection()[0];
        var store = this.getStore('PPTOStore');
        if (selection)
        {

            Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro Seleccionado?',
                    function(btn) {
                        if (btn == 'yes') {
                            store.remove(selection);
                            store.sync();
                        }
                        store.load();
                        Ext.example.msg('Mensaje', 'Eliminado Correctamente!!');
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


