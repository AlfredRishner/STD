/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.controller.Ejecucion', {
    extend: 'Ext.app.Controller',
    stores: ['EjecucionStore','StoreComboGrupo'],
    models: ['EjecucionModel'],
    views: ['ejecucion.gridEjecucion', 'ejecucion.formEjecucion', 'ejecucion.winEjecucion','ejecucion.ComboMesEjecucion'],
    refs: [
        {
            ref: 'list',
            selector: 'gridEjecucion'
        }],
    init: function() {
        this.control({
            'gridEjecucion dataview': {
                itemdblclick: this.add
            },
            'gridEjecucion button[action=nuevo]': {
                //click: this.editarContato
                click: this.add
            },
            'gridEjecucion button[action=eliminar]': {
                click: this.eliminarPepeleta
            },
            'formEjecucion button[action=guardarEjecucion]': {
                //click: this.updateContato
                click: this.guardarEjecucion
            },
            'gridEjecucion button[action=printerDiario]': {
                click: this.repoterDiario
            }
            ,
            'gridEjecucion button[action=modificar]': {
                click: this.repoterDiario
            }


            /*,
             'usuarioedit button[action=save]': {
             //click: this.updateContato
             click: this.guardarnuevo
             }
             */

            ,
            'gridEjecucion button[action=printerEjec]': {
                click: this.imprimeReporte
            }
        });
    },
    guardarnuevo: function(btn) {
        var me = this,
                form = btn.up('formEjecucion'),
                win = form.up('window'),
                basicForm = form.getForm(),
                store = this.getStore('EjecucionStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            record = Ext.create('proyecto.model.EjecucionModel');
            record.set(values);
            this.getStore('EjecucionStore').add(record);
            store.sync();
            win.close();
            this.getStore('EjecucionStore').load();
            Ext.example.msg('Mensaje', 'Item Creado  Correctamente!!');

            return true;
        }
        else
            return false;
    },
    guardarEjecucion: function(btn) {
        var me = this,
                form = btn.up('formEjecucion'),
                win = form.up('winEjecucion'),
                basicForm = form.getForm(),
                store = this.getStore('EjecucionStore'), //grid.getStore(),
                record = basicForm.getRecord(),
                values = basicForm.getValues();
        if (basicForm.isValid())
        {
            var nuevo = false;
            if (values.id > 0) {
                record.set(values);
            } else {
                record = Ext.create('proyecto.model.EjecucionModel');
                record.set(values);
                this.getStore('EjecucionStore').add(record);
                nuevo = true;
            }
            store.sync();
            win.close();

            if (nuevo) { //faz reload para atualziar
                this.getStore('EjecucionStore').load();
                Ext.example.msg('Mensaje', 'Item Creado   Correctamente!!');
            }
            return true;
        }
        else
            return false;


    },
    add: function(grid, record) {
        var view = Ext.widget('winEjecucion');
        if (record) {
            view.down('form').loadRecord(record);
        }


    },
    repoterDiario: function(grid, record) {
        //this.imprimirDocumentosEnviados('ReporteEdadesRpt', record.data.id, 'Impresion de Cita');
        this.imprimirDocumentosEnviados('ReporteDiario', /*Ext.getCmp('fecha').getValue()*/'', 'Impresion de Reporte Diario');
    },
    imprimeReporte: function(button) {
        
        var value1='';// Ext.getCmp('IdComboMes').getValue();
        //alert(value1);
       // if (value1)
        {
            this.imprimirDocumentosEnviados('ReporteEject', value1, 'Impresion de Reporte');

            //  this.imprimirDocumentosEnviados('printDocumentoEnviado', record.data.id, 'Impresion de Cita');
        }
       /* else
        {    Ext.example.msg('Mensaje', 'Seleccione una Mes para imprimir');
        
         }*/
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
                var store = this.getStore('EjecucionStore');
                Ext.Msg.confirm('Confirmar', 'Seguro que desea Elimina el Registro Seleccionado?',
                        function(btn) {
                            if (btn == 'yes') {
                                store.remove(selection);
                                store.sync();

                            }
                        });
                this.getStore('EjecucionStore').load();
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




