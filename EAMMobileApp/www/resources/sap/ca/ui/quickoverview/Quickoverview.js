/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.quickoverview.Quickoverview");jQuery.sap.require("sap.ui.base.Object");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");sap.ca.ui.quickoverview.QuickviewUtils=(function(){var _="initstuff";return({getAttrValue:function(v,m){if(!v){return""}var b=v.indexOf('{');var B=v.indexOf('}');if(b>-1&&m){var p=v;p=p.substring(b+1);p=p.substring(0,B-1);p=p.replace(/\//g,".");var f=p.substring(0,1);if(f==="."){p=p.substring(1)}var P=m.getData()[p];return P}else{return v}}})}());sap.ca.ui.quickoverview.QuickviewBase=(function(){var _="qvPopover";var a="qvView";var b="qvBackBtn";var c="qvTitle";var d="qvNavCnt";var e=jQuery.sap.uid()+"-p1";var f="38rem";var g=null;var h=function(){return"sap.ca.ui.quickoverview.Quickview"};var s=function(){var B=sap.ui.getCore().byId(b);var N=sap.ui.getCore().byId(d);B.setVisible((N.getCurrentPage().sId!==N.getInitialPage()))};var j=function(q,C,Q,i){q.setModel(C.oModel);var p=q.getController();n(p,C,i);var r=p.configureView();k(C.title,Q,C.popoverHeight);var t=C.afterQvConfigured;if(typeof(t)=="function"){t(r.oQvView,r.oSubView)}};var k=function(t,p,H){if(!t){t=sap.ca.ui.utils.resourcebundle.getText("Quickoverview.popovertitle")}var T=sap.ui.getCore().byId(c);T.setText(t);p.setTitle(t);var i=H;if(!i){i=f}var P=sap.ui.getCore().byId(_);P.setContentHeight(i);p.qvHeight=i};var l=function(p){var t=sap.ui.getCore().byId(c);t.setText(p.getTitle())};var m=function(p){var P=sap.ui.getCore().byId(_);P.setContentHeight(p.qvHeight)};var n=function(C,i,q){var E="";C.viewConfig={};C.viewConfig.headerNoIcon=(i.headerNoIcon)?i.headerNoIcon:false;C.viewConfig.headerTitle=(i.headerTitle)?i.headerTitle:E;C.viewConfig.headerSubTitle=(i.headerSubTitle)?i.headerSubTitle:E;C.viewConfig.headerImgURL=(i.headerImgURL)?i.headerImgURL:E;C.viewConfig.subViewName=(i.subViewName)?i.subViewName:E;C.viewConfig.quickOverview=q;C.viewConfig.beforeExtNav=(i.beforeExtNav)?i.beforeExtNav:E;C.viewConfig.beforeExtNavSubHdr=(i.beforeExtNavSubHdr)?i.beforeExtNavSubHdr:E};var o=function(){var p=_;var P=sap.ui.getCore().byId(p);if(!P){var N=new sap.m.NavContainer(d,{initialPage:e,height:"100%",pages:[new sap.m.Page(e,{showHeader:false,enableScrolling:true,content:[new sap.ui.view({id:"qvView",viewName:"sap.ca.ui.quickoverview.Quickview",type:sap.ui.core.mvc.ViewType.XML})]})]});var A=function(D){var u;if(D.mParameters.isBack){u=D.mParameters.fromId;var v=this.getPage(u);if(v){v.destroy();this.removePage(u)}l(this.getPage(D.mParameters.toId));m(this.getPage(D.mParameters.toId))}else if(D.mParameters.isBackToTop){var w=this.getPages().length;for(var i=w-1;i>-1;i--){u=this.getPages()[i].sId;if(u!==this.getInitialPage()){this.getPage(u).destroy();this.removePage(u)}}}s()};N.attachAfterNavigate(A);var B=new sap.m.Button({id:b,icon:"sap-icon://nav-back",visible:false,tap:function(){var i=sap.ui.getCore().byId(d);i.back()}});var t=new sap.m.Label({id:c,visible:true});var C=new sap.m.Bar({translucent:false,contentLeft:B,contentMiddle:t});P=new sap.m.ResponsivePopover(p,{customHeader:C,showHeader:true,placement:sap.m.PlacementType.Right,verticalScrolling:false,contentWidth:"20em",contentHeight:f,content:N});var q=function(){var i=sap.ui.getCore().byId(d);i.backToTop();s()};P.attachAfterClose(q);var r=jQuery.sap.getModulePath("sap/ca/ui")+"/themes/base/QuickOverview.css";jQuery.sap.includeStyleSheet(r)}return P};return({initQVPopover:function(p){var P=o()},openQVPopover:function(S,C,L,q){var v=sap.ui.getCore().byId(a);var p=sap.ui.getCore().byId(e);j(v,C,p,q);try{var P=sap.ui.getCore().byId(_);if(!L){P.setOffsetX(0);P.setOffsetY(0);P.setPlacement(sap.m.PlacementType.Horizontal)}else{P.setOffsetX(L.offsetX);P.setOffsetY(L.offsetY);P.setPlacement(L.placement)}P.openBy(S)}catch(i){}},navQVPopover:function(C,q){var v=new sap.ui.view({viewName:"sap.ca.ui.quickoverview.Quickview",type:sap.ui.core.mvc.ViewType.XML});var p=new sap.m.Page({showHeader:false,enableScrolling:true,content:[v]});j(v,C,p,q);var i=sap.ui.getCore().byId(d);i.addPage(p);i.to(p.getId(),"show")},})}());sap.ui.base.Object.extend("sap.ca.ui.quickoverview.Quickoverview",{iControlType:0,oConfig:{},oParentCard:undefined,oSourceControl:undefined,constructor:function(c,a,p){if(!c)return;this.oInitialConfig=c;sap.ca.ui.quickoverview.QuickviewBase.initQVPopover(this.oParentCard)},openBy:function(s,l){if(!this.oInitialConfig)return;this.oSourceControl=s;sap.ca.ui.quickoverview.QuickviewBase.openQVPopover(s,this.oInitialConfig,l,this);return},navigateTo:function(c){sap.ca.ui.quickoverview.QuickviewBase.navQVPopover(c,this)},});
