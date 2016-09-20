Ext.define('proyecto.store.TipoStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.TipoModel',
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
            create  : 'index.php/tipo/crear', 
            read    : 'index.php/tipo/listado',
            update  : 'index.php/tipo/actualiza',
            destroy : 'index.php/tipo/eliminar'
        },
        
        reader: {
	    messageProperty	: 'message',
	    idProperty		: 'idtipo',
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


