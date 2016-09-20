/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.view.licencias.winLicencias', {
	extend: 'Ext.window.Window',
	title: 'Editando registro [Licencias]',
	width: 580,
	height: 400,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.winLicencias',
	initComponent: function(){
		this.items = [
			Ext.widget('formLicencias')
		];
		this.callParent(arguments);
	}

});

