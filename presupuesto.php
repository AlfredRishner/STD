<!--
 * SdSimple
 * Aplicación de facturación on-line OpenSource
 * Copyright © 2009 - Pedro Peña García, ppg@passer.es
 * Nanclares de Oca Nº1 Portal C Madrid 28022
 * www.passer.es
 *
 Este fichero es parte de SdSimple Ud. puede redistribuirlo y/o modificarlo
 bajo los términos de la Licencia Pública General GNU tal como está publicada
 por la Free Software Foundation; ya sea la versión 3 de la licencia,
 o (según su elección) cualquier otra versión posterior.
 Este programa se distribuye con la esperanza de que sea útil,
 pero SIN NINGUNA GARANTÍA; incluso sin las garantías de COMERCIALIZACIÓN o
 USABILIDAD O UTILIDAD PARA USOS PARTICULARES.
 Vea la Licencia Pública General GNU para más detalles.
 Ud. debería haber recibido una copia de la Licencia Pública General GNU junto con este programa;
 si no la ha recibido, escriba a la Free Software Foundation, Inc.,
 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 -->
<%@ page import="util.Utiles, java.util.Vector, beans.Empresa"%>

<%Empresa empresa = Utiles.getEmpresaConectada(request);%>

<script type="text/javascript">


	function procesarRespuestaSavePresupuesto(request, action) {

		var json = procesarRespuestaForm(action);

		if(json.success){
			storePresupuestos.reload();

			//hacemos este proceso para actualizar el id_presupuesto en caso de tratarse de un nuevo registro...
			param = getParametro(json.parametros, "id");
			if(param!=null)
				Ext.getCmp('id_presupuesto').setValue(param.valor);

			param = getParametro(json.parametros, "presupuesto");
			if(param!=null)
				Ext.getCmp('presupuesto_presupuestos').setValue(param.valor);

			tabFichaPresupuesto.inicializar(Ext.getCmp('id_presupuesto').getValue());

			//Si el tab de ventas esta abierto actualizamos el listado de ventas...
			ventas = Ext.getCmp('gridVentas');
			if(ventas)
				ventas.getStore().reload();
		}
	}

	function guardarPresupuesto(crearFactura){
		if(!formPresupuesto.getForm().isValid())
			return;

		//Obtenemos la lista de conceptos del grid
		var cpts = [];
		gridConceptosPresupuesto.getStore().each(function(rec){
			cpts.push(Ext.util.JSON.encode(rec.data));
		});
		if(cpts.length==0){
			Ext.utiles.msg("Aviso", "Debe introducir alg&uacute;n concepto para el presupuesto.");
			return;
		}

		formPresupuesto.getForm().submit({
			waitTitle: 'Procesando',
			waitMsg:'Por favor Espere...',
			params:{conceptos:cpts, crearFactura:crearFactura},
			success: procesarRespuestaSavePresupuesto,
			failure: procesarRespuestaSavePresupuesto
		});
	}


	/********************** FORMULARIO VENTA ***************************/

	var gridDocumentosPresupuesto = new app.GridDocumentosAsociados('gridDocumentosPresupuesto', 'presupuesto', 'id_presupuesto');

	var comboClientes = new app.ComboClientes({
		listeners:{select: function(combo, reg){
				Ext.getCmp('forma_pago_presupuestos').setValue(reg.get('forma_pago'));
			}
		}
	});

    comboClientes.store.load();

	var formPresupuesto = new Ext.form.FormPanel({
		layout:'form',
		//baseCls: 'x-plain',
		region:'north',
		minHeight:140,
		height:140,
		split:false,
	    bodyStyle:'padding:5px',
	    labelWidth: 75,
	    autoScroll:true,
	    labelAlign: 'top',
	    border:true,
	    url:'GuardarPresupuesto',
		items:[
			{layout:'column',
	            border:false,
	            items:[
	            {fieldLabel:'<b>id</b>', xtype:'hidden', id: 'id_presupuesto', name: 'id'},
	            {
	                columnWidth:.10, layout: 'form', border:false,
	                items: {fieldLabel:'<b>Presupuesto</b>', xtype:'numberfield', id: 'presupuesto_presupuestos', name: 'presupuesto',  width:'100', maxLength:11, readOnly:true}

	            },{
		            columnWidth:.15, border:false, layout: 'form',
	                items:{fieldLabel:'<b>Fecha</b>', xtype:'datefield', id: 'fecha_presupuestos', name: 'fecha', allowBlank:false, value:new Date()}
	            },{
		            columnWidth:.15, border:false, layout: 'form',
		            items:{fieldLabel:'<b>%Retenci&oacute;n</b>', xtype:'numberfield', id:'tipo_retencion_presupuestos', name: 'retencion', width:'40', maxLength:2, selectOnFocus:true, style:'text-align:right', allowBlank:false, value:'<%=empresa.getTipo_irpf()%>'
		            	,listeners :{change: function(){gridConceptosPresupuesto.calcularTotal();}}}
	            },{
		            columnWidth:.15, border:false, layout: 'form',
		            items:{fieldLabel:'<b>Base</b>', readOnly:true, disabled:true, xtype:'numberfield', id: 'base_presupuestos', name: 'base', width:'100', selectOnFocus:true}
	            },{
		            columnWidth:.15, border:false, layout: 'form',
		            items:{fieldLabel:'<b>I.V.A.</b>', readOnly:true, disabled:true, xtype:'numberfield', id: 'iva_presupuestos', name: 'iva', width:'100', selectOnFocus:true}
	            },{
		            columnWidth:.15, border:false, layout: 'form',
		            items:{fieldLabel:'<b>Retenci&oacute;n</b>', readOnly:true, disabled:true, xtype:'numberfield', id: 'retencion_presupuestos', width:'100', selectOnFocus:true, style:'text-align:right'}
	            },{
		            columnWidth:.15, border:false, layout: 'form',
		            items:{fieldLabel:'<b>Total</b>', readOnly:true, disabled:true, xtype:'numberfield', id: 'importe_presupuestos', name: 'importe', width:'120', selectOnFocus:true}
	            }]
	        },{layout:'column',
	            border:false,
	            items:[{
	                columnWidth:.40, layout: 'form', border:false,
	                items: comboClientes
	            },{
		            columnWidth:.30, border:false, layout: 'form',
	                items: {fieldLabel:'<b>S/Ref.</b>', xtype:'textfield', id: 'sref_presupuestos', name: 'sref',anchor:'90%', maxLength:255, selectOnFocus:true}
	            },{
		            columnWidth:.30, border:false, layout: 'form',
		            items: {fieldLabel:'<b>Forma Pago</b>', xtype:'textfield', id: 'forma_pago_presupuestos', name: 'forma_pago',anchor:'90%', maxLength:255, selectOnFocus:true}
	            }]
	        }],
	        tbar:[{
	            text:'Guardar ',
	            tooltip:'Guardar cambios',
	            iconCls:'save',
				listeners :{
	            	click: function(){guardarPresupuesto();}
	            }
	        },{
	            text:'Pasar a Factura ',
	            tooltip:'Generar Factura en base al Presupuesto',
	            id:'boton_factura2_presupuesto',
	            iconCls:'app_go',
	            hidden:true,
				listeners :{
	            	click: function(){guardarPresupuesto(1);}
	            }
	        },{
	            text:'Imprimir',
	            id:'boton_imprimir_presupuesto',
	            hidden:true,
	            tooltip:'Imprimir Presupuesto Presupuesto',
	            iconCls:'print',
				listeners :{
	            	click: function(){
	        			imprimirDocumento('Presupuesto',Ext.getCmp("id_presupuesto").value, 'Presupuesto Presupuesto');
	            	}
	            }
			},{
	            text:'Enviar',
	            id:'boton_enviar_presupuesto',
	            hidden:true,
	            tooltip:'Enviar Presupuesto',
	            iconCls:'email_open',
				listeners :{
	            	click: function(){
	        			//enviarDocumento('url=Presupuesto?id='+Ext.getCmp("id_presupuesto").value)
	        			enviarDocumento({url:'Presupuesto?id='+Ext.getCmp("id_presupuesto").value, asunto:'Presupuesto'});
	            	}
	            }
			}],
        inicializar: function() {
        	var id = Ext.getCmp('id_presupuesto').getValue();
			var visible=(id==0)?false:true;
			var componentes = ['boton_imprimir_presupuesto','boton_enviar_presupuesto', 'boton_factura2_presupuesto'];
			for(i=0; i<componentes.length; i++)
				Ext.getCmp(componentes[i]).setVisible(visible);
			//Inicializamos a su vez el grid de documentos
			gridDocumentosPresupuesto.inicializar();
        }

	});

	/********************** FORMULARIO CONCEPTO VENTA ***************************/

	function guardarConceptoPresupuesto(){

		if(!formConceptoPresupuesto.getForm().isValid())
			return;

		//Comprobamos si ya existe el registro a insertar en el store de Detalles
		var prod = new app.presupuestoDetalleRecord({
			id:0, id_presupuesto: Ext.getCmp('id_presupuesto').getValue(),
			id_articulo:0, descripcion:'', base:0, iva:0, cantidad:1, importe:0
        });

		var cptPresupuestoSelect = getRegSelected(gridConceptosPresupuesto);
        if(cptPresupuestoSelect==null){
	        cptPresupuestoSelect=prod;
	        storeConceptosPresupuesto.insert(storeConceptosPresupuesto.getCount(), prod);
        }

		//Paramos los eventos mientras realizamos los cambios
		gridConceptosPresupuesto.getSelectionModel().suspendEvents();

		cptPresupuestoSelect.set('id_articulo', comboArticulos.getValue());
		cptPresupuestoSelect.set('base', Ext.getCmp('base_form_concepto_presupuesto').getValue());
		cptPresupuestoSelect.set('iva', Ext.getCmp('iva_form_concepto_presupuesto').getValue());
		cptPresupuestoSelect.set('descripcion', Ext.getCmp('descripcion_form_concepto_presupuesto').getValue());
		cptPresupuestoSelect.set('cantidad', Ext.getCmp('cantidad_form_concepto_presupuesto').getValue());
		cptPresupuestoSelect.set('importe', Ext.getCmp('importe_form_concepto_presupuesto').getValue());

		//Reiniciamos los eventos tras los cambios
		gridConceptosPresupuesto.getSelectionModel().resumeEvents();

        //Reseteamos el form, para seguir añadiendo...
		formConceptoPresupuesto.inicializar();
		gridConceptosPresupuesto.calcularTotal();
	}

	var comboArticulos = new app.ComboArticulos({
		listeners:{
			select: function(combo, reg){
				//Funcion utilizada para dar valor a campos de formulario (app.functions.js)
				setFieldValue('cantidad_form_concepto_presupuesto', 1, true);
				setFieldValue('base_form_concepto_presupuesto', reg.get('precio'));
				setFieldValue('iva_form_concepto_presupuesto', reg.get('iva'));
				setFieldValue('descripcion_form_concepto_presupuesto', reg.get('descripcion'));
				formConceptoPresupuesto.calcularImporte();
		    }
		}
	});


	var formConceptoPresupuesto = new Ext.form.FormPanel({
		layout:'fit',
		//baseCls: 'x-plain',
		region:'east',
		autoScroll:true,
		split:true,
		width:500,
		minWidth:400,
	    border:true,
	    method:'POST',
	    url:'GuardarConceptoPresupuesto',
	    bodyStyle:'padding:5px 0px 0px 5px; ',
	    labelAlign:'top',
	    labelWidth: 80,
	    items:[{
            layout:'column', baseCls: 'x-plain',
            items:[
				{
	                columnWidth:.70, layout: 'form', border:false, baseCls: 'x-plain',
	                items: [
		                {xtype:'hidden', name: 'id'},
		                comboArticulos,
		       			{fieldLabel:'<b>Descripci&oacute;n</b>', id: 'descripcion_form_concepto_presupuesto', name: 'descripcion', xtype:'textarea', anchor:'90%', allowBlank:false, height:100}
	                ]
	            },{
	                columnWidth:.30, layout: 'form', border:false, baseCls: 'x-plain',
	                items: [
	                	{fieldLabel:'<b>Base</b>', id: 'base_form_concepto_presupuesto', name: 'base', xtype:'numberfield', allowDecimals:true, anchor:'90%', decimalPrecision:2, allowBlank:false, style:'text-align:right', selectOnFocus:true
		                	,listeners :{change: function(){formConceptoPresupuesto.calcularImporte();}}
	                	},
	                	{fieldLabel:'<b>%I.V.A.</b>', id: 'iva_form_concepto_presupuesto', name: 'iva', xtype:'numberfield', anchor:'90%', allowBlank:false, maxLenght:2, style:'text-align:right', allowDecimals:false, value:'<%=empresa.getTipo_iva()%>', selectOnFocus:true
		                	,listeners :{change: function(){formConceptoPresupuesto.calcularImporte();}}
		                },
						{fieldLabel:'<b>Cantidad</b>', id: 'cantidad_form_concepto_presupuesto', name: 'cantidad', xtype:'numberfield', allowDecimals:true, anchor:'90%', decimalPrecision:2, allowBlank:false, style:'text-align:right', selectOnFocus:true, value:1
							,listeners :{change: function(){formConceptoPresupuesto.calcularImporte();}}
						},
						{fieldLabel:'<b>Importe</b>', id: 'importe_form_concepto_presupuesto', name: 'importe', xtype:'numberfield', allowDecimals:true, anchor:'90%', decimalPrecision:2, allowBlank:false, style:'text-align:right', selectOnFocus:true, readOnly:true}
	                ]
	            }]
			}
		],
	    tbar: [{
	        text:'A&ntilde;adir/Modificar',
			tooltip:'A&ntilde;adir/Modificar Concepto',
	        iconCls:'add',
	        	handler: function (){
					guardarConceptoPresupuesto();
	    		}
		},'-',{
            text:'Nuevo Concepto',
            tooltip:'Crear nuevo Concepto',
            iconCls:'page_add',
			listeners :{
            	click: function(){
            		Ext.getCmp("descripcion_form_concepto_presupuesto").focus();
            		formConceptoPresupuesto.inicializar();
            	}
            }

        }],
        inicializar: function() {
        	this.getForm().reset();
        	comboArticulos.store.load();
        	gridConceptosPresupuesto.deseleccionar();
        },
        calcularImporte: function(){
	        var base = Ext.getCmp('base_form_concepto_presupuesto').getValue();
	        var iva = Ext.getCmp('iva_form_concepto_presupuesto').getValue();
	        var cantidad = Ext.getCmp('cantidad_form_concepto_presupuesto').getValue();

	        var importe = dosDecimales(base*cantidad*(1+iva/100));
	        Ext.getCmp('importe_form_concepto_presupuesto').setValue(importe);


        }
	});


	/******************** GRID CONCEPTOS FACTURA VENTA ********************************/

	var storeConceptosPresupuesto = new Ext.data.Store({
        proxy: new Ext.data.HttpProxy({
            url: 'BuscarDetallesPresupuesto'
        }),
        reader: new Ext.data.JsonReader({
            root: 'registros',
            totalProperty: 'totalCount'
        }, app.presupuestoDetalleRecord),
        remoteSort:false,
		listeners: {
	    	load: function() {
	    		gridConceptosPresupuesto.calcularTotal();
			}
		}
    });

	var cmConceptosPresupuesto = new Ext.grid.ColumnModel([
		{dataIndex:'descripcion', header:'Descripci&oacute;n', sortable: true, hidden:false, width:200},
		{dataIndex:'base', header:'Base', sortable: true, hidden:false, align:'right', width:80},
		{dataIndex:'iva', header:'%I.V.A.', sortable: true, hidden:false, align:'right', width:60},
		{dataIndex:'cantidad', header:'Cantidad', sortable: true, hidden:false, align:'right', width:80},
		{dataIndex:'importe', header:'Importe', sortable: true, hidden:false, align:'right', width:80}
	]);

    var gridConceptosPresupuesto = new Ext.grid.GridPanel({
		region:'center',
		autoScroll:true,
		minWidth:400,
		border:true,
		loadMask: true,
		store:storeConceptosPresupuesto,
		cm: cmConceptosPresupuesto,
		sm: new Ext.grid.RowSelectionModel({
			singleSelect: true,
	        listeners: {
	        	rowselect: function(sm, row, rec) {
	            	formConceptoPresupuesto.getForm().loadRecord(rec);
	            	cptPresupuestoSelect=rec;
				}
			}
	    }),
		viewConfig: {
			autoFill:false
		},
		tbar:[{
			text:'Eliminar',
            tooltip:'Eliminar Registro seleccionado',
            iconCls:'remove',
			listeners :{
            	click: function(){
	            	var reg = getRegSelected(gridConceptosPresupuesto);
            		gridConceptosPresupuesto.borrarRegistro(reg);
            	}
            }
		}],
		borrarRegistro: function(reg){
			this.getStore().remove(reg);
			formConceptoPresupuesto.inicializar();
			this.calcularTotal();
		},
		calcularTotal: function (){

			var total_base=0;
			var total_iva=0;
			this.getStore().each(function(record){
				var base=dosDecimales(record.get('cantidad')*record.get('base'));
				var iva=dosDecimales(base*record.get('iva')/100);

				total_base+=base;
				total_iva+=iva;
			});

			total_base=dosDecimales(total_base);
			total_iva=dosDecimales(total_iva);
			total_retencion = dosDecimales(total_base*(Ext.getCmp('tipo_retencion_presupuestos').getValue()/100));
			Ext.getCmp('base_presupuestos').setValue(total_base);
			Ext.getCmp('iva_presupuestos').setValue(total_iva);
			Ext.getCmp('retencion_presupuestos').setValue(total_retencion);
			Ext.getCmp('importe_presupuestos').setValue(dosDecimales(total_base+total_iva-total_retencion));
			this.deseleccionar();
		},
		inicializar: function (id){
			this.getStore().load({params:{id_presupuesto:id}});
			this.calcularTotal();
		},
		deseleccionar: function(){
			this.getSelectionModel().clearSelections();
		}

	});


	/***************** PANEL TAB, PARA MOSTRAR TODOS LOS DATOS DE LA FACTURA *************/


	tabFichaPresupuesto = new Ext.TabPanel({
	    baseCls: 'x-plain',
        activeTab: 0,
        deferredRender:false,
        autoScroll:true,
		items:[{
			title:'Datos Presupuesto',
		    baseCls: 'x-plain',
	        layout:'fit',
	        items:[{
				    baseCls: 'x-plain',
			        border:false,
			        layout: 'border',
			        //items: [formPresupuesto, panelCptsPresupuesto]
			        items: [formPresupuesto, gridConceptosPresupuesto, formConceptoPresupuesto]
			}]

		},{
			title:'Documentos Asociados',
		    baseCls: 'x-plain',
		    layout:'fit',
		    items:gridDocumentosPresupuesto
		}]
		,cargarPresupuesto: function(record) {
			var id_presupuesto=0;
			if(record==null){
				formPresupuesto.getForm().reset();
			}else{
				formPresupuesto.getForm().loadRecord(record);
				id_presupuesto=record.get('id');
			}
			Ext.getCmp('sref_presupuestos').focus();
			this.inicializar(id_presupuesto);
		},
		inicializar: function(id_presupuesto){
			formPresupuesto.inicializar(id_presupuesto);
			formConceptoPresupuesto.inicializar(id_presupuesto);
			gridConceptosPresupuesto.inicializar(id_presupuesto);
		}
	});

	app.fichaPresupuesto=Ext.getCmp('fichaPresupuesto');
	app.fichaPresupuesto.add(tabFichaPresupuesto);
	app.fichaPresupuesto.doLayout();

	//Cargamos ahora el grid, cuando este cargada la ficha de Orden de trabajo
	var gridPresupuestos = Ext.getCmp('gridPresupuestos');
	if(gridPresupuestos)
		gridPresupuestos.getStore().load({params:{start:0, limit:25}});


 </script>

