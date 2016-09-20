Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager'
]);
    Ext.tip.QuickTipManager.init();
    Ext.define('proyecto.view.ejecucion.gridEjecucion' ,{
        extend: 'Ext.grid.Panel',
    // xtype: 'grouped-grid',
        alias: 'widget.gridEjecucion',
        frame: true,
        iconCls: 'icon-grid',
        store: 'EjecucionStore',
        title:'Detalles',
      //  plugins: [cellEditing],
       /*{name: 'id', type: 'int'},
        {name: 'idespecifica', type: 'int'},
        {name: 'especifica', type: 'string'},
        {name: 'idgrupo', type: 'int'},
        {name: 'nombre_grupo', type: 'string'},
        {name: 'detalle', type: 'string'},
        {name: 'parcial', type: 'float'},
        {name: 'doc_fuente', type: 'string'}
     */
        features: [{
            id: 'group',
            ftype: 'groupingsummary',
            groupHeaderTpl: '{name}',
            hideGroupedHeader: true,
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
        }],
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
                            text: 'vista Previa Ejecucion',
                            action: 'printerEjec'
                        }/*,{
                            iconCls: 'print',
                            text: 'Imprimir Reporte Diario',
                            action: 'printerDiario'
                        }*/]
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'EjecucionStore',
            displayInfo: true,
            displayMsg: 'Mostrando Registros {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }]
    });

/*Ext.require('Ext.chart.series.Column');
Ext.require('Ext.chart.axis.Category');
Ext.require('Ext.chart.axis.Numeric');
Ext.require('Ext.form.Panel');
Ext.require('Ext.layout.container.Column');
Ext.require('Ext.form.field.*');
Ext.require('Ext.grid.Panel');
Ext.require('Ext.grid.column.*');
Ext.require('Ext.tab.Panel');
Ext.require('Ext.form.FieldSet');
Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.form.field.Number',
    'Ext.form.field.Date',
    'Ext.tip.QuickTipManager',
     'Ext.grid.feature.Grouping'
]);
    Ext.define('proyecto.view.licencias.gridLicencias' ,{
    extend: 'Ext.grid.Panel',
    // xtype: 'grouped-grid',
    alias: 'widget.gridLicencias',
   // columnLines: true,
    requires: ['Ext.toolbar.Paging'],
     features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{columnName}: {name} ({rows.length} Item{[values.rows.length > 1 ? "s" : ""]})',
        hideGroupedHeader: true,
        startCollapsed: true
    }],

    dockedItems: [{
            dock: 'top',
            xtype: 'toolbar',
            items: [{
                tooltip: 'Toggle the visibility of the summary row',
                text: 'Toggle Summary',
                enableToggle: true,
                pressed: true,
                handler: function(){
                    var view = grid.getView();
                    showSummary = !showSummary;
                    view.getFeature('group').toggleSummaryRow(showSummary);
                    view.refresh();
                }
            }]
        }],
    initComponent: function() {
        this.store = 'LicenciasStore';
        this.columns = [
          
            {text: "id", width: 100, dataIndex: 'id',hidden:true},
            {text: "Especifica", groupable: true,width: 100,dataIndex: 'especifica', renderer: function(val) {

                    return '<span style="color:#2D4A59"><b>' + val + '</b></span>';
                },
            summaryType: 'count',
            summaryRenderer: function(value, summaryData, dataIndex) {
                return ((value === 0 || value > 1) ? '(' + value + ' Tasks)' : '(1 Task)');
            }},
            {text: "Descripcion", flex: 1, dataIndex: 'descripcion', renderer: function(val) {

                    return '<span style="color:#2D4A59"><b>' + val + '</b></span>';
                }},
            {text: "PROGRAMADO", width: 180, dataIndex: 'programado', renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            summaryType: 'average',align: 'right'},
            {text: "EJECUTADO MES", width: 115, dataIndex: 'ejecutado_mes', renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            summaryType: 'average',align: 'right'},
            {text: "ACUMULADO", width: 100, dataIndex: 'acumulado_mes',renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            summaryType: 'average',align: 'right'},
            {text: "SALDO", width: 100, dataIndex: 'saldo_mes',renderer: Ext.util.Format.usMoney,
            summaryRenderer: Ext.util.Format.usMoney,
            summaryType: 'average', align: 'right'}
           
            
           ];
           this.dockedItems = [{
            xtype: 'toolbar',
            items: [{
                            iconCls: 'add',
                            itemId: 'add',
                            text: 'Agregar',
                            action: 'add'
                        },{
                            iconCls: 'atendido',
                            text: 'Eliminar',
                            action: 'delete'
                        }]
        }
         ,{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'LicenciasStore',
            displayInfo: true,
            displayMsg: 'Mostrando Contatos {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }];
 
        this.callParent(arguments);
    }
});*/

  
  