/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.TabStripRenderer");
sap.ui.commons.TabStripRenderer=function(){};
sap.ui.commons.TabStripRenderer.render=function(r,c){var a=r;var b=sap.ui.getCore().getLibraryResourceBundle("sap.ui.commons");a.write("<div role='presentation'");a.addClass("sapUiTabStrip");a.addStyle("height",c.getHeight());a.addStyle("width",c.getWidth());a.writeClasses();a.writeStyles();a.writeControlData(c);a.write("><div class=\"sapUiTabBar\" tabIndex=\"0\"");if(c.getTooltip_AsString()){a.writeAttributeEscaped('title',c.getTooltip_AsString())}a.write("><div class=\"sapUiTabMenu\"></div><ul class=\"sapUiTabBarCnt\" role=\"tablist\">");var t=c.getTabs();var w=false;var s=c.getSelectedIndex();if(s<0){s=0;c.setProperty('selectedIndex',0,true)}var S=t[s];if(!S||!S.getVisible()||!S.getEnabled()){c._warningInvalidSelectedIndex(s,S);w=true}c.iVisibleTabs=0;for(var i=0;i<t.length;i++){var T=t[i];if(T.getVisible()===false){continue}c.iVisibleTabs++}var v=0;for(var i=0;i<t.length;i++){var T=t[i];if(T.getVisible()===false){continue}if(w&&T.getEnabled()){c.setProperty('selectedIndex',i,true);s=i;w=false}a.write("<li");if(T.getEnabled()==false){a.addClass("sapUiTabDsbl")}else if(i==s){a.addClass("sapUiTabSel")}else{a.addClass("sapUiTab")}if(i==s-1){a.addClass("sapUiTabBeforeSel")}else if(i==s+1){a.addClass("sapUiTabAfterSel")}a.writeControlData(T);a.writeAttribute("tabidx",i);v++;a.writeAttribute("tabindex","-1");a.writeAttribute("role","tab");a.writeAccessibilityState(T,{selected:i==s,controls:T.getId()+"-panel",disabled:!T.getEnabled(),posinset:v,setsize:c.iVisibleTabs});if(T.getClosable()){a.writeAccessibilityState(T,{describedby:T.getId()+"-close"})}if(v==c.iVisibleTabs){a.addClass("sapUiTabLast")}a.writeClasses();var o=T.getTitle();if(o&&o.getTooltip_AsString()){a.writeAttributeEscaped('title',o.getTooltip_AsString())}else if(T.getTooltip_AsString()){a.writeAttributeEscaped('title',T.getTooltip_AsString())}a.write(">");if(o){var I=o.getIcon();if(I){var C=[];var A={};C.push("sapUiTabIco");a.writeIcon(I,C,A)}a.writeEscaped(o.getText())}else{jQuery.sap.log.warning("No title configured for "+T+". Either set a string as 'text' property or a sap.ui.core.Title as 'title' aggregation.")}if(T.getClosable()){a.write("<button id='"+T.getId()+"-close' type=\"button\" tabindex= \"-1\" class=\"sapUiTabClose\" title=\""+b.getText("TAB_CLOSE_TEXT")+"\"></button>")}a.write("</li>")}a.write("</ul></div>");if(w){c.setProperty('selectedIndex',-1,true);s=-1;a.write("<div id=\""+c.getId()+"-panel"+"\" role=\"tabpanel\"");a.addClass("sapUiTabPanel");if(c.getHeight()){a.addClass("sapUiTabPanelHeight")}a.writeClasses();a.write("></div>")}else{for(var i=0;i<t.length;i++){var T=t[i];if(i!=s||T.getVisible()===false){continue}a.write("<div id=\""+T.getId()+"-panel"+"\" role=\"tabpanel\" aria-labelledby=\""+T.getId()+"\"");a.addClass("sapUiTabPanel");if(c.getHeight()){a.addClass("sapUiTabPanelHeight")}a.writeClasses();a.write(">");sap.ui.commons.TabStripRenderer.renderTabContents(a,T);a.write("</div>")}}a.write("</div>");c.invalidated=false};
sap.ui.commons.TabStripRenderer.renderTabContents=function(r,c){var C=c.getContent(),l=C.length;for(var i=0;i<l;i++){r.renderControl(C[i])}};
