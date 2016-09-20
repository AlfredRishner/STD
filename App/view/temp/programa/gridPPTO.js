Ext.require('Ext.chart.series.Column');
Ext.require('Ext.chart.axis.Category');
Ext.require('Ext.chart.axis.Numeric');
Ext.require('Ext.form.Panel');
Ext.require('Ext.layout.container.Column');
Ext.require('Ext.form.field.*');
Ext.require('Ext.grid.Panel');
Ext.require('Ext.grid.column.*');
Ext.require('Ext.tab.Panel');
Ext.require('Ext.form.FieldSet');

Ext.define('proyecto.view.programa.gridPPTO', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPPTO',
    columnLines: true,
    requires: ['Ext.toolbar.Paging'],
     features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
            enableGroupingMenu: false
        }],
    initComponent: function() {
        this.store = 'PPTOStore';
        this.columns = [new Ext.grid.RowNumberer(),
            /* 'idprogramacion',
             'idespecifica',
             'especifica',
             'nombre',
             'ppto'*/
            {text: "COD. ESP.", hidden: true, dataIndex: 'idespecifica'},
            {text: "COD. ESP.", width: 100, dataIndex: 'especifica', renderer: function(val) {

                    return '<span style="color:#EE580D"><b>' + val + '</b></span>';
                }},
            {text: "ESPECIFICA", flex: 1, dataIndex: 'nombre', renderer: function(val) {

                    return '<span style="color:#0033FF"><b>' + val + '</b></span>';
                },
                summaryType: 'count',
            tdCls: 'task',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(  ' + value + ' Especificas Encontradas)' : '(1 Especifica Encontrada)');
            }},
            {text: "PPTO", width: 150, dataIndex: 'ppto', align: 'right', renderer: function(val) {

                    return '<span style="color:#0033FF"><b>' + val + '</b></span>';
                }, summaryType: 'sum',
             tdCls: 'task',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'S/.' + Math.round(value * 100) / 100;
            }}
        ];
        this.dockedItems = [{
                xtype: 'toolbar',
                items: [{
                        iconCls: 'add',
                        // itemId: 'add',
                        text: 'Agregar',
                        action: 'nuevo'
                    }, {
                        iconCls: 'atendido',
                        text: 'Eliminar',
                        action: 'eliminar'
                    }]
            }
            , {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: 'PPTOStore',
                displayInfo: true,
                displayMsg: 'Mostrando Programacion {0} - {1} de {2}',
                emptyMsg: "Ningun contato encontrado."
            }];

        this.callParent(arguments);
    }
});

  