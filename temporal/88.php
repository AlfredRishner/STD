<script type="text/javascript">
    
    //var p_Oficina = Ext.getCmp('sys_88');
     var p_Oficina = Ext.ComponentQuery.query('#sys_88');
    //console.log("hasta aqui");
   // this.p_Oficina.remove({xtype:'gridOficinas'});
    this.p_Oficina.add({xtype:'gridOficinas'});
   // alert('existes');
    this.p_Oficina.doLayout();
   // this.tab.doLayout();
        
</script>