/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.MesaStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.EjecucionModel',
    groupField: 'especifica',
    autoLoad: true,
  //  autoLoad:false,
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/enero/crear', 
            read    : 'index.php/enero/listado',
            update  : 'index.php/enero/actualiza',
            destroy : 'index.php/enero/eliminar'
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


