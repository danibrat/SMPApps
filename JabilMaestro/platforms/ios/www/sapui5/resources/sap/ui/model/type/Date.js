/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/core/format/DateFormat','sap/ui/model/SimpleType'],function(q,D,S){"use strict";var a=S.extend("sap.ui.model.type.Date",{constructor:function(){S.apply(this,arguments);this.sName="Date"}});a.prototype.formatValue=function(v,i){switch(i){case"string":if(v==null){return""}if(this.oInputFormat){if(this.oFormatOptions.source.pattern=="timestamp"){if(typeof(v)!="number"){if(isNaN(v)){throw new sap.ui.model.FormatException("Cannot format date: "+v+" is not a valid Timestamp")}else{v=parseInt(v,10)}}v=new Date(v)}else{if(v==""){return""}v=this.oInputFormat.parse(v);if(v==null){throw new sap.ui.model.FormatException("Cannot format date: "+v+" has the wrong format")}}}return this.oOutputFormat.format(v);default:throw new sap.ui.model.FormatException("Don't know how to format Date to "+i)}};a.prototype.parseValue=function(v,i){var r;switch(i){case"string":if(v===""){return null}var r=this.oOutputFormat.parse(v);if(!r){throw new sap.ui.model.ParseException(v+" is not a valid Date value")}if(this.oInputFormat){if(this.oFormatOptions.source.pattern=="timestamp"){r=r.getTime()}else{r=this.oInputFormat.format(r)}}return r;default:throw new sap.ui.model.ParseException("Don't know how to parse Date from "+i)}};a.prototype.validateValue=function(v){if(this.oConstraints){var V=[],i=this.oInputFormat;if(i&&this.oFormatOptions.source.pattern!="timestamp"){v=i.parse(v)}q.each(this.oConstraints,function(n,c){if(i){c=i.parse(c)}switch(n){case"minimum":if(v<c){V.push("minimum")}break;case"maximum":if(v>c){V.push("maximum")}}});if(V.length>0){throw new sap.ui.model.ValidateException("Validation of type constraints failed",V)}}};a.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._handleLocalizationChange()};a.prototype.getOutputPattern=function(){return this.oOutputFormat.oFormatOptions.pattern};a.prototype._handleLocalizationChange=function(){this.oOutputFormat=D.getInstance(this.oFormatOptions);if(this.oFormatOptions.source){this.oInputFormat=D.getInstance(this.oFormatOptions.source)}};return a},true);
