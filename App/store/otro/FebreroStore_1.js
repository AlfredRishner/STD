/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.FebreroStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.MesaAyudaModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: true,//{start: 0, limit: 10},
    pageSize: 1000,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/mesaAyuda_Controller/crear', 
            read    : 'index.php/mesaAyuda_Controller/listado',
            update  : 'index.php/mesaAyuda_Controller/actualiza',
            destroy : 'index.php/mesaAyuda_Controller/eliminar'
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


