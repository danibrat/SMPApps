/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.InPlaceEdit");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ca.ui.InPlaceEdit",{metadata:{publicMethods:["clearOldText"],library:"sap.ca.ui",properties:{"valueState":{type:"sap.ui.core.ValueState",group:"Data",defaultValue:sap.ui.core.ValueState.None},"undoEnabled":{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{"content":{type:"sap.ui.core.Control",multiple:false}},events:{"change":{}}}});sap.ca.ui.InPlaceEdit.M_EVENTS={'change':'change'};
/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.require("sap.m.Input");jQuery.sap.require("sap.m.Select");jQuery.sap.require("sap.m.Link");
sap.ca.ui.InPlaceEdit.prototype.init=function(){this._bEditMode=false};
sap.ca.ui.InPlaceEdit.prototype.exit=function(){this._bEditMode=undefined;this._oDisplayControl=undefined;this._oEditControl=undefined;this._sOldText=undefined;this._sOldTextAvailable=undefined;this._bUseEditButton=undefined;this._iHeight=undefined;if(this._oTextView){this._oTextView.destroy();delete this._oTextView}if(this._oTextField){this._oTextField.destroy();delete this._oTextField}if(this._oUndoButton){this._oUndoButton.destroy();delete this._oUndoButton}if(this._oEditButton){this._oEditButton.destroy();delete this._oEditButton}var c=this.getContent();if(c){c.detachEvent("_change",this._handleContentInvalidate,this);if(c instanceof sap.m.Input){c.detachEvent("change",this._handleContentChange,this);c.detachEvent("liveChange",this._handleContentLiveChange,this)}}};
sap.ca.ui.InPlaceEdit.prototype.onBeforeRendering=function(){if(!jQuery.device.is.desktop){this.$().off("focusout blur",jQuery.proxy(this.onfocusout,this))}this._updateControls();this._createUndoButton()};
sap.ca.ui.InPlaceEdit.prototype.onAfterRendering=function(){if(!jQuery.device.is.desktop){this.$().on("focusout blur",jQuery.proxy(this.onfocusout,this))}if(!this._bEditMode&&this.getEditable()&&this._oTextView&&jQuery.sap.domById(this._oTextView.getId())){jQuery.sap.byId(this._oTextView.getId()).attr("tabindex","0")}var c=jQuery.sap.byId(this.getId());if(this._bEditMode){jQuery.sap.byId(this._oEditControl.getId()).css("width","100%");if(this._iHeight>0){var o=c.height();var d=this._iHeight-o;var m=c.outerHeight(true)-c.outerHeight(false);d=d+m;var M=Math.floor(d/2);var i=d-M;c.css("margin-top",M+"px").css("margin-bottom",i+"px")}}else if(this._oDisplayControl instanceof sap.m.Link){jQuery.sap.byId(this._oDisplayControl.getId()).css("width","auto").css("max-width","100%")}else{var D=jQuery.sap.byId(this._oDisplayControl.getId());D.css("width","100%");if(!this._iHeight&&this._iHeight!=0){var I=D.outerHeight(true);var o=c.innerHeight();if(o<I){var O=c.outerHeight()-c.innerHeight();this._iHeight=I+O}else{this._iHeight=0}}if(this._iHeight>0){c.css("height",this._iHeight+"px")}}if(this._sOldTextAvailable&&this._oUndoButton&&jQuery.sap.domById(this._oUndoButton.getId())){jQuery.sap.byId(this._oUndoButton.getId()).attr("tabindex","-1")}if(this._oEditButton&&jQuery.sap.domById(this._oEditButton.getId())){jQuery.sap.byId(this._oEditButton.getId()).attr("tabindex","-1")}if(this._delayedCallId){jQuery.sap.clearDelayedCall(this._delayedCallId);this._delayedCallId=null}if(this.getValueState()==sap.ui.core.ValueState.Success){this._delayedCallId=jQuery.sap.delayedCall(3000,this,"removeValidVisualization")}};
sap.ca.ui.InPlaceEdit.prototype.removeValidVisualization=function(){var d=jQuery.sap.byId(this.getId());if(d){d.removeClass("sapCaUiIpeSucc")}};
sap.ca.ui.InPlaceEdit.prototype.clearOldText=function(){if(!this.getUndoEnabled()){return}if(this._bEditMode){this._sOldText=this._oEditControl.getValue();this._sOldTextAvailable=true}else{this._sOldText=undefined;this._sOldTextAvailable=false}this.rerender()};
sap.ca.ui.InPlaceEdit.prototype.getRequired=function(){if(this.getContent()&&this.getContent().getRequired){return this.getContent().getRequired()}else{return false}};
sap.ca.ui.InPlaceEdit.prototype.getEditable=function(){var c=this.getContent();if((c.getEditable&&!c.getEditable())||(c.getEnabled&&!c.getEnabled())){return false}else{return true}};
sap.ca.ui.InPlaceEdit.prototype.onsapescape=function(e){if(this.getUndoEnabled()){if(!!!sap.ui.Device.browser.firefox){this._undoTextChange()}else{this._bEsc=true}if(jQuery.sap.byId(this.getId()).hasClass("sapCaUiIpeUndo")){e.stopPropagation()}this._oEditControl._bEsc=undefined;this._oEditControl._sValue=undefined}};
sap.ca.ui.InPlaceEdit.prototype.onkeypress=function(e){if(this._bEsc){this._bEsc=undefined;this._undoTextChange()}};
sap.ca.ui.InPlaceEdit.prototype.onkeydown=function(e){if(e.keyCode==jQuery.sap.KeyCodes.F2&&!this._bEditMode){this._switchToEditMode();jQuery.sap.byId(this.getId()).addClass("sapCaUiIpeFocus")}};
sap.ca.ui.InPlaceEdit.prototype.ontap=function(e){if(!jQuery.device.is.desktop)this.onfocusin(e)};
sap.ca.ui.InPlaceEdit.prototype.onfocusin=function(e){if(!this._bEditMode){if(!this._bUseEditButton&&e.target.id!=this.getId()+"--X"){this._switchToEditMode()}jQuery.sap.byId(this.getId()).addClass("sapCaUiIpeFocus")}};
sap.ca.ui.InPlaceEdit.prototype.onfocusout=function(e){if(this._focusDelay){jQuery.sap.clearDelayedCall(this._focusDelay);this._focusDelay=null}this._focusDelay=jQuery.sap.delayedCall(200,this,"_handleFocusOut",arguments)};
sap.ca.ui.InPlaceEdit.prototype._handleFocusOut=function(e){var f=document.activeElement;if(!jQuery.sap.containsOrEquals(this.getDomRef(),f)){if(!this._bEditMode){jQuery.sap.byId(this.getId()).removeClass("sapCaUiIpeFocus")}this._switchToDisplayMode()}};
sap.ca.ui.InPlaceEdit.prototype.setContent=function(c){var o=this.getContent();if(o){o.detachEvent("_change",this._handleContentInvalidate,this);if(o instanceof sap.m.Input){o.detachEvent("change",this._handleContentChange,this);o.detachEvent("liveChange",this._handleContentLiveChange,this);o._propagateEsc=undefined}}this._sOldText=undefined;this._sOldTextAvailable=false;this._oDisplayControl=undefined;this._oEditControl=undefined;this.setAggregation("content",c);if(c){c.attachEvent("_change",this._handleContentInvalidate,this);if(c instanceof sap.m.Input){c.attachEvent("change",this._handleContentChange,this);c.attachEvent("liveChange",this._handleContentLiveChange,this);c._propagateEsc=true}}this._updateControls()};
sap.ca.ui.InPlaceEdit.prototype.setValueState=function(v){var c=this.getContent();if(c&&c.setValueState){c.setValueState(v)}else if(this._oEditControl&&this._oEditControl.setValueState){this._oEditControl.setValueState(v);this._handleContentInvalidate.call(this)}else{this.setProperty("valueState",v)}};
sap.ca.ui.InPlaceEdit.prototype.getValueState=function(){var c=this.getContent();if(c&&c.getValueState){return c.getValueState()}else if(this._oEditControl&&this._oEditControl.getValueState){return this._oEditControl.getValueState()}else{return this.getProperty("valueState")}};
sap.ca.ui.InPlaceEdit.prototype.setTooltip=function(t){var c=this.getContent();if(c){c.setTooltip(t)}else{if(t instanceof sap.ui.core.TooltipBase){t._currentControl=this;this.addDelegate(t)}this.setAggregation("tooltip",t)}return this};
sap.ca.ui.InPlaceEdit.prototype.getTooltip=function(){var c=this.getContent();if(c){return c.getTooltip()}else{return this.getAggregation("tooltip")}};
sap.ca.ui.InPlaceEdit.prototype.clone=function(){var c=this.getContent();if(c){c.detachEvent("_change",this._handleContentInvalidate,this);if(c instanceof sap.m.Input){c.detachEvent("change",this._handleContentChange,this);c.detachEvent("liveChange",this._handleContentLiveChange,this)}}var C=sap.ui.core.Control.prototype.clone.apply(this,arguments);if(c){c.attachEvent("_change",this._handleContentInvalidate,this);if(c instanceof sap.m.Input){c.attachEvent("change",this._handleContentChange,this);c.attachEvent("liveChange",this._handleContentLiveChange,this)}}return C};
sap.ca.ui.InPlaceEdit.prototype.getFocusDomRef=function(){if(!this.getDomRef()){return}if(this._bEditMode){return this._oEditControl.getFocusDomRef()}else{return this._oDisplayControl.getFocusDomRef()}};
sap.ca.ui.InPlaceEdit.prototype.getIdForLabel=function(){if(this._oDisplayControl){return this._oDisplayControl.getId()}else if(this._oEditControl){return this._oEditControl.getId()}else{return this.getId()}};
sap.ca.ui.InPlaceEdit.prototype._contentDelegate={onAfterRendering:function(){this.onAfterRendering()}};
sap.ca.ui.InPlaceEdit.prototype._updateControls=function(){var i=this;var c=i.getContent();if(!c){return}switch(c.getMetadata().getName()){case"sap.m.Input":case"sap.m.Select":if(!i._oTextView){i._oTextView=new sap.m.Text(i.getId()+"--TV",{wrapping:false});i._oTextView.setParent(i);i._oTextView.removeDelegate(this._contentDelegate);i._oTextView.addDelegate(this._contentDelegate,i)}i._oTextView.setText(c.getValue());i._oTextView.setVisible(c.getVisible());i._oTextView.setWidth("100%");i._oDisplayControl=i._oTextView;i._oEditControl=c;i._bUseEditButton=false;break;case"sap.m.Link":i._oDisplayControl=c;i._oDisplayControl.removeDelegate(this._contentDelegate);i._oDisplayControl.addDelegate(this._contentDelegate,i);if(i._oTextField){i._oTextField.setValue(c.getText());i._oTextField.setWidth("100%");i._oTextField.setTooltip(c.getTooltip());i._oEditControl=i._oTextField}this._createEditButton();i._bUseEditButton=true;break;default:throw new Error("Control '"+c.getMetadata().getName()+"' not supported for InPlaceEdit");break}};
sap.ca.ui.InPlaceEdit.prototype._switchToEditMode=function(){var i=this;if(!i._bEditMode&&i.getEditable()){if(!i._oEditControl&&i.getContent().getMetadata().getName()=="sap.m.Link"){var v=i.getValueState();i._oTextField=new sap.m.Input(i.getId()+"--input",{valueState:v});i._oTextField.attachEvent('change',this._handleTextFieldChange,i);i._oTextField.attachEvent('liveChange',this._handleContentLiveChange,i);i._oTextField._propagateEsc=true}if(!i._sOldTextAvailable&&i.getUndoEnabled()){i._sOldText=this._getContentText();i._sOldTextAvailable=true}i._bEditMode=true;i.rerender();i._oEditControl.focus()}};
sap.ca.ui.InPlaceEdit.prototype._switchToDisplayMode=function(){var i=this;if(i._bEditMode&&i.getEditable()){i._bEditMode=false;if(i._sOldText==this._getContentText()){i._sOldText=undefined;i._sOldTextAvailable=false}i.rerender()}};
sap.ca.ui.InPlaceEdit.prototype._getContentText=function(){var i=this;var c=i.getContent();if(!c){return}if(c.getValue){return c.getValue()}else if(c.getText){return c.getText()}};
sap.ca.ui.InPlaceEdit.prototype._createUndoButton=function(){var i=this;if(!i._oUndoButton&&i.getUndoEnabled()){i._oUndoButton=new sap.m.Button(i.getId()+"--X",{icon:"sap-icon://undo",type:sap.m.ButtonType.Transparent}).setParent(i);i._oUndoButton.attachEvent('press',this._handleUndoButtonPress,this)}};
sap.ca.ui.InPlaceEdit.prototype._handleUndoButtonPress=function(e){this._undoTextChange();if(this._bEditMode){this._oEditControl.focus();jQuery.sap.byId(this.getId()).removeClass("sapCaUiIpeUndo")}};
sap.ca.ui.InPlaceEdit.prototype._undoTextChange=function(){var i=this;if(i.getUndoEnabled()&&i._sOldTextAvailable){var c=i.getContent();if(!c){return}if(c.setValue){c.setValue(i._sOldText)}else if(c.setText){c.setText(i._sOldText)}if(i._bEditMode){i._oEditControl.setValue(i._sOldText)}if(c.fireChange){c.fireChange({newValue:i._sOldText})}else{i.fireChange({newValue:i._sOldText})}if(!i._bEditMode){i._sOldText=undefined;i._sOldTextAvailable=false}}};
sap.ca.ui.InPlaceEdit.prototype._createEditButton=function(){var i=this;if(!i._oEditButton){i._oEditButton=new sap.m.Button(i.getId()+"--Edit",{icon:"sap-icon://edit",type:sap.m.ButtonType.Transparent}).setParent(i);i._oEditButton.addStyleClass("sapCaUiIpeEBtn");i._oEditButton.attachEvent('press',this._handleEditButtonPress,i)}};
sap.ca.ui.InPlaceEdit.prototype._handleEditButtonPress=function(e){this._switchToEditMode();jQuery.sap.byId(this.getId()).addClass("sapCaUiIpeFocus")};
sap.ca.ui.InPlaceEdit.prototype._handleTextFieldChange=function(e){var c=this.getContent();if(c.setText){var n=e.getParameter("newValue");c.setText(n);this.fireChange({newValue:n})}};
sap.ca.ui.InPlaceEdit.prototype._handleContentChange=function(e){if(this._sOldText!=e.getParameter("newValue")&&this.getUndoEnabled()){jQuery.sap.byId(this.getId()).addClass("sapCaUiIpeUndo")}else{jQuery.sap.byId(this.getId()).removeClass("sapCaUiIpeUndo")}this.fireChange(e.getParameters())};
sap.ca.ui.InPlaceEdit.prototype._handleContentLiveChange=function(e){if(this._sOldText!=e.getParameter("liveValue")&&this.getUndoEnabled()){jQuery.sap.byId(this.getId()).addClass("sapCaUiIpeUndo")}else{jQuery.sap.byId(this.getId()).removeClass("sapCaUiIpeUndo")}};
sap.ca.ui.InPlaceEdit.prototype._handleContentInvalidate=function(){if(!this._bEditMode){this.invalidate()}else{switch(this.getValueState()){case(sap.ui.core.ValueState.Error):if(!jQuery.sap.byId(this.getId()).hasClass('sapUiIpeErr')){jQuery.sap.byId(this.getId()).addClass('sapUiIpeErr');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeWarn');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeSucc')}break;case(sap.ui.core.ValueState.Success):if(!jQuery.sap.byId(this.getId()).hasClass('sapUiIpeSucc')){jQuery.sap.byId(this.getId()).addClass('sapUiIpeSucc');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeErr');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeWarn')}break;case(sap.ui.core.ValueState.Warning):if(!jQuery.sap.byId(this.getId()).hasClass('sapUiIpeWarn')){jQuery.sap.byId(this.getId()).addClass('sapUiIpeWarn');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeErr');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeSucc')}break;default:jQuery.sap.byId(this.getId()).removeClass('sapUiIpeWarn');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeErr');jQuery.sap.byId(this.getId()).removeClass('sapUiIpeSucc');break}}};
