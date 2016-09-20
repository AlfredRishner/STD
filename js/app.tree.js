[{
    text:'Ventas',
    expanded:true,
    children:[{
    	id : 'presupuestos',
    	tabType:'load',
        text:'Presupuestos',
        iconCls:'coins',
        leaf:true
    },{
    	id : 'ventas',
    	tabType:'load',
        text:'Facturas Venta',
        iconCls:'coins',
        leaf:true
    },{
    	id : 'clientes',
    	tabType:'load',
        text:'Clientes',
        iconCls:'group',
        leaf:true
    }]
},{
    text:'Compras',
    expanded:true,
    children:[
	{
    	id : 'compras',
    	tabType:'load',
        text:'Facturas Compra',
        iconCls:'money',
        leaf:true
    },{
    	id : 'proveedores',
    	tabType:'load',
        text:'Proveedores',
        iconCls:'group_gear',
        leaf:true
    }]
},{
    text:'Finanzas',
    expanded:true,
    children:[
	{
    	id : 'cobros',
    	tabType:'load',
        text:'Cobros',
        iconCls:'coins',
        leaf:true
    },{
    	id : 'pagos',
    	tabType:'load',
        text:'Pagos',
        iconCls:'money',
        leaf:true
    },{
    	id : 'mov_bancos',
    	tabType:'load',
        text:'Movimientos Banco',
        iconCls:'arrow_switch',
        leaf:true
    }]
},{

	text:'Administraci&oacute;n',
	expanded:true,
	iconCls:'web_icon',
	children:[
	{
    	id : 'cuadro_mando',
    	tabType:'load',
        text:'Inicio',
        iconCls:'house',
        leaf:true
    },	{
    	id : 'documentos',
    	tabType:'load',
        text:'Documentos',
        iconCls:'docs_office',
        leaf:true
    },{
    	id : 'bancos',
    	tabType:'load',
        text:'Bancos/Cajas',
        iconCls:'building',
        leaf:true
    },{
    	id : 'articulos',
    	tabType:'load',
        text:'Articulos',
        iconCls:'',
        leaf:true
    },{
    	id : 'listados',
    	tabType:'load',
        text:'Listados',
        iconCls:'page_excel',
        leaf:true
    }
	]
}
]
