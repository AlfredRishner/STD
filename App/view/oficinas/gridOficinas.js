Ext.define('proyecto.view.oficinas.gridOficinas', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridOficinas',
       requires: [
        'Ext.selection.CellModel',
        'Ext.grid.*',
        'Ext.data.*',
        'Ext.util.*',
        'Ext.form.*',
        'proyecto.model.OficinasModel'
    ],
    
    xtype: 'cell-editing',
    //frame: true,
    store: 'OficinasStore',
   // errorSummary:false,
   autoDestroy: true,
    loadMask: true,
    selModel: {
                selType: 'cellmodel'
            },
   /*  selModel : 
            {
                mode : 'MULTI'
            },
    features: [{
     id: 'group',
     ftype: 'groupingsummary',
     groupHeaderTpl: '{name}',
     hideGroupedHeader: true,
     startCollapsed: false,
     enableGroupingMenu: false
     }],*/
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
  
    
            columns: [new Ext.grid.RowNumberer(),
        {header: 'idoficinas', sortable: true, hidden: true, dataIndex: 'idoficinas'},
        {header: 'Nombre', sortable: true,flex: 1, hidden: false, dataIndex: 'nombre',
        editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }},
        {
            header: 'Abreviatura',
            
            sortable: true,
            dataIndex: 'abreviatura',
            editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }

        }],
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
            store: 'OficinasStore',
            displayInfo: true,
            displayMsg: 'Mostrando Registros {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }]
    

});
