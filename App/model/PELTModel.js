Ext.define('proyecto.model.PELTModel', {
    extend: 'Ext.data.Model',
    idProperty:'iddocumentos',
    fields: [
        {name: 'iddocumentos', type: 'int'},
        {name: 'idtipo', type: 'int'},
        {name: 'nombre_tipo', type: 'string'},
        {name: 'idoficinas', type: 'int'},
        {name: 'nombre_oficina', type: 'string'},
        {name: 'numero', type: 'string'},
        {name: 'asunto', type: 'string'},
        {name: 'fecha', type: 'string'},
        {name: 'para', type: 'string'},
        {name: 'de', type: 'string'},
        {name: 'archivo', type: 'string'},
        {name: 'folios', type: 'string'},
        {name: 'codigo', type: 'string'},
         {name: 'anio', type: 'string'}
        
    ]
});