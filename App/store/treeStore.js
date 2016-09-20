/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.define('proyecto.store.treeStore',{
    extend: 'Ext.data.TreeStore',
   // model: 'proyecto.model.menuModel',
        proxy: {
            type: 'ajax',
            reader: 'json',
            url: 'index.php/lista/ListaNodosMenu',
            node:'id' // send the parent id through GET (default 0)
        }
    });
// get the tree
