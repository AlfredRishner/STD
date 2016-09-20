<script type="text/javascript">
    // create the Data Store
   // var storePresupuestos = new app.StorePresupuestos();

	/************************** PANEL PARA MOSTRAR LOS DATOS DEL PRESUPUESTO **************************/
/*
    var fichaPresupuesto = new Ext.Panel({
		id:'fichaPresupuesto',
        region:'center',
        split:true,
        height:350,
        minHeight:300,
        border:false,
        autoScroll:true,
        //margins: '2 2 2 2',
        layout:'fit',
		autoLoad: {url: 'presupuesto.php', scripts: true, scope: this,text:'Cargando...'}
    });*/

    var panelPresupuestos = new Ext.Panel({
		id:'panelPresupuestos',
		border:false,
		baseCls: 'x-plain',
        layout: 'tdgi_border',
        html:"hola"
        //items: [gridPresupuestos, fichaPresupuesto]
    });

app.tab_presupuestos=Ext.getCmp('presupuestos');
app.tab_presupuestos.add(panelPresupuestos);
app.tab_presupuestos.doLayout();


// Utility functions
</script>
