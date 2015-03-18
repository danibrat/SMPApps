/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ui.unified.ContentSwitcher");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.ContentSwitcher",{metadata:{deprecated:true,library:"sap.ui.unified",properties:{"animation":{type:"string",group:"Appearance",defaultValue:'None'},"activeContent":{type:"int",group:"Behavior",defaultValue:1}},aggregations:{"content1":{type:"sap.ui.core.Control",multiple:true,singularName:"content1"},"content2":{type:"sap.ui.core.Control",multiple:true,singularName:"content2"}}}});(function(w,u){sap.ui.unified.ContentSwitcher.prototype.init=function(){};sap.ui.unified.ContentSwitcher.prototype.switchContent=function(){this.setActiveContent(this.getActiveContent()==1?2:1);return this};sap.ui.unified.ContentSwitcher.prototype.onAfterRendering=function(){this._$Contents=[this.$("content1"),this.$("content2")]};sap.ui.unified.ContentSwitcher.prototype._showActiveContent=function(n){this._$Contents[0].toggleClass("sapUiUfdCSwitcherVisible",n===1);this._$Contents[1].toggleClass("sapUiUfdCSwitcherVisible",n===2)};sap.ui.unified.ContentSwitcher.prototype.setActiveContent=function(n){n=parseInt(n);if(isNaN(n)||n<1){n=1;jQuery.sap.log.warning("setActiveContent argument must be either 1 or 2. Active content set to 1.")}else if(n>2){n=2;jQuery.sap.log.warning("setActiveContent argument must be either 1 or 2. Active content set to 2.")}this.setProperty("activeContent",n,true);this._showActiveContent(n);return this};sap.ui.unified.ContentSwitcher.prototype.setAnimation=function(a,s){if(typeof(a)!=="string"){a=sap.ui.unified.ContentSwitcherAnimation.None;jQuery.sap.log.warning("setAnimation argument must be a string. Animation was set to \""+sap.ui.unified.ContentSwitcherAnimation.None+"\".")}a=a.replace(/[^a-zA-Z0-9]/g,"");var c=this.getProperty("animation");if(a===c){return}var d=this.$();if(d[0]){d.toggleClass("sapUiUfdCSwitcherAnimation"+c,false);d.toggleClass("sapUiUfdCSwitcherAnimation"+a,true)}this.setProperty("animation",a,s);return this}})(window);
