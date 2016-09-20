Ext.define('proyecto.store.PPTOStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.PPTOModel',
    groupField: 'meta',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
   // pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/programa/crearPPTO', 
            read    : 'index.php/programa/listadoPPTO',
            update  : 'index.php/programa/actualizaPPTO',
            destroy : 'index.php/programa/eliminarPPTO'
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


