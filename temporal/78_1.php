<script type="text/javascript">
    Ext.tip.QuickTipManager.init();
    var panelgridEjecucion = new Ext.Panel({
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
           
                items:{xtype:'gridEjecucion'}
            }]
    });
    var pestaniapEjecucion = Ext.getCmp('78');
    pestaniapEjecucion.add(panelgridEjecucion);
    pestaniapEjecucion.doLayout();
</script>