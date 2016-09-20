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

Ext.define('proyecto.view.papeleta.gridPapeletas', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridPapeletas',
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
        this.store = 'PapeletaStore';
        this.columns = [
            
            {text: "COD. ESP.", width: 100, dataIndex: 'especifica', renderer: function(val) {

                    return '<span style="color:#EE580D"><b>' + val + '</b></span>';
                }},
            {text: "ESPECIFICA", flex: 1, dataIndex: 'nombre', renderer: function(val) {

                    return '<span style="color:#0033FF"><b>' + val + '</b></span>';
                },summaryType: 'count',
           // tdCls: 'task',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Items)' : '(1 Item)');
            }},
            {text: "PPTO", width: 150, dataIndex: 'ppto', align: 'right', renderer: function(val) {

                    return '<span style="color:#0033FF"><b>' + val + '</b></span>';
                },summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                  return 'S/.' + Math.round(value * 100) / 100;
            }},
            {text: "EJEC. DEL MES", width: 150, dataIndex: 'ejec_actual', align: 'right', renderer: function(val) {

                    return '<span style="color:#0B610B"><b>' + val + '</b></span>';
                },summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                  return 'S/.' + Math.round(value * 100) / 100;
            }},
            
            {text: "ACUM. DEL MES", width: 150, dataIndex: 'acum_actual', align: 'right', renderer: function(val) {

                    return '<span style="color:#3B0B39"><b>' + val + '</b></span>';
                },summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                   return 'S/.' + Math.round(value * 100) / 100;
            }},
            {text: "SALDO ANUAL", width: 150, dataIndex: 'saldo_anual', align: 'right', renderer: function(val) {

                    return '<span style="color:#5E58A2"><b>' + val + '</b></span>';
                },summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                 return 'S/.' + Math.round(value * 100) / 100;
            }},
            {text: "SALDO ACUM. ANTERIOR", width: 150, dataIndex: 'saldo_acum_anterior', align: 'right', renderer: function(val) {

                    return '<span style="color:#FE2E2E"><b>' + val + '</b></span>';
                },summaryType: 'sum',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return 'S/.' + Math.round(value * 100) / 100;
            }}

        ];
        this.dockedItems = [{
                xtype: 'toolbar',
                items: [/*{
                        iconCls: 'add',
                        // itemId: 'add',
                        text: 'Agregar',
                        action: 'nuevo'
                    }, {
                        iconCls: 'atendido',
                        text: 'Eliminar',
                        action: 'eliminar'
                    }, */{
                        iconCls: 'print',
                        text: 'vista Previa Resumen',
                        action: 'printer'
                    }, {xtype:'ComboMesResumen'}]
            }
            , {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                store: 'PapeletaStore',
                displayInfo: true,
                displayMsg: 'Mostrando Registros {0} - {1} de {2}',
                emptyMsg: "Ningun contato encontrado."
            }];

        this.callParent(arguments);
    }
});

  