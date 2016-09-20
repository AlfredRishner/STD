Ext.define('proyecto.model.OficinasModel', {
    extend: 'Ext.data.Model',
    idProperty:'idoficinas',
    fields: [
        {name: 'idoficinas', type: 'int'},
        {name: 'nombre', type: 'string'},
        {name: 'abreviatura', type: 'string'}
    ]
});
