/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.define('proyecto.store.StoreComboGrupo', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.Grupo',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
    pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/programa/listadoGrupo', 
            read    : 'index.php/programa/listadoGrupo',
            update  : 'index.php/lista/actualizaCita',
            destroy : 'index.php/lista/eliminarCita'
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

