Ext.define('proyecto.store.PELTStore', {
    extend: 'Ext.data.Store',
    model: 'proyecto.model.PELTModel',
    groupField: 'anio',
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
            create  : 'index.php/documentos/crear', 
            read    : 'index.php/documentos/listado',
            update  : 'index.php/documentos/actualiza',
            destroy : 'index.php/documentos/eliminar'
        },
        
        reader: {
	    messageProperty	: 'message',
	    idProperty		: 'iddocumentos',
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


