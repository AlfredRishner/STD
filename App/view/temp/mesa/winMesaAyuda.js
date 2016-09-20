Ext.define('proyecto.view.mesa.winMesaAyuda', {
	extend: 'Ext.window.Window',
	title: 'Editando registro [Ejecucion]',
	width: 680,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.winMesaAyuda',
	initComponent: function(){
		this.items = [Ext.widget('formMesaAyuda')];
		this.callParent(arguments);
	}

});
