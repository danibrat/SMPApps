/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */

// Provides the XML model implementation of a list binding
sap.ui.define(['jquery.sap.global', 'sap/ui/model/ClientTreeBinding'],
	function(jQuery, ClientTreeBinding) {
	"use strict";


	/**
	 *
	 * @class
	 * Tree binding implementation for XML format
	 *
	 * @param {sap.ui.model.xml.XMLModel} [oModel]
	 * @param {string} sPath the path pointing to the tree / array that should be bound
	 * @param {object} [oContext=null] the context object for this binding (optional)
	 * @param {array} [aFilters=null] predefined filter/s contained in an array (optional)
	 * @param {object} [mParameters=null] additional model specific parameters (optional)
	 * @name sap.ui.model.xml.XMLTreeBinding
	 * @extends sap.ui.model.TreeBinding
	 */
	var XMLTreeBinding = ClientTreeBinding.extend("sap.ui.model.xml.XMLTreeBinding");
	
	/**
	 * Return node contexts for the tree
	 * @param {object} oContext to use for retrieving the node contexts
	 * @return {Array} the contexts array
	 * @protected
	 * @name sap.ui.model.xml.XMLTreeBinding#getNodeContexts
	 * @function
	 */
	XMLTreeBinding.prototype.getNodeContexts = function(oContext) {
		var sContextPath = oContext.getPath();
		
		if (!jQuery.sap.endsWith(sContextPath,"/")) {
			sContextPath = sContextPath + "/";
		}
		if (!jQuery.sap.startsWith(sContextPath,"/")) {
			sContextPath = "/" + sContextPath;
		}
	
		var aContexts = [],
			mNodeIndices = {},
			that = this,
			oNode = this.oModel._getObject(oContext.getPath()),
			oChild, sChildPath, oChildContext;
	
		jQuery.each(oNode[0].childNodes, function(sName, oChild) {
			if (oChild.nodeType == 1) { // check if node is an element
				if (mNodeIndices[oChild.nodeName] == undefined){
					mNodeIndices[oChild.nodeName] = 0;
				} else {
					mNodeIndices[oChild.nodeName]++;
				}
				sChildPath = sContextPath + oChild.nodeName + "/" + mNodeIndices[oChild.nodeName];
				oChildContext = that.oModel.getContext(sChildPath);
				// check if there is a filter on this level applied
				if (that.aFilters && !that.bIsFiltering){
					if (jQuery.inArray(oChildContext, that.filterInfo.aFilteredContexts) != -1) {
						aContexts.push(oChildContext);
					}
				}else {
					aContexts.push(oChildContext);
				}
			}
		});
	
		return aContexts;
	};

	return XMLTreeBinding;

}, /* bExport= */ true);
