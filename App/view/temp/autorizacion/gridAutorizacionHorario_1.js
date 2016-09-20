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

    Ext.define('proyecto.view.autorizacion.gridAutorizacionHorario' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridAutorizacionHorario',
    columnLines: true,
    requires: ['Ext.toolbar.Paging'],
   /* viewConfig: {
        stripeRows: true
    },*/
    initComponent: function() {
        this.store = 'AutorizacionFueraHorarioStore';
        this.columns = [
            
 {text: "id", flex: 1, hidden: true, dataIndex: 'id'},
            {text: "Fecha", width: 100, dataIndex: 'fecha'},
            {text: "Motivo", flex: 1, dataIndex: 'motivo', renderer: function(val) {

                    return '<span style="color:#0033FF"><b>' + val + '</b></span>';
                }},
            {text: "Hora Salida", width: 180, dataIndex: 'horasalida'},
            {text: "Hora Retorno", width: 115, dataIndex: 'horaretorno'},
            {text: "T. Autorizado", width: 100, dataIndex: 'tiempoautorizado'},
            {text: "Observaciones", width: 100, dataIndex: 'fecha'},
            {text: "Fecha", width: 100, dataIndex: 'fecha'},
            //{text: "Aut. Jefe Inmediato", width: 100, dataIndex: 'firmajefeinmediato'},
            {
                dataIndex: 'firmajefeinmediato',
                width: 150,
                align: 'center',
                text: 'Aut. Jefe Inmediato',
                renderer: function(value, meta) {
                    if (value === 1) {

                        meta.tdCls = 'papeleta-aprobado';
                        return '<span style="color:green"><b>Autirizado</b></span>';
                    } else {
                        meta.tdCls = 'papeleta-desaprobado';
                        return '<span style="color:red"><b>No Autorizado</b></span>';
                    }
                }
            },
            {
                dataIndex: 'firmapersonal',
                width: 150,
                align: 'center',
                text: 'Aut. Jefe Personal',
                renderer: function(value, meta) {
                    if (value === 1) {

                        meta.tdCls = 'papeleta-aprobado';
                        return '<span style="color:green"><b>Autirizado</b></span>';
                    } else {
                        meta.tdCls = 'papeleta-desaprobado';
                        return '<span style="color:red"><b>No Autorizado</b></span>';
                    }
                }
            },
            {
                dataIndex: 'firmaadministracion',
                width: 150,
                align: 'center',
                text: 'Aut. Jefe Administracion',
                renderer: function(value, meta) {
                    if (value === 1) {

                        meta.tdCls = 'papeleta-aprobado';
                        return '<span style="color:green"><b>Autirizado</b></span>';
                    } else {
                        meta.tdCls = 'papeleta-desaprobado';
                        return '<span style="color:red"><b>No Autorizado</b></span>';
                    }
                }
            }/*
        {header:  'id',width: 170, sortable: true, hidden:true,dataIndex:'id'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'idpersona'},
        {header:  'Motivo',width: 170, sortable: true, hidden:false,dataIndex:'motivo'},
        {header:  'Hora Salida',width: 170, sortable: true, hidden:false,dataIndex:'horasalida'},
        {header:  'Hora Retorno',width: 170, sortable: true, hidden:false,dataIndex:'horaretorno'},
        {header:  'Tiempo Autorizado',width: 170, sortable: true, hidden:false,dataIndex:'tiempoautorizado'},
        {header:  'Observaciones',width: 170, sortable: true, hidden:false,dataIndex:'observaciones'},
        {header:  'Fecha',width: 170, sortable: true, hidden:false,dataIndex:'fecha'},
        {header:  'Aut. Jefe Inmediato',width: 170, sortable: true, hidden:false,dataIndex:'firmajefeinmediato'},
        {header:  'Aut. Jefe Administracion',width: 170, sortable: true, hidden:false,dataIndex:'firmaadministracion'},
        {header:  'Aut. Jefe Personal',width: 170, sortable: true, hidden:false,dataIndex:'firmapersonal'}*/
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
                        },{
                            iconCls: 'print',
                            text: 'Imprimir Ticket',
                            action: 'printer'
                        },{
                            iconCls: 'print',
                            text: 'Imprimir Reporte Diario',
                            action: 'printerDiario'
                        }]
        }
         ,{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'AutorizacionFueraHorarioStore',
            displayInfo: true,
            displayMsg: 'Mostrando Contatos {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }/**/];
 
        this.callParent(arguments);
    }
});

  