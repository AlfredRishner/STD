/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.view.octubre.winOctubre', {
	extend: 'Ext.window.Window',
	title: 'Editando registro [Ejecucion]',
	width: 680,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.winOctubre',
	initComponent: function(){
		this.items = [
			Ext.widget('formOctubre')
		];
		this.callParent(arguments);
	}

});

