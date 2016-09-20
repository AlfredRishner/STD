Ext.define('proyecto.view.pestania', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.pestania',
    id: 'tabs',
    //activeItem: 0,
    region:'center',
   
    margins: '0 0 0 0',
   
    items:[{
            id:'cuadro_mando',
            closable:false,
            layout:'fit',
            title: 'Inicio',
            iconCls:'house'
            }
    ],
    initComponent: function() {
        
        this.callParent(arguments);
    }    
            
});