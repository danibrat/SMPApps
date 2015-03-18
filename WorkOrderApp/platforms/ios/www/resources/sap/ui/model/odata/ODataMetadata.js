/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
sap.ui.define(['jquery.sap.global','sap/ui/base/EventProvider'],function(q,E){"use strict";var O=sap.ui.base.EventProvider.extend("sap.ui.model.odata.ODataMetadata",{constructor:function(m,p){E.apply(this,arguments);this.bLoaded=false;this.bFailed=false;this.mEntityTypes={};this.oRequestHandle=null;this.sUrl=m;this.bAsync=p.async;this.sUser=p.user;this.sPassword=p.password;this.mHeaders=p.headers;this.oLoadEvent=null;this.oFailedEvent=null;this.oMetadata=null;this.mNamespaces=p.namespaces||{sap:"http://www.sap.com/Protocols/SAPData",m:"http://schemas.microsoft.com/ado/2007/08/dataservices/metadata","":"http://schemas.microsoft.com/ado/2007/06/edmx"};this._loadMetadata()},metadata:{publicMethods:["getServiceMetadata","attachFailed","detachFailed","attachLoaded","detachLoaded"]}});O.prototype._setNamespaces=function(n){this.mNamespaces=n};O.prototype._loadMetadata=function(){var t=this;var r=this._createRequest(this.sUrl);function _(m,R){if(!m||!m.dataServices){var p={message:"Invalid metadata document",request:r,response:R};a(p);return}t.oMetadata=m;t.oRequestHandle=null;if(t.bAsync){t.fireLoaded(t)}else{t.bLoaded=true;t.oLoadEvent=q.sap.delayedCall(0,t,t.fireLoaded,[t])}}function a(e){var p={message:e.message};if(e.response){p.statusCode=e.response.statusCode;p.statusText=e.response.statusText;p.responseText=e.response.body}if(t.oRequestHandle&&t.oRequestHandle.bSuppressErrorHandlerCall){return}t.oRequestHandle=null;if(t.bAsync){t.fireFailed(p)}else{t.oFailedEvent=q.sap.delayedCall(0,t,t.fireFailed,[p])}}this.oRequestHandle=OData.request(r,_,a,OData.metadataHandler)};O.prototype.getServiceMetadata=function(){return this.oMetadata};O.prototype.isLoaded=function(){return this.bLoaded};sap.ui.model.odata.ODataMetadata.prototype.fireLoaded=function(){this.bLoaded=true;this.fireEvent("loaded");q.sap.log.debug('loaded on Metadata object was fired');return this};sap.ui.model.odata.ODataMetadata.prototype.attachLoaded=function(d,f,l){this.attachEvent("loaded",d,f,l);return this};sap.ui.model.odata.ODataMetadata.prototype.detachLoaded=function(f,l){this.detachEvent("loaded",f,l);return this};sap.ui.model.odata.ODataMetadata.prototype.fireFailed=function(a){this.fireEvent("failed",a);return this};sap.ui.model.odata.ODataMetadata.prototype.attachFailed=function(d,f,l){this.attachEvent("failed",d,f,l);return this};sap.ui.model.odata.ODataMetadata.prototype.detachFailed=function(f,l){this.detachEvent("failed",f,l);return this};O.prototype._getEntityTypeByPath=function(p){if(!p){return null}if(!this.oMetadata||q.isEmptyObject(this.oMetadata)){return null}var c=p.replace(/^\/|\/$/g,""),P=c.split("/"),l=P.length,a,A,o,e,b,d,r,t=this;if(P[0].indexOf("(")!=-1){P[0]=P[0].substring(0,P[0].indexOf("("))}if(l>1){o=t._getEntityTypeByPath(P[0]);for(var i=1;i<P.length;i++){if(o){if(P[i].indexOf("(")!=-1){P[i]=P[i].substring(0,P[i].indexOf("("))}if(o.navigationProperty){r=t._getEntityTypeByNavProperty(o,P[i]);if(r){o=r}}d=o}}}else{b=this._splitName(this._getEntityTypeName(P[0]));d=this._getObjectMetadata("entityType",b[0],b[1]);if(d){d.entityType=this._getEntityTypeName(P[0])}}if(!d){var f=P[P.length-1];var F=this._getFunctionImportMetadata(f,"GET");if(F&&F.entitySet){d=this._getEntityTypeByPath(F.entitySet);if(d){d.entityType=this._getEntityTypeName(F.entitySet)}}}return d};O.prototype._getEntityTypeByName=function(n){var e,t=this;if(!n){return null}if(!this.oMetadata||q.isEmptyObject(this.oMetadata)){return null}if(this.mEntityTypes[n]){e=this.mEntityTypes[n]}else{q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityType){q.each(s.entityType,function(k,o){if(o.name===n){e=o;t.mEntityTypes[n]=e;e.namespace=s.namespace;return false}})}})}return e};O.prototype._getAnnotation=function(p){var n,k,P,m,M,e,s,o,a,p;P=p.split('/#');M=P[1].split('/');if(!P[0]){e=this._getEntityTypeByName(M[0]);if(!e)return;s=P[1].substr(P[1].indexOf('/')+1);o=this._getPropertyMetadata(e,s);if(!o)return;m=s.substr(s.indexOf(o.name));m=m.substr(m.indexOf('/')+1)}else{e=this._getEntityTypeByPath(P[0]);if(!e)return;p=P[0].replace(/^\/|\/$/g,"");s=p.substr(p.indexOf('/')+1);o=this._getPropertyMetadata(e,s);if(!o)return;m=M.join('/')}n=this._getAnnotationObject(e,o,m);return n};O.prototype._getAnnotationObject=function(e,o,m){var t=this,a,p,A,n,s;if(!o)return;n=o;p=m.split('/');if(p[0].indexOf('.')>-1){return this._getV4AnnotationObject(e,o,p)}else{if(p.length>1){n=n[p[0]];if(!n&&o.extensions){for(var i=0;i<o.extensions.length;i++){var b=o.extensions[i];if(b.name==p[0]){n=b;break}}}m=p.splice(0,1);A=this._getAnnotationObject(e,n,p.join('/'))}else{if(p[0].indexOf('@')>-1){s=p[0].substr(1);a=s.split(':');A=n[a[0]];if(!A&&n.extensions){for(var i=0;i<n.extensions.length;i++){var b=n.extensions[i];if(b.name===a[1]&&b.namespace===this.mNamespaces[a[0]]){A=b.value;break}}}}else{a=p[0].split(':');A=n[a[0]];A=n[p[0]];if(!A&&n.extensions){for(var i=0;i<n.extensions.length;i++){var b=n.extensions[i];if(b.name===a[1]&&b.namespace===this.mNamespaces[a[0]]){A=b;break}}}}}}return A};O.prototype._getV4AnnotationObject=function(e,o,p){var a,A=[];if(p.length>1){return}var t=e.namespace?e.namespace+".":"";t+=e.name+"/"+o.name;q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.annotations){q.each(s.annotations,function(k,o){if(o.target===t&&!o.qualifier){A.push(o.annotation);return false}})}});if(A){q.each(A,function(i,b){q.each(b,function(j,c){if(c.term===p[0]){a=c}})})}return a};O.prototype._splitName=function(f){var p=[];if(f){var s=f.lastIndexOf(".");p[0]=f.substr(s+1);p[1]=f.substr(0,s)}return p};O.prototype._getEntityTypeName=function(c){var e;if(c){q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){q.each(s.entityContainer,function(k,o){if(o.entitySet){q.each(o.entitySet,function(j,a){if(a.name===c){e=a.entityType;return false}})}})}})}return e};O.prototype._getObjectMetadata=function(o,s,n){var a;if(s&&n){q.each(this.oMetadata.dataServices.schema,function(i,S){if(S[o]&&S.namespace===n){q.each(S[o],function(j,c){if(c.name===s){a=c;a.namespace=S.namespace;return false}});return!a}})}return a};O.prototype.getUseBatch=function(){var u=false;q.each(this.oMetadata.dataServices.schema,function(i,s){if(s.entityContainer){q.each(s.entityContainer,function(k,e){if(e.extensions){q.each(e.extensions,function(l,o){if(o.name==="use-batch"&&o.namespace==="http://www.sap.com/Protocols/SAPData"){u=(typeof o.value==='string')?(o.value.toLowerCase()==='true'):!!o.value;return false}})}})}});return u};O.prototype._getFunctionImportMetadata=function(f,m){var o=null;q.each(this.oMetadata.dataServices.schema,function(i,s){if(s["entityContainer"]){q.each(s["entityContainer"],function(j,e){if(e["functionImport"]){q.each(e["functionImport"],function(k,F){if(F.name===f&&F.httpMethod===m){o=F;return false}})}return!o})}return!o});return o};O.prototype._getEntityTypeByNavProperty=function(e,n){var t=this,a,A,b,N;q.each(e.navigationProperty,function(k,o){if(o.name===n){a=t._splitName(o.relationship);A=t._getObjectMetadata("association",a[0],a[1]);if(A){var c=A.end[0];if(c.role!==o.toRole){c=A.end[1]}b=t._splitName(c.type);N=t._getObjectMetadata("entityType",b[0],b[1]);if(N){N.entityType=c.type}return false}}});return N};O.prototype._getNavigationPropertyNames=function(e){var n=[];if(e.navigationProperty){q.each(e.navigationProperty,function(k,N){n.push(N.name)})}return n};O.prototype._getPropertyMetadata=function(e,p){var P,t=this;if(!e)return;p=p.replace(/^\/|\/$/g,"");var a=p.split("/");q.each(e.property,function(k,b){if(b.name===a[0]){P=b;return false}});if(P&&a.length>1&&!q.sap.startsWith(P.type.toLowerCase(),"edm.")){var n=this._splitName(P.type);P=this._getPropertyMetadata(this._getObjectMetadata("complexType",n[0],n[1]),a[1])}if(!P&&a.length>1){var o=this._getEntityTypeByNavProperty(e,a[0]);if(o){P=t._getPropertyMetadata(o,a[1])}}return P};O.prototype.destroy=function(){delete this.oMetadata;if(this.oRequestHandle){this.oRequestHandle.bSuppressErrorHandlerCall=true;this.oRequestHandle.abort();this.oRequestHandle=null}if(!!this.oLoadEvent){q.sap.clearDelayedCall(this.oLoadEvent)}if(!!this.oFailedEvent){q.sap.clearDelayedCall(this.oFailedEvent)}sap.ui.base.Object.prototype.destroy.apply(this,arguments)};sap.ui.model.odata.ODataMetadata.prototype._createRequest=function(u){var h={},l={"Accept-Language":sap.ui.getCore().getConfiguration().getLanguage()};q.extend(h,this.mHeaders,l);var r={headers:h,requestUri:u,method:'GET',user:this.sUser,password:this.sPassword,async:!!this.bAsync};if(!!this.bAsync){r.withCredentials=this.bWithCredentials}return r};return O},true);
