/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2015 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var r={};var C=E.extend("sap.ui.core.mvc.Controller",{constructor:function(n){var t=null;if(typeof(n)=="string"){if(!r[n]){q.sap.require({modName:n,type:"controller"});if(!r[n]){throw new Error("Controller type "+n+" is still undefined after trying to load it.")}}t=r[n]}E.apply(this,arguments);if(t){q.extend(this,r[n])}}});var c={"onInit":true,"onExit":false,"onBeforeRendering":false,"onAfterRendering":true};function e(o,n){var a;if(sap.ui.core.CustomizingConfiguration){var b=sap.ui.core.CustomizingConfiguration.getControllerExtension(n);if(b){var s=b.controllerName;q.sap.log.info("Customizing: Controller '"+n+"' is now extended by '"+s+"'");if(!r[s]&&!q.sap.getObject(s)){q.sap.require({modName:s,type:"controller"})}if(!r[s]&&!q.sap.getObject(s)){q.sap.log.error("Attempt to load Extension Controller "+s+" was not successful - is the Controller correctly defined in its file?")}if((a=r[s])!==undefined){for(var m in a){if(c[m]!==undefined){var O=o[m];if(O&&typeof O==="function"){(function(m,O){o[m]=function(){if(c[m]){O.apply(o,arguments);a[m].apply(o,arguments)}else{a[m].apply(o,arguments);O.apply(o,arguments)}}})(m,O)}else{o[m]=a[m]}}else{o[m]=a[m]}}return o}}else{q.sap.log.debug("Customizing: no Controller extension found for Controller '"+n+"'.")}}return o}sap.ui.controller=function(n,o){if(!n){throw new Error("Controller name ('sName' parameter) is required")}if(!o){if(!r[n]&&!q.sap.getObject(n)){q.sap.require({modName:n,type:"controller"})}if(r[n]){var a=new C(n);a=e(a,n);return a}else{var b=q.sap.getObject(n);if(typeof b==="function"&&b.prototype instanceof C){var a=new b();a=e(a,n);return a}}throw new Error("Controller "+n+" couldn't be instantiated")}else{r[n]=o}};C.prototype.getView=function(){return this.oView};C.prototype.byId=function(i){return this.oView?this.oView.byId(i):undefined};C.prototype.createId=function(i){return this.oView?this.oView.createId(i):undefined};C.prototype.getOwnerComponent=function(){q.sap.require("sap.ui.core.Component");return sap.ui.core.Component.getOwnerComponentFor(this.getView())};C.prototype.connectToView=function(v){this.oView=v;if(this.onInit){v.attachAfterInit(this.onInit,this)}if(this.onExit){v.attachBeforeExit(this.onExit,this)}if(this.onAfterRendering){v.attachAfterRendering(this.onAfterRendering,this)}if(this.onBeforeRendering){v.attachBeforeRendering(this.onBeforeRendering,this)}};return C},true);
