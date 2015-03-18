/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.CustomerControlListItem");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.m.CustomListItem");sap.m.CustomListItem.extend("sap.ca.ui.CustomerControlListItem",{metadata:{deprecated:true,library:"sap.ca.ui",properties:{"showSalesArea":{type:"boolean",group:"Misc",defaultValue:false},"customerID":{type:"string",group:"Misc",defaultValue:'CustomerID'},"customerName":{type:"string",group:"Misc",defaultValue:'CustomerName'},"salesOrganizationName":{type:"string",group:"Misc",defaultValue:'SalesOrganizationName'},"distributionChannelName":{type:"string",group:"Misc",defaultValue:'DistributionChannelName'},"divisionName":{type:"string",group:"Misc",defaultValue:'DivisionName'}}}});
/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.CustomerControlListItem");jQuery.sap.require("sap.m.Label");jQuery.sap.require("sap.m.Text");jQuery.sap.require("sap.m.ObjectIdentifier");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");jQuery.sap.require("sap.ca.ui.model.format.FormattingLibrary");
sap.ca.ui.CustomerControlListItem.prototype._getFormattedObjectIdentifier=function(){var n=this.getCustomerName();var i=this.getCustomerID();var f;if(parseInt(i)!==0){f=sap.ca.ui.model.format.FormattingLibrary.commonIDFormatter(n,i)}else{f=n}return f};
sap.ca.ui.CustomerControlListItem.prototype.getContent=function(){if(typeof this._oContent==='undefined'){this._oContent=new sap.m.VBox();this._oContent.addStyleClass("sapCaUiCustomerContextListItem");this._oContent.addStyleClass("sapMListTblCell");var f=new sap.m.ObjectIdentifier({title:this._getFormattedObjectIdentifier()});this._oContent.addItem(f);if(this.getShowSalesArea()){var l=new sap.m.Label({text:sap.ca.ui.utils.resourcebundle.getText("CustomerContext.SalesArea")});var t=new sap.m.Text({text:this.getSalesOrganizationName()+", "+this.getDistributionChannelName()+", "+this.getDivisionName()});this._oContent.addItem(l);this._oContent.addItem(t)}}return[this._oContent]};
