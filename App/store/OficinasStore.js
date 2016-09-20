Ext.define('proyecto.store.OficinasStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.OficinasModel',
    //groupField: 'especifica',
    //autoLoad: true,
    //autoLoad: {start: 0, limit: 10},
    //autoSync: true,
   // storeId: 'idoficinas',
    autoSave	: true,
    autoLoad: true,
    pageSize: 40,
   //autoLoad: {start: 0, limit: 35},
    proxy: {
        type: 'ajax',
        api: {
            create  : 'index.php/oficinas/crear', 
            read    : 'index.php/oficinas/listado',
            update  : 'index.php/oficinas/actualiza',
            destroy : 'index.php/oficinas/eliminar'
        },
        
        reader: {
	    messageProperty	: 'message',
	    idProperty		: 'idoficinas',
            type: 'json',
            root: 'registros',
            totalProperty: 'total',
            successProperty: 'success'
            
        },
        writer: {
            type: 'json',
            writeAllFields	: true,
            encode: true,
            root: 'registros'
        },
         actionMethods : 
        {
            destroy : 'POST',
            read : 'POST',
            create : 'POST',
            update : 'POST'
        }
    }
});


