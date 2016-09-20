Ext.define('proyecto.view.MyViewport',{
    extend : 'Ext.container.Viewport',
    layout : 'border',
    width  : 468,
    height : 549,
    items: [  { region: 'west',
                stateId: 'navigation-panel',
                id: 'west-panel', // see Ext.getCmp() below
                title: 'Menu Principal',
                split: true,
                width: 250,
                minWidth: 240,
                maxWidth: 400,
                collapsible: true,
                animCollapse: true,
                margins: '0 0 0 5',
               layout: 'accordion',
                //layout:'fit',
                items : [ Ext.create('proyecto.view.menu')  ]
            }, Ext.create('proyecto.view.pestania')
         ]
   
		
 });
