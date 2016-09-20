/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.view.Window', {

	extend: 'Ext.window.Window',
	title: 'Editando registro',
	width: 380,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.usuarioedit',

	initComponent: function(){
		this.items = [
			Ext.widget('usuarioform')
		];
		this.callParent(arguments);
	}

});
