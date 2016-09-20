/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.AutorizacionViajeOficialStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.AutorizacionViajeOficialModel',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/autorizacion/crearViaje', 
            read    : 'index.php/autorizacion/listaViaje',
            update  : 'index.php/autorizacion/actualizaViaje',
            destroy : 'index.php/autorizacion/eliminarViaje'
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

