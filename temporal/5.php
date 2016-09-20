<script type="text/javascript">
   var panelAutorizacionViaje = new Ext.Panel({
      //  id: 'panelPresupuestos',
        border: false,
        baseCls: 'x-plain',
        layout: 'fit',
        //html:'asdflasjkdflaks'
        items: [{xtype:'gridAbril'}]
    });
    var AutViaje = Ext.getCmp('5');
    AutViaje.add(panelAutorizacionViaje);
    AutViaje.doLayout();
    var gpap5 = Ext.widget('gridAbril');
    gpap5.getStore('AbrilStore').load();
</script>