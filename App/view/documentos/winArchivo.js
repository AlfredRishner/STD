Ext.define('proyecto.view.documentos.winArchivo', {
	extend: 'Ext.window.Window',
	title: 'Subir Archivo',
	width: 280,
	height: 100,
	layout: 'fit',
        constrainHeader:true,
        maximizable: true,
	autoShow: true,
	modal: true,
         minimizable: true,
	alias: 'widget.winArchivo',
	initComponent: function(){
		this.items = [Ext.widget('formArchivo')];
		this.callParent(arguments);
	}
       /* listeners: {
        minimize: function(){
            var win = this;
            win.toggleCollapse();
            if (!win.getCollapsed()) {
                win.center();
            } else {
                win.alignTo(document.body, 'bl-bl');
            }
        }
    }*/

});
