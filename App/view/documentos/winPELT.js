Ext.define('proyecto.view.documentos.winPELT', {
	extend: 'Ext.window.Window',
	title: 'Registro de Nuevo Documento',
	width: 680,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
        maximizable: true,
	autoShow: true,
	modal: true,
         minimizable: true,
	alias: 'widget.winPELT',
	initComponent: function(){
		this.items = [Ext.widget('formPELT')];
		this.callParent(arguments);
	},
        listeners: {
        minimize: function(){
            var win = this;
            win.toggleCollapse();
            if (!win.getCollapsed()) {
                win.center();
            } else {
                win.alignTo(document.body, 'bl-bl');
            }
        }
    }

});
