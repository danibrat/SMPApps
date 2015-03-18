/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.model.format.FileSizeFormat");jQuery.sap.require("sap.ui.core.LocaleData");jQuery.sap.require("sap.ca.ui.model.format.FormatHelper");jQuery.sap.require("sap.ca.ui.model.format.NumberFormat");jQuery.sap.require("sap.ca.ui.utils.resourcebundle");
sap.ca.ui.model.format.FileSizeFormat=function(){throw new Error()};
sap.ca.ui.model.format.FileSizeFormat.oValueInfo={oDefaultFormatOptions:{style:"short",shortDecimals:function(v){return(Math.abs(v)<10?1:0)}}};
sap.ca.ui.model.format.FileSizeFormat.getInstance=function(f,l){return this.createInstance(f,l,this.oValueInfo)};
sap.ca.ui.model.format.FileSizeFormat.createInstance=function(f,l,i){var F=jQuery.sap.newObject(this.prototype);if(f instanceof sap.ui.core.Locale){l=f;f=undefined}if(!l){l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}F.oLocale=l;F.oLocaleData=sap.ui.core.LocaleData.getInstance(l);F.oFormatOptions=jQuery.extend(false,{},i.oDefaultFormatOptions,f);F.init();return F};
sap.ca.ui.model.format.FileSizeFormat.prototype.init=function(){};
sap.ca.ui.model.format.FileSizeFormat.prototype.format=function(v){var n=sap.ca.ui.model.format.FormatHelper.toNumeric(v);if(!isFinite(n)){return""}var f=sap.ca.ui.model.format.FormatHelper.getFormatOptions(this.oFormatOptions);var r="";if(isFinite(n)){n=n.toFixed(0);var m=sap.ca.ui.model.format.FormatHelper.getMagnitude(n);if(m.value==1){if(Math.abs(n)<2){r=n+"\u00A0"+sap.ca.ui.utils.resourcebundle.getText("FileSize.Byte")}else{r=n+"\u00A0"+sap.ca.ui.utils.resourcebundle.getText("FileSize.Bytes")}}else{f.formatStyle="short";var a=sap.ca.ui.model.format.FormatHelper.roundNumber(n/m.value,f);if((m.value<1e24)&&(Math.abs(a)>=1000)){m=sap.ca.ui.model.format.FormatHelper.getMagnitude(a*m.value);a=sap.ca.ui.model.format.FormatHelper.roundNumber(n/m.value,f)}r=sap.ca.ui.model.format.FormatHelper.formatNumber(a,f);r+="\u00A0"+sap.ca.ui.utils.resourcebundle.getText("FileSize."+m.suffix+"bytes")}}return r};
sap.ca.ui.model.format.FileSizeFormat.prototype.parse=function(v){var f=sap.ca.ui.model.format.NumberFormat.getInstance(this.oFormatOptions,this.oLocale);return f.parse(v)};
