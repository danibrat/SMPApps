/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.utils.Lessifier");sap.ca.ui.utils.Lessifier={};
sap.ca.ui.utils.Lessifier.lessifyCSS=function(m,c,t){if(t){jQuery.sap.require("sap.ui.thirdparty.less")}if(m==null||m.length==0||c==null||c.length==0){jQuery.sap.log.error("When trying to lessify a css make sure both the module name and the css file path are specified.");return}var M=jQuery.sap.getModulePath(m);if(M==null){jQuery.sap.log.error("The module "+m+" has never been registered for a specific path.");return}if(jQuery("#"+m+"-less-css").length!=0){jQuery.sap.log.warning("The css for module "+m+" has already been processed.");return}var C=M+c;if(!jQuery.sap.startsWith(c,"/")&&!jQuery.sap.endsWith(M,"/")){C=M+"/"+c}var s=jQuery.ajax({url:C,async:false}).responseText;if(s!=null&&s.length!=0){var l=s.replace(/@([\w]+)/g,function(a,b){var p=sap.ui.core.theming.Parameters.get(b);if(p==null){p="@"+b}return p});var h=false;if(t){new(less.Parser)().parse(l,function(e,a){if(e!=null){h=true;jQuery.sap.log.error("The css for module "+m+" cannot be parsed by less.js : "+e.message)}else{l=a.toCSS({})}})}jQuery("head").append("<style id='"+m+"-less-css'>"+l+"</style>");jQuery.sap.log.info("The css for module "+m+" has been processed correctly.")}};
