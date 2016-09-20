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

    Ext.define('proyecto.view.Grid' ,{
    extend: 'Ext.grid.Panel',
    alias: 'widget.papeletagrid',
  //  title : 'Contatos',
  //  id:'gridcitas',
    itemId: 'contatogrid',
   // xtype : 'usuariogrid',
    
    columnLines: true,
    requires: ['Ext.toolbar.Paging'],
   /* viewConfig: {
        stripeRows: true
    },*/
    initComponent: function() {
        this.store = 'datos';
        this.columns = [
            {
                            menuDisabled: true,
                            sortable: false,
                            xtype: 'actioncolumn',
                            width: 50,
                            items: [{
                                iconCls: 'atendido',
                                tooltip: 'No atendido',
                                handler: function(grid, rowIndex, colIndex) {
                                    var rec = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm('Confirmación', 'Esta seguro de Marcar cimo no Atendido?', function estadoatencion(btn) {
                                            if(btn=='yes'){
                                                Ext.Ajax.request({
                                                                url : 'index.php/lista/actualizabien' ,
                                                                params : 'id='+rec.get('id'),
                                                                method : 'POST',
                                                                success: function (result,request){
                                                                        //procesarRespuestaAjax(result);
                                                                        grid.getStore().reload();
                                                                        //if(postFuncion!=null) eval(postFuncion);
                                                                },
                                                                failure: function (result,request){
                                                                        //procesarRespuestaAjax(result);
                                                                        alert('Error: comunicacion con servidor')
                                                                }
                                                });
                                        }

                                        }   );
                                    //Ext.Msg.alert('Mensaje',  rec.get('fecha'));
                                    
                                }
                            }, {
                                getClass: function(v, meta, rec) {
                                    if (rec.get('atendido') >0) {
                                        return 'atendido';
                                    } else {
                                        return 'noatendido';
                                    }
                                },
                                getTip: function(v, meta, rec) {
                                    if (rec.get('atendido') > 0) {
                                        return 'Hold stock';
                                    } else {
                                        return 'Marcar como Atendido!';
                                    }
                                },
                                handler: function(grid, rowIndex, colIndex) {
                                       var rec = grid.getStore().getAt(rowIndex);
                                    Ext.MessageBox.confirm('Confirmación', 'Esta Atendido?', function estadoatencion(btn) {
                                            if(btn=='yes'){
                                                Ext.Ajax.request({
                                                                url : 'index.php/lista/actualiza' ,
                                                                params : 'id='+rec.get('id'),
                                                                method: 'POST',
                                                                success: function (result,request){
                                                                        //procesarRespuestaAjax(result);
                                                                        grid.getStore().reload();
                                                                        //if(postFuncion!=null) eval(postFuncion);
                                                                },
                                                                failure: function (result,request){
                                                                        //procesarRespuestaAjax(result);
                                                                        alert('Error: comunicacion con servidor');
                                                                }
                                                });
                                        }

                                        }   );
                                }
                            }]
                        },{header: 'Atendido',width: 250, sortable: true,dataIndex: 'atencion',
                        renderer: function (value, meta, record) {
                                if(value==0){
                                    meta.css ='naten';
                                    return value='Pendiente';
                                } 
                                else {
                                    meta.css ='aten';
                                    return value='Atendido';
                                }
                            }},

        {header:  'id',width: 170, sortable: true, hidden:true,dataIndex:'id'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'idpersona'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'motivo'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'horasalida'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'horaretorno'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'tiempoautorizado'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'observaciones'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'fecha'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'firmajefeinmediato'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'firmaadministracion'},
        {header:  'id',width: 170, sortable: true, hidden:false,dataIndex:'firmapersonal'}
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
            store: 'datos',
            displayInfo: true,
            displayMsg: 'Mostrando Contatos {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }/**/];
 
        this.callParent(arguments);
    }
});

  