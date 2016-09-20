Ext.define('proyecto.view.mesa.gridMesaAyuda', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.gridMesaAyuda',
    //frame: true,
    store: 'FebreroStore',
    /*features: [{
     id: 'group',
     ftype: 'groupingsummary',
     groupHeaderTpl: '{name}',
     hideGroupedHeader: true,
     startCollapsed: false,
     enableGroupingMenu: false
     }],*/
    viewConfig: {
        stripeRows: false,
        getRowClass: function (record) {
            if (record.get('prioridad') ==1) return 'alto-row';
            else if (record.get('prioridad') == 2) return 'medio-row';
            else if (record.get('prioridad') == 3) return 'bajo-row';
            else if (record.get('prioridad') == 4) return 'atendido-row';
        }
    },
    //Textos completos 	id 	idUsuario 	asunto 	consulta 	captura 	prioridad 
    columns: [new Ext.grid.RowNumberer(),
        {header: 'id', sortable: true, hidden: true, dataIndex: 'id'},
        {header: 'idUsuario', sortable: true, hidden: true, dataIndex: 'mes'},
        {header: 'ASUNTO', sortable: true,width: 250, hidden: false, dataIndex: 'asunto'},
        {
            header: 'CONSULTA',
            flex: 1,
            sortable: true,
            dataIndex: 'consulta'

        },
        {
            header: 'Captura',
            width: 150,
            sortable: true,
            dataIndex: 'captura',
            renderer: function (value) {
                return '<a target= _blank  href="'+value+'">'+value+'</a>';
            }

        }
        , {header: 'PRIORIDAD', sortable: true, hidden: false, dataIndex: 'prioridad',
        renderer: function (value) {
                return value<2 ? 'ATENDIDO':'PENDIENTE';
                
            }}],
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
            store: 'FebreroStore',
            displayInfo: true,
            displayMsg: 'Mostrando Registros {0} - {1} de {2}',
            emptyMsg: "Ningun contato encontrado."
        }]
});
