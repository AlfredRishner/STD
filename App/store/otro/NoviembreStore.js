/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.NoviembreStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.EjecucionModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/noviembre/crear', 
            read    : 'index.php/noviembre/listado',
            update  : 'index.php/noviembre/actualiza',
            destroy : 'index.php/noviembre/eliminar'
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


