/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.AbrilStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.EjecucionModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/abril/crear', 
            read    : 'index.php/abril/listado',
            update  : 'index.php/abril/actualiza',
            destroy : 'index.php/abril/eliminar'
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


