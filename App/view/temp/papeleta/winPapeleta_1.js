/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.view.papeleta.winPapeleta', {
	extend: 'Ext.window.Window',
	title: 'Editando registro [Papeleta]',
	width: 380,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.winPapeleta',
	initComponent: function(){
		this.items = [
			Ext.widget('formPapeleta')
		];
		this.callParent(arguments);
	}

});

