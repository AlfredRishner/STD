/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.AutorizacionFueraHorarioStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.AutorizacionFueraHorarioModel',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/ingreso/crearPermiso', 
            read    : 'index.php/ingreso/listaPermiso',
            update  : 'index.php/ingreso/actualizaPermiso',
            destroy : 'index.php/ingreso/eliminarPermiso'
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

