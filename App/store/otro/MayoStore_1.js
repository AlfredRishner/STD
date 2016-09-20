/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.MayoStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.EjecucionModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/mayo/crear', 
            read    : 'index.php/mayo/listado',
            update  : 'index.php/mayo/actualiza',
            destroy : 'index.php/mayo/eliminar'
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


