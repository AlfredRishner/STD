/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.store.PapeletaStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.PapeletaModel',
   // autoLoad: true,
    groupField: 'meta',
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/papeletas/crearPapeleta', 
            read    : 'index.php/papeletas/listaPapeleta',
            update  : 'index.php/papeletas/actualizaPapeleta',
            destroy : 'index.php/papeletas/eliminarPapeleta'
        },
        reader: {
            type: 'json',
            root: 'registros',
            totalProperty: 'total',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'registros'
        }
    }
});
