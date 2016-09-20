/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.store.LicenciasStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.LicenciasModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        
        api: {
            create  : 'index.php/licencias/crearLicencias', 
            read    : 'index.php/licencias/listaLicencias',
            update  : 'index.php/licencias/actualizaLicencias',
            destroy : 'index.php/licencias/eliminarLicencias'
        },
        reader: {
            type: 'json',
            root: 'registros',
            totalProperty: 'total',
            successProperty: 'success',
            groupField: 'especifica'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'registros'
        }
    }
});