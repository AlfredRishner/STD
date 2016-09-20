
/*Ext.define('proyecto.view.documentos.panelPELT', {
 extend: 'Ext.Container',
 alias: 'widget.gridPanel',
 xtype: 'basic-panels',
 width: 660,
 requires: [
 'Ext.layout.container.Table'
 ],
 
 layout: {
 type: 'table',
 columns: 3,
 tdAttrs: { style: 'padding: 10px;' }
 },
 
 defaults: {
 xtype: 'panel',
 width: 200,
 height: 200,
 bodyPadding: 10
 },
 
 initComponent: function () {
 this.items = [
 {
 html: 'KitchenSink.DummyText.mediumText'
 },
 {
 title: 'Title',
 html:' KitchenSink.DummyText.mediumText'
 }
 
 ];
 
 this.callParent();
 }
 });*/
Ext.define('proyecto.view.documentos.panelPELT', {
    extend: 'Ext.Container',
    xtype: 'basic-panels',
    alias: 'widget.gridPanel',
    autoScroll:true,
    layout: {
        type: 'border',
        padding: 5
    },
    defaults: {
        bodyPadding: 1,
        autoScroll: true
    },
    items: [{
            region: 'center',
            title: 'Documetos',
            width: 200,
            split: true,
            layout: 'fit',
            floatable: true,
            items: [{xtype: 'gridPrincipal'}]
        }, {
            region: 'east',
            title: 'Archivos',
            collapsible: true,
            floatable: true,
            width: 250,
            minWidth: 220,
            layout: 'fit',
            split: true,
            items: [{xtype: 'gridArchivos'}]
        }]

});