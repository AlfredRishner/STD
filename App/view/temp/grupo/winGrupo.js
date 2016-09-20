/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.define('proyecto.view.grupo.winGrupo', {
	extend: 'Ext.window.Window',
	title: 'Editando registro [Grupo]',
	width: 380,
	//height: 200,
	layout: 'fit',
        constrainHeader:true,
	autoShow: true,
	modal: true,
	alias: 'widget.winGrupo',
	initComponent: function(){
		this.items = [
			Ext.widget('formGrupo')
		];
		this.callParent(arguments);
	}

});

