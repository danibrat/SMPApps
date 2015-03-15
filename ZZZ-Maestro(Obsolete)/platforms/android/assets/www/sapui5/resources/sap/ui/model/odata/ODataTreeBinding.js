/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','sap/ui/model/TreeBinding'],function(q,T){"use strict";var O=T.extend("sap.ui.model.odata.ODataTreeBinding",{constructor:function(m,p,c,f,P){T.apply(this,arguments);this.bPendingRequest=false;this.oFinalLengths={};this.oLengths={};this.oKeys={};this.bNeedsUpdate=false;if(!P||!P.navigation){q.sap.log.error("A navigation paths parameter object has to be defined");this.oNavigationPaths={}}else{this.oNavigationPaths=P.navigation}}});O.prototype.getRootContexts=function(){var n=this._getNavPath(this.sPath),a=this.oModel.resolve(this.sPath,this.getContext()),t=this,c;if(!a){return[]}if(!this.oModel.isList(this.sPath,this.getContext())){if(this.bDisplayRootNode){this.oModel.createBindingContext(a,null,{expand:n},function(N){c=N;if(t.oRootContext!==N){t.oRootContext=N;t.bNeedsUpdate=true}else{var d=t.oModel.oData[c.getPath().substr(1)];t._processODataObject(d,c.getPath(),n)}},false);if(c){return[c]}else{return[]}}else{c=this.oModel.getContext(this.sPath);return this.getNodeContexts(c)}}else{return this._getContextsForPath(a,n)}};O.prototype.getNodeContexts=function(c){var n=this._getNavPath(c.getPath()),a;if(!n){return[]}a=this.oModel.resolve(n,c);n=this.oNavigationPaths[n];return this._getContextsForPath(a,n)};O.prototype.hasChildren=function(c){return c&&this.oLengths[c.getPath()]>0};O.prototype._getContextsForPath=function(a,n){var c=[],l=this.oModel.iSizeLimit,L,k;if(this.oFinalLengths&&this.oFinalLengths[a]&&this.oLengths[a]<l){l=this.oLengths[a]}if(this.oKeys[a]){for(var i=0;i<l;i++){k=this.oKeys[a][i];if(!k){break}c.push(this.oModel.getContext('/'+k))}}L=c.length!=l&&!(this.oFinalLengths[a]&&c.length>=this.oLengths[a]);if(this.oModel.getServiceMetadata()){if(!this.bPendingRequest&&L){this.loadSubNodes(a,n)}}return c};O.prototype.loadSubNodes=function(a,n){var t=this,p=[];if(n){p.push("$expand="+n)}function s(d){t.oLengths[a]=d.results.length;t.oFinalLengths[a]=true;t.oKeys[a]=[];for(var i=0;i<d.results.length;i++){var E=d.results[i];t._processODataObject(E,a,n);t.oKeys[a].push(t.oModel._getKey(E))}t.oRequestHandle=null;t.bPendingRequest=false;t.bNeedsUpdate=true}function c(){t.fireDataReceived()}function e(d){t.oRequestHandle=null;t.bPendingRequest=false;t.fireDataReceived()}function u(h){t.oRequestHandle=h}if(a){if(!this.oFinalLengths[a]){this.bPendingRequest=true;this.fireDataRequested();this.oModel._loadData(a,p,s,e,false,u,c)}}};O.prototype.resetData=function(c){if(c){var p=c.getPath();delete this.oKeys[p];delete this.oLengths[p];delete this.oFinalLengths[p]}else{this.oKeys={};this.oLengths={};this.oFinalLengths={}}};O.prototype.refresh=function(f,c,e){var C=false;if(!f){if(e){var r=this.oModel.resolve(this.sPath,this.oContext);var E=this.oModel.oMetadata._getEntityTypeByPath(r);if(E&&(E.entityType in e)){C=true}}if(c&&!C){q.each(this.oKeys,function(i,n){q.each(n,function(i,k){if(k in c){C=true;return false}});if(C)return false})}if(!c&&!e){C=true}}if(f||C){this.resetData();this.bNeedsUpdate=false;this._fireChange()}};O.prototype.filter=function(f){q.sap.log.warning("Filtering is currently not possible in the ODataTreeBinding");return this};O.prototype.checkUpdate=function(f,c){var C=false;if(!f){if(this.bNeedsUpdate||!c){C=true}else{q.each(this.oKeys,function(i,n){q.each(n,function(i,k){if(k in c){C=true;return false}});if(C)return false})}}if(f||C){this.bNeedsUpdate=false;this._fireChange()}};O.prototype._getNavPath=function(p){var a=this.oModel.resolve(p,this.getContext());if(!a){return}var P=a.split("/"),e=P[P.length-1],n;var c=e.split("(")[0];if(c&&this.oNavigationPaths[c]){n=this.oNavigationPaths[c]}return n};O.prototype._processODataObject=function(o,a,n){var k=this.oModel._getKey(o),c=this.oModel.getContext("/"+k),p=c.getPath();var r=this.oModel._getObject(n,c);if(q.isArray(r)){this.oKeys[p]=r;this.oLengths[p]=r.length;this.oFinalLengths[p]=true}else if(typeof r==="object"){this.oKeys[p]=[r];this.oLengths[p]=0;this.oFinalLengths[p]=true}else{if(n&&o[n].__list){this.oKeys[p]=o[n].__list;this.oLengths[p]=this.oKeys[p].length;this.oFinalLengths[p]=true}else{this.oKeys[a]=[];this.oLengths[a]=0;this.oFinalLengths[a]=false}}};return O},true);
