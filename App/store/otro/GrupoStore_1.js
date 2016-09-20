/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.store.GrupoStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.GrupoModel',
    groupField: 'especifica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/grupo/crearGrupo', 
            read    : 'index.php/grupo/listadoGrupo',
            update  : 'index.php/grupo/actualizaGrupo',
            destroy : 'index.php/grupo/eliminarGrupo'
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


