Ext.define('proyecto.store.Estadistica', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.Estadistica',
   // autoLoad: true,
    autoLoad: {start: 0, limit: 10},
    pageSize: 10,
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/lista/crearCita', 
            read    : 'index.php/lista/acceso',
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

