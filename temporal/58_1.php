<script type="text/javascript">
    Ext.tip.QuickTipManager.init();
   var panelPPTO = new Ext.Panel({
        id: 'panelPresupuestos',
        border: false,
        baseCls: 'x-plain',
         layout: 'border',
bodyBorder: false,
defaults: {
   // collapsible: true,
    split: true,
    bodyPadding: 0
},
// layout: 'fit',
       /* layout: {
            type: 'border',
            padding: 1
        },*/
        //html:'asdflasjkdflaks'
        items: [{
            region: 'center',
            layout: 'fit',
            height: 200,
            weight: -120,
           
           items:{xtype:'gridPPTO'}
        }]
    });
    var pestaniaPPTO = Ext.getCmp('58');
    pestaniaPPTO.add(panelPPTO);
    pestaniaPPTO.doLayout();
        var gpap = Ext.widget('gridPPTO');
    gpap.getStore('PPTOStore').load();
</script>