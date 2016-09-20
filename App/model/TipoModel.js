Ext.define('proyecto.model.TipoModel', {
    extend: 'Ext.data.Model',
    idProperty:'idtipo',
    fields: [
        {name: 'idtipo', type: 'int'},
        {name: 'nombre', type: 'string'}
    ]
});
