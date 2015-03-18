/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
sap.ui.define(['jquery.sap.global','./HashChanger'],function(q,H){"use strict";var a=function(h){this._iHistoryLength=window.history.length;this.aHistory=[];this._bIsInitial=true;if(!h){q.sap.log.error("sap.ui.core.routing.History constructor was called and it did not get a hashChanger as parameter")}this._oHashChanger=h;this._oHashChanger.attachEvent("hashChanged",this._onHashChange,this);this._oHashChanger.attachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.attachEvent("hashSet",this._hashSet,this);this._reset()};a.prototype.destroy=function(n){this._oHashChanger.detachEvent("hashChanged",this._onHashChange,this);this._oHashChanger.detachEvent("hashReplaced",this._hashReplaced,this);this._oHashChanger.detachEvent("hashSet",this._hashSet,this);this._oHashChanger=null};a.prototype.getDirection=function(n){if(n!==undefined&&this._bIsInitial){return undefined}if(n===undefined){return this._sCurrentDirection}return this._getDirection(n)};a.prototype.getPreviousHash=function(){return this.aHistory[this.iHistoryPosition-1]};a.prototype._reset=function(){this.aHistory.length=0;this.iHistoryPosition=0;this._bUnknown=true;this.aHistory[0]=this._oHashChanger.getHash()};a.prototype._getDirection=function(n,h){var d=sap.ui.core.routing.HistoryDirection;if(this._oNextHash&&this._oNextHash.sHash===n){return d.NewEntry}if(this._bUnknown){return d.Unknown}if(h){return d.NewEntry}if(this.aHistory[this.iHistoryPosition+1]===n&&this.aHistory[this.iHistoryPosition-1]===n){return d.Unknown}if(this.aHistory[this.iHistoryPosition-1]===n){return d.Backwards}if(this.aHistory[this.iHistoryPosition+1]===n){return d.Forwards}return d.Unknown};a.prototype._onHashChange=function(e){this._hashChange(e.getParameter("newHash"))};a.prototype._hashChange=function(n){var d=sap.ui.core.routing.HistoryDirection,b=window.history.length,D;if(this._oNextHash&&this._oNextHash.bWasReplaced&&this._oNextHash.sHash===n){this.aHistory[this.iHistoryPosition]=n;this._oNextHash=null;return}this._bIsInitial=false;D=this._sCurrentDirection=this._getDirection(n,this._iHistoryLength<window.history.length);if(this._oNextHash&&!this._oNextHash.bWasReplaced){this._iHistoryLength=b+1}else{this._iHistoryLength=b}if(this._oNextHash){this._oNextHash=null}if(D===d.Unknown){this._reset();return}this._bUnknown=false;if(D===d.NewEntry){if(this.iHistoryPosition+1<this.aHistory.length){this.aHistory=this.aHistory.slice(0,this.iHistoryPosition+1)}this.aHistory.push(n);this.iHistoryPosition+=1;return}if(D===d.Forwards){this.iHistoryPosition++;return}if(D===d.Backwards){this.iHistoryPosition--}};a.prototype._hashSet=function(e){this._hashChangedByApp(e.getParameter("sHash"),false)};a.prototype._hashReplaced=function(e){this._hashChangedByApp(e.getParameter("sHash"),true)};a.prototype._hashChangedByApp=function(n,w){this._oNextHash={sHash:n,bWasReplaced:w}};(function(){var i=new a(H.getInstance());a.getInstance=function(){return i}}());return a},true);
