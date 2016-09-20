Ext.define('proyecto.view.documentos.gridPELT', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPrincipal',
       requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'proyecto.model.PELTModel'
    ],
    
    xtype: 'cell-editing',
    //frame: true,
    store: 'PELTStore',
   // errorSummary:false,
   autoDestroy: true,
    loadMask: true,
    selModel: {
                selType: 'cellmodel'
            },
    
    features: [{
     id: 'group',
     ftype: 'groupingsummary',
     groupHeaderTpl: '{name}',
     hideGroupedHeader: true,
     startCollapsed: false,
     enableGroupingMenu: false
     }],/**/
    plugins: [new Ext.grid.plugin.CellEditing({
            clicksToEdit: 2
        })],
   /* viewConfig: {
        trackOver: false,
        stripeRows: false,
        getRowClass: function (record) {
            if (record.get('prioridad') ==1) return 'alto-row';
            else if (record.get('prioridad') == 2) return 'medio-row';
            else if (record.get('prioridad') == 3) return 'bajo-row';
            else if (record.get('prioridad') == 4) return 'atendido-row';
        }
    },*/
    //Textos completos 	id 	idUsuario 	asunto 	consulta 	captura 	prioridad 
  
    //	iddocumentos	idtipo	idoficinas	numero	asunto	fecha	para	de	archivo	folios	codigo
            columns: [new Ext.grid.RowNumberer(),
        {header: 'iddocumentos', sortable: true, hidden: true, dataIndex: 'iddocumentos'},
        //iddocumentos	idtipo	nombre_tipo	idoficinas	nombre_oficina	numero	asunto	fecha	para	de	archivo	folios	codigo	anio
        {header: 'idtipo', sortable: true,flex: 1, hidden: false, dataIndex: 'idtipo', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'nombre_tipo', sortable: true,flex: 1, hidden: false, dataIndex: 'nombre_tipo', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'idoficinas', sortable: true,flex: 1, hidden: false, dataIndex: 'idoficinas', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'nombre_oficina', sortable: true,flex: 1, hidden: false, dataIndex: 'nombre_oficina', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'numero', sortable: true,flex: 1, hidden: false, dataIndex: 'numero', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'asunto', sortable: true,flex: 1, hidden: false, dataIndex: 'asunto', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'fecha', sortable: true,flex: 1, hidden: false, dataIndex: 'fecha', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'para', sortable: true,flex: 1, hidden: false, dataIndex: 'para', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'de', sortable: true,flex: 1, hidden: false, dataIndex: 'de', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'archivo', sortable: true,flex: 1, hidden: false, dataIndex: 'archivo', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'folios', sortable: true,flex: 1, hidden: false, dataIndex: 'folios', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'codigo', sortable: true,flex: 1, hidden: false, dataIndex: 'codigo', editor: {xtype: 'textfield',allowBlank: false}},
        {header: 'anio', sortable: true,flex: 1, hidden: false, dataIndex: 'anio', editor: {xtype: 'textfield',allowBlank: false}}
        ],
        
         dockedItems: [{
            xtype: 'toolbar',
            items: [{
                    iconCls: 'add',
                    text: 'Agregar',
                    action: 'nuevo'
                }, {
                    iconCls: 'atendido',
                    text: 'Eliminar',
                    action: 'eliminar'
                }, {
                    iconCls: 'print',
                    text: 'vista Previa Ejecucion[Febrero]',
                    action: 'printerEjec'
                }]
        }, {
            xtype: 'pagingtoolbar',
            dock: 'bottom',
            store: 'PELTStore',
            displayInfo: true,
            displayMsg: 'Mostrando Registros {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }]
    

});
