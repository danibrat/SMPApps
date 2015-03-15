/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.TextArea");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.commons.TextField");sap.ui.commons.TextField.extend("sap.ui.commons.TextArea",{metadata:{library:"sap.ui.commons",properties:{"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},"cols":{type:"int",group:"Dimension",defaultValue:null},"rows":{type:"int",group:"Dimension",defaultValue:null},"wrapping":{type:"sap.ui.core.Wrapping",group:"Appearance",defaultValue:null},"cursorPos":{type:"int",group:"Appearance",defaultValue:null},"explanation":{type:"string",group:"Misc",defaultValue:null},"labeledBy":{type:"string",group:"Identification",defaultValue:null,deprecated:true}}}});
sap.ui.commons.TextArea.prototype.exit=function(){this._detachEventHandler()};
sap.ui.commons.TextArea.prototype.onBeforeRendering=function(){this._detachEventHandler()};
sap.ui.commons.TextArea.prototype.onAfterRendering=function(){this._attachEventHandler()};
sap.ui.commons.TextArea.prototype._attachEventHandler=function(){var $=this.$();this.pasteHandlerId=$.bind('paste',jQuery.proxy(this.handlePaste,this));this.inputHandlerId=$.bind('input',jQuery.proxy(this.handleInput,this));this.proChHandlerId=$.bind('propertychange',jQuery.proxy(this.handleInput,this))};
sap.ui.commons.TextArea.prototype._detachEventHandler=function(){var $=this.$();if(this.pasteHandlerId){$.unbind('paste',this.handlePaste);this.pasteHandlerId=null}if(this.inputHandlerId){$.unbind('input',this.handlePaste);this.inputHandlerId=null}if(this.proChHandlerId){$.unbind('propertychange',this.handlePaste);this.proChHandlerId=null}};
sap.ui.commons.TextArea.prototype.onfocusin=function(e){sap.ui.commons.TextField.prototype.onfocusin.apply(this,arguments);var f=this.getFocusDomRef();this.bFocus=true;e.preventDefault()};
sap.ui.commons.TextArea.prototype.onsapfocusleave=function(e){sap.ui.commons.TextField.prototype.onsapfocusleave.apply(this,arguments);var f=this.getFocusDomRef();if(f&&!!sap.ui.Device.browser.firefox){if(f.selectionStart!=f.selectionEnd){jQuery(f).selectText(f.selectionStart,f.selectionStart)}}this.bFocus=false;e.preventDefault();e.stopPropagation()};
sap.ui.commons.TextArea.prototype.getFocusInfo=function(){return{id:this.getId(),cursorPos:this.getCursorPos()}};
sap.ui.commons.TextArea.prototype.applyFocusInfo=function(f){this.focus();var F=this.getFocusDomRef();jQuery(F).cursorPos(this.getCursorPos())};
sap.ui.commons.TextArea.prototype.onkeypress=function(e){sap.ui.commons.TextField.prototype.onkeypress.apply(this,arguments);if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var k=jQuery.sap.KeyCodes;var K=e.which||e.keyCode;var d=this.getDomRef();if(document.selection){var s=document.selection.createRange();if(s.text.length>0){return}}else{if(d.selectionStart!=d.selectionEnd){return}}if(d.value.length>=this.getMaxLength()&&(K>k.DELETE||K==k.ENTER||K==k.SPACE)&&!e.ctrlKey){e.preventDefault();e.stopPropagation()}};
sap.ui.commons.TextArea.prototype.onkeyup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',jQuery(d).cursorPos(),true);sap.ui.commons.TextField.prototype.onkeyup.apply(this,arguments)};
sap.ui.commons.TextArea.prototype.onsapenter=function(e){e.stopPropagation()};
sap.ui.commons.TextArea.prototype.onmouseup=function(e){var d=this.getDomRef();this.setProperty('cursorPos',jQuery(d).cursorPos(),true)};
sap.ui.commons.TextArea.prototype.handlePaste=function(e){if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var d=this.getDomRef();if(d.value.length>=this.getMaxLength()&&d.selectionStart==d.selectionEnd){e.preventDefault();e.stopPropagation()}};
sap.ui.commons.TextArea.prototype.handleInput=function(e){if(e.originalEvent.propertyName&&e.originalEvent.propertyName.toLowerCase()!="value"){return}if(!this.getEditable()||!this.getEnabled()||this.getMaxLength()<=0){return}var d=this.getDomRef();if(d.value.length>this.getMaxLength()){d.value=d.value.substring(0,this.getMaxLength())}};
sap.ui.commons.TextArea.prototype.setMaxLength=function(m){this.setProperty('maxLength',m,true);var d=this.getDomRef();if(d&&d.value.length>m&&m>0){d.value=d.value.substring(0,m)}var v=this.getValue();if(v.length>m&&m>0){this.setProperty('value',v.substring(0,m))}return this};
sap.ui.commons.TextArea.prototype.setCursorPos=function(c){this.setProperty('cursorPos',c,true);if(this.bFocus){jQuery(this.getDomRef()).cursorPos(c)}return this};
