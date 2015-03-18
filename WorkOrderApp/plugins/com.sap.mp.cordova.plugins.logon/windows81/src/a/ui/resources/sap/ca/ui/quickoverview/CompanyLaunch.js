/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.quickoverview.CompanyLaunch");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("sap.ca.ui.quickoverview.Quickoverview");sap.ui.base.Object.extend("sap.ca.ui.quickoverview.CompanyLaunch",{constructor:function(c){var u=sap.ca.ui.quickoverview.QuickviewUtils;var i=c.imgurl;if(!i){i="sap-icon://account"}var C={imgurl:i,companyname:u.getAttrValue(c.companyname,c.oModel),companyphone:u.getAttrValue(c.companyphone,c.oModel),companyaddress:u.getAttrValue(c.companyaddress,c.oModel),maincontactname:u.getAttrValue(c.maincontactname,c.oModel),maincontactmobile:u.getAttrValue(c.maincontactmobile,c.oModel),maincontactphone:u.getAttrValue(c.maincontactphone,c.oModel),maincontactemail:u.getAttrValue(c.maincontactemail,c.oModel),maincontactemailsubj:u.getAttrValue(c.maincontactemailsubj,c.oModel),};var o=new sap.ui.model.json.JSONModel(C);var q={popoverHeight:"34rem",title:u.getAttrValue(c.title,c.oModel),headerTitle:u.getAttrValue(c.companyname,c.oModel),headerSubTitle:u.getAttrValue(c.maincontactname,c.oModel),headerImgURL:i,subViewName:"sap.ca.ui.quickoverview.Company",oModel:o,beforeExtNav:c.beforeExtNav,};this.oQuickView=new sap.ca.ui.quickoverview.Quickoverview(q)},openBy:function(s,p){this.oQuickView.openBy(s);return},});
