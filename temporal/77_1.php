<script type="text/javascript">
    Ext.tip.QuickTipManager.init();
   var panelEspecificasGrupos = new Ext.Panel({
        //id: 'panelPresupuestos',
        border: false,
        baseCls: 'x-plain',
         layout: 'border',
bodyBorder: false,
defaults: {
   // collapsible: true,
    split: true,
    bodyPadding: 0
},
        items: [{
            region: 'center',
            layout: 'fit',
            height: 200,
            weight: -120,
           
           items:{xtype:'gridGrupo'}
        }]
    });
    var pestaniaEspecificasGrupos = Ext.getCmp('77');
    pestaniaEspecificasGrupos.add(panelEspecificasGrupos);
    pestaniaEspecificasGrupos.doLayout();
</script>