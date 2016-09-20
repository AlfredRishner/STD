    Ext.define('proyecto.view.setiembre.gridSetiembre' ,{
        extend: 'Ext.grid.Panel',
    // xtype: 'grouped-grid',
        alias: 'widget.gridSetiembre',
        frame: true,
        store: 'SetiembreStore',
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: false,
            enableGroupingMenu: false
        }],
    
        columns: [new Ext.grid.RowNumberer(),
            { header: 'id',sortable: true,hidden:true,dataIndex: 'id'},
            { header: 'mes',sortable: true,hidden:true,dataIndex: 'mes'},
             { header: 'idespecifica',sortable: true,hidden:true,dataIndex: 'idespecifica'},
              { header: 'idgrupo',sortable: true,hidden:true,dataIndex: 'idgrupo'},
               { header: 'DESCRIPCION',sortable: true,hidden:true,dataIndex: 'idespecifica'},
            {
            header: 'Detalle',
            flex: 1,
            sortable: true,
            dataIndex: 'detalle',
            summaryType: 'count',
            tdCls: 'task',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Items)' : '(1 Item)');
            }
        }, 
        {
            header: 'PARCIAL',
            width: 150,
            sortable: true,
            dataIndex: 'parcial',
            summaryType: 'sum',
            align: 'right',
            summaryRenderer: function(value, summaryData, dataIndex) {
                 return 'S/.'+Math.round(value*100)/100;
            },
            field: {
                xtype: 'numberfield'
            }
        },{
            header: 'DOC FUENTE',
            width: 200,
            sortable: true,
            dataIndex: 'doc_fuente'
        },{header: 'SIAF', sortable: true, hidden: false, dataIndex: 'siaf'}
        ,{header: 'PROVEEDOR', sortable: true, hidden: false, dataIndex: 'proveedor'}],
     dockedItems : [{
            xtype: 'toolbar',
            items: [{
                            iconCls: 'add',
                           // itemId: 'add',
                            text: 'Agregar',
                            action: 'nuevo'
                        },{
                            iconCls: 'atendido',
                            text: 'Eliminar',
                            action: 'eliminar'
                        },{
                            iconCls: 'print',
                            text: 'vista Previa Ejecucion[Setiembre]',
                            action: 'printerEjec'
                        }]
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'SetiembreStore',
            displayInfo: true,
            displayMsg: 'Mostrando Registros {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }]
    });
