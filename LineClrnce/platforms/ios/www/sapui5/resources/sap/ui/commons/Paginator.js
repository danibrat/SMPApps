/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP SE or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.ui.commons.Paginator");jQuery.sap.require("sap.ui.commons.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.commons.Paginator",{metadata:{library:"sap.ui.commons",properties:{"currentPage":{type:"int",group:"Misc",defaultValue:1},"numberOfPages":{type:"int",group:"Misc",defaultValue:null}},events:{"page":{}}}});sap.ui.commons.Paginator.M_EVENTS={'page':'page'};sap.ui.commons.Paginator.MAX_NUMBER_PAGES=5;
sap.ui.commons.Paginator.prototype.init=function(){this.bShowAnimation=true};
sap.ui.commons.Paginator.prototype.onclick=function(e){if(e&&e.target){e.preventDefault();var t=e.target;if(!t.id){t=t.parentNode}if(t.id&&t.id!=this.getId()+"-pages"){var a=t.id.split("--");if(a.length>1){var l=a[a.length-1];var E=null;var s=this.getCurrentPage();var T=s;if(l.match(/^\d+$/)){E=sap.ui.commons.PaginatorEvent.Goto;T=parseInt(l,10)}else if(l=="firstPageLink"){E=sap.ui.commons.PaginatorEvent.First;T=1}else if(l=="backLink"){E=sap.ui.commons.PaginatorEvent.Previous;T=Math.max(s-1,1)}else if(l=="forwardLink"){E=sap.ui.commons.PaginatorEvent.Next;T=Math.min(s+1,this.getNumberOfPages())}else if(l=="lastPageLink"){E=sap.ui.commons.PaginatorEvent.Last;T=this.getNumberOfPages()}else{}if(T!=s){if(this.bShowAnimation){this.setCurrentPage(T,true);this.triggerPaginatorAnimation()}else{this.setCurrentPage(T)}this.firePage({srcPage:s,targetPage:T,type:E})}}}}};
sap.ui.commons.Paginator.prototype.setCurrentPage=function(t,s){this.setProperty("currentPage",t,s);if(this.getDomRef()){sap.ui.commons.PaginatorRenderer.updateBackAndForward(this)}};
sap.ui.commons.Paginator.prototype.triggerPaginatorAnimation=function(){var I=[];var a=[];var p=this.getId();var c=jQuery.sap.byId(p+"-pages").children();var n=this._calculatePagesRange();var o;if(this._oOldRange){o=this._oOldRange}else{o={};var P=c[0].id.split("--");o.firstPage=parseInt(P[P.length-1],10);P=c[c.length-1].id.split("--");o.lastPage=parseInt(P[P.length-1],10)}for(var i=n.firstPage;i<=n.lastPage;i++){if(i<o.firstPage||i>o.lastPage){a.push(i)}}var b={firstPage:a[0],lastPage:a[a.length-1]};for(var i=o.firstPage;i<=o.lastPage;i++){if(i<n.firstPage||i>n.lastPage){I.push(i)}}var d=sap.ui.commons.PaginatorRenderer.getPagesHtml(this.getId(),o,this.getCurrentPage(),true);var e=sap.ui.commons.PaginatorRenderer.getPagesHtml(this.getId(),b,this.getCurrentPage(),false);if(o.firstPage<b.firstPage){e=d+e}else{e=e+d}var f=document.activeElement;var g=f?f.id:undefined;this.getDomRef("pages").innerHTML=e;if(g){f=jQuery.sap.domById(g)}else{f=jQuery.sap.domById("testPaginator-a--"+this.getCurrentPage())}jQuery.sap.focus(f);var h=this.getId()+"-li--";this._oOldRange=n;for(var i=0;i<I.length;i++){var j=h+I[i];jQuery.sap.byId(j).hide(400,function(){var j=this.id;var k=jQuery.sap.domById(j);if(k){k.parentNode.removeChild(k)}})}for(var i=0;i<a.length;i++){jQuery.sap.byId(h+a[i]).show(400)}};
sap.ui.commons.Paginator.prototype._calculatePagesRange=function(){var f=1;var l=this.getNumberOfPages();var c=this.getCurrentPage();var n=this.getNumberOfPages();if(c<4){f=1;if(l>sap.ui.commons.Paginator.MAX_NUMBER_PAGES){l=sap.ui.commons.Paginator.MAX_NUMBER_PAGES}}else{if(c==l){if(n<5){f=1}else{f=l-4}}else if(l-c<3){f=l-4}else{f=c-2;l=c+2}}return{firstPage:f,lastPage:l}};
sap.ui.commons.Paginator.prototype.onkeydown=function(e){var E=e.getPseudoTypes();if(jQuery.inArray("saptabnext",E)!=-1){this.triggerTabbingNavigation(e,false)}else if(jQuery.inArray("saptabprevious",E)!=-1){this.triggerTabbingNavigation(e,true)}else if(jQuery.inArray("sapincrease",E)!=-1){this.triggerInternalNavigation(e,"next")}else if(jQuery.inArray("sapdecrease",E)!=-1){this.triggerInternalNavigation(e,"previous")}};
sap.ui.commons.Paginator.prototype.triggerInternalNavigation=function(e,d){var f=jQuery(this.getDomRef()).find(":sapFocusable");var c=jQuery(f).index(e.target);if(d=="next"){var n=c+1;if(jQuery(e.target).hasClass("sapUiPagCurrentPage")){n=n+1}var N=f[n];if(N){jQuery(N).focus();e.preventDefault();e.stopPropagation()}}else if(d=="previous"&&f[c-1]){var n=c-1;var N=f[n];if(N&&jQuery(N).hasClass("sapUiPagCurrentPage")){N=f[n-1]}if(N){jQuery(N).focus();e.preventDefault();e.stopPropagation()}}};
sap.ui.commons.Paginator.prototype.triggerTabbingNavigation=function(e,s){var f=jQuery(this.getDomRef()).find(":sapFocusable");if(!s){jQuery(f[f.length-1]).focus()}else{var c=jQuery(f).index(e.target);if(c!=0){jQuery(f[0]).focus()}}};
sap.ui.commons.Paginator.prototype.getFocusInfo=function(){var i=this.$().find(":focus").attr("id");if(i){return{customId:i}}else{return sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments)}};
sap.ui.commons.Paginator.prototype.applyFocusInfo=function(f){if(f&&f.customId){this.$().find("#"+f.customId).focus()}else{sap.ui.core.Element.prototype.getFocusInfo.apply(this,arguments)}return this};
