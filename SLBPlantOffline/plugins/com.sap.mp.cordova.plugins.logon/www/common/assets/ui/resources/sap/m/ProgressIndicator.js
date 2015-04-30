/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.m.ProgressIndicator");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.ProgressIndicator",{metadata:{library:"sap.m",properties:{"visible":{type:"boolean",group:"Behavior",defaultValue:true},"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"state":{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:sap.ui.core.ValueState.None},"displayValue":{type:"string",group:"Appearance",defaultValue:'0%'},"percentValue":{type:"float",group:"Data",defaultValue:0},"showValue":{type:"boolean",group:"Appearance",defaultValue:true},"width":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:'100%'},"height":{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}}}});
sap.m.ProgressIndicator.prototype.onAfterRendering=function(){if(!!this.getHeight()){var l=this.$().height();this.$("textRight").css("line-height",l+"px");this.$("textLeft").css("line-height",l+"px")}};
sap.m.ProgressIndicator.prototype.setPercentValue=function(p){var t=this;if(typeof(p)=="number"){if(!((p>=0)&&(p<=100))){jQuery.sap.log.error(this+": percentValue ("+p+") is not correct! It has to be between 0-100.");return this}}if(t.getPercentValue()!=p){this.$().addClass("sapMPIAnimate");var a=Math.abs(t.getPercentValue()-p)*20;this.setProperty("percentValue",p,true);var b=this.$("bar");b.animate({width:p+"%"},a,"linear",function(){t._setText.apply(t);t.$().removeClass("sapMPIAnimate")})}return this};
sap.m.ProgressIndicator.prototype._setText=function(){this.$().toggleClass("sapMPIValueGreaterHalf",this.getPercentValue()>50);return this};
sap.m.ProgressIndicator.prototype.setDisplayValue=function(d){this.setProperty("displayValue",d,true);var $=this.$("textLeft");var a=this.$("textRight");$.text(d);a.text(d);return this};