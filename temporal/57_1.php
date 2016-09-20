<script type="text/javascript">

    var pestaniaEspecificas = Ext.getCmp('57');
    pestaniaEspecificas.add({xtype:'gridPapeletas'});
    pestaniaEspecificas.doLayout();
    var gpap = Ext.widget('gridPapeletas');
    gpap.getStore('PapeletaStore').load();
</script>