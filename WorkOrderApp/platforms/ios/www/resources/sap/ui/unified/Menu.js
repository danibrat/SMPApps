/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.ui.unified.Menu");jQuery.sap.require("sap.ui.unified.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ui.unified.Menu",{metadata:{publicMethods:["open","close"],library:"sap.ui.unified",properties:{"enabled":{type:"boolean",group:"Behavior",defaultValue:true},"ariaDescription":{type:"string",group:"Accessibility",defaultValue:null},"maxVisibleItems":{type:"int",group:"Behavior",defaultValue:0}},defaultAggregation:"items",aggregations:{"items":{type:"sap.ui.unified.MenuItemBase",multiple:true,singularName:"item"}},events:{"itemSelect":{}}}});sap.ui.unified.Menu.M_EVENTS={'itemSelect':'itemSelect'};(function(w,u){jQuery.sap.require("sap.ui.unified.MenuItemBase");jQuery.sap.require("sap.ui.core.Popup");jQuery.sap.require("jquery.sap.script");sap.ui.unified.Menu.prototype.init=function(){var t=this;this.bOpen=false;this.oOpenedSubMenu=null;this.oHoveredItem=null;this.oPopup=null;this.fAnyEventHandlerProxy=jQuery.proxy(function(e){var r=this.getRootMenu();if(r!=this||!this.bOpen||!this.getDomRef()||(e.type!="mousedown"&&e.type!="touchstart")){return}r.handleOuterEvent(this.getId(),e)},this);this.fOrientationChangeHandler=function(){t.close()};this.bUseTopStyle=false};sap.ui.unified.Menu.prototype.exit=function(){if(this.oPopup){this.oPopup.detachOpened(this._menuOpened,this);this.oPopup.detachClosed(this._menuClosed,this);this.oPopup.destroy();delete this.oPopup}jQuery.sap.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){jQuery(w).unbind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false}this._resetDelayedRerenderItems()};sap.ui.unified.Menu.prototype.invalidate=function(o){if(o instanceof sap.ui.unified.MenuItemBase&&this.getDomRef()){this._delayedRerenderItems()}else{sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}};sap.ui.unified.Menu.prototype.onBeforeRendering=function(){this._resetDelayedRerenderItems()};sap.ui.unified.Menu.prototype.onAfterRendering=function(){var b=this.getItems();var c=-1;for(var i=0;i<b.length;i++){if(b[i].onAfterRendering&&b[i].getDomRef()){c=i;b[i].onAfterRendering()}}if(this.oHoveredItem){this.oHoveredItem.hover(true,this)}var m=this.getMaxVisibleItems();var M=document.documentElement.clientHeight-10;if(m>0&&c>=0){M=Math.min(M,b[c].$().outerHeight(true)*m)}if(this.$().outerHeight(true)>M){this.$().css("max-height",M+"px").toggleClass("sapUiMnuScroll",true)}};sap.ui.unified.Menu.prototype.addItem=function(i){this.addAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this};sap.ui.unified.Menu.prototype.insertItem=function(i,b){this.insertAggregation("items",i,b,!!this.getDomRef());this._delayedRerenderItems();return this};sap.ui.unified.Menu.prototype.removeItem=function(i){this.removeAggregation("items",i,!!this.getDomRef());this._delayedRerenderItems();return this};sap.ui.unified.Menu.prototype.removeAllItems=function(){var r=this.removeAllAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return r};sap.ui.unified.Menu.prototype.destroyItems=function(){this.destroyAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return this};sap.ui.unified.Menu.prototype._delayedRerenderItems=function(){if(!this.getDomRef()){return}this._resetDelayedRerenderItems();this._itemRerenderTimer=jQuery.sap.delayedCall(0,this,function(){var d=this.getDomRef();if(d){var r=sap.ui.getCore().createRenderManager();sap.ui.unified.MenuRenderer.renderItems(r,this);r.flush(d);r.destroy();this.onAfterRendering();this.getPopup()._applyPosition(this.getPopup()._oLastPosition)}})};sap.ui.unified.Menu.prototype._resetDelayedRerenderItems=function(){if(this._itemRerenderTimer){jQuery.sap.clearDelayedCall(this._itemRerenderTimer);delete this._itemRerenderTimer}};sap.ui.unified.Menu.prototype.open=function(W,o,m,b,c,d,e){if(this.bOpen){return}s(this,true);this.bOpen=true;this.oOpenerRef=o;this.getPopup().open(0,m,b,c,d||"0 0",e||"_sapUiCommonsMenuFlip _sapUiCommonsMenuFlip",true);var D=this.getDomRef();jQuery(D).attr("tabIndex",0).focus();if(W){this.setHoveredItem(this.getNextVisibleItem(-1))}jQuery.sap.bindAnyEvent(this.fAnyEventHandlerProxy);if(sap.ui.Device.support.orientation&&this.getRootMenu()===this){jQuery(w).bind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=true}};sap.ui.unified.Menu.prototype._menuOpened=function(){I(this)};sap.ui.unified.Menu.prototype.close=function(){if(!this.bOpen||sap.ui.unified.Menu._dbg){return}s(this,false);delete this._bFixed;jQuery.sap.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){jQuery(w).unbind("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false}this.bOpen=false;if(this.oOpenedSubMenu){this.oOpenedSubMenu.close()}this.setHoveredItem();jQuery(this.getDomRef()).attr("tabIndex",-1);this.getPopup().close(0);this._resetDelayedRerenderItems();this.$().remove();this.bOutput=false;if(this.isSubMenu()){this.getParent().getParent().oOpenedSubMenu=null}};sap.ui.unified.Menu.prototype._menuClosed=function(){if(this.oOpenerRef){if(!this.ignoreOpenerDOMRef){try{this.oOpenerRef.focus()}catch(e){jQuery.sap.log.warning("Menu.close cannot restore the focus on opener "+this.oOpenerRef+", "+e)}}this.oOpenerRef=u}};sap.ui.unified.Menu.prototype.onclick=function(e){this.selectItem(this.getItemByDomRef(e.target),false,!!(e.metaKey||e.ctrlKey));e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsapnext=function(e){if(e.keyCode!=jQuery.sap.KeyCodes.ARROW_DOWN){if(this.oHoveredItem&&this.oHoveredItem.getSubmenu()&&this.checkEnabled(this.oHoveredItem)){this.openSubmenu(this.oHoveredItem,true);return}}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;this.setHoveredItem(this.getNextVisibleItem(i));e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsapprevious=function(e){if(e.keyCode!=jQuery.sap.KeyCodes.ARROW_UP){if(this.isSubMenu()){this.close();e.preventDefault();e.stopPropagation();return}}var i=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;this.setHoveredItem(this.getPreviousVisibleItem(i));e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsaphome=function(e){var b=this.getItems();var o=null;for(var i=0;i<b.length;i++){if(b[i].getVisible()){o=b[i];break}}this.setHoveredItem(o);e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsapend=function(e){var b=this.getItems();var o=null;for(var i=b.length-1;i>=0;i--){if(b[i].getVisible()){o=b[i];break}}this.setHoveredItem(o);e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsapselect=function(e){this._sapSelectOnKeyDown=true;e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onkeyup=function(e){if(!this._sapSelectOnKeyDown){return}else{this._sapSelectOnKeyDown=false}if(!jQuery.sap.PseudoEvents.sapselect.fnCheck(e)){return}this.selectItem(this.oHoveredItem,true,false);e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsapbackspace=function(e){if(jQuery(e.target).prop("tagName")!="INPUT"){e.preventDefault()}};sap.ui.unified.Menu.prototype.onsapbackspacemodifiers=sap.ui.unified.Menu.prototype.onsapbackspace;sap.ui.unified.Menu.prototype.onsapescape=function(e){this.close();e.preventDefault();e.stopPropagation()};sap.ui.unified.Menu.prototype.onsaptabnext=sap.ui.unified.Menu.prototype.onsapescape;sap.ui.unified.Menu.prototype.onsaptabprevious=sap.ui.unified.Menu.prototype.onsapescape;sap.ui.unified.Menu.prototype.onmouseover=function(e){if(!sap.ui.Device.system.desktop){return}var i=this.getItemByDomRef(e.target);if(!this.bOpen||!i||i==this.oHoveredItem){return}if(this.oOpenedSubMenu&&jQuery.sap.containsOrEquals(this.oOpenedSubMenu.getDomRef(),e.target)){return}this.setHoveredItem(i);if(this.oOpenedSubMenu&&!this.oOpenedSubMenu._bFixed){this.oOpenedSubMenu.close();this.oOpenedSubMenu=null}if(jQuery.sap.checkMouseEnterOrLeave(e,this.getDomRef())){this.getDomRef().focus()}if(this.checkEnabled(i)){this.openSubmenu(i,false,true)}};sap.ui.unified.Menu.prototype.onmouseout=function(e){if(!sap.ui.Device.system.desktop){return}I(this);if(jQuery.sap.checkMouseEnterOrLeave(e,this.getDomRef())){if(!this.oOpenedSubMenu||!this.oOpenedSubMenu.getParent()===this.oHoveredItem){this.setHoveredItem(null)}}};sap.ui.unified.Menu.prototype.onsapfocusleave=function(e){if(this.oOpenedSubMenu||!this.bOpen){return}this.getRootMenu().handleOuterEvent(this.getId(),e)};sap.ui.unified.Menu.prototype.handleOuterEvent=function(m,e){var i=false,t=this.getPopup().touchEnabled;if(e.type=="mousedown"||e.type=="touchstart"){if(t&&(e.isMarked("delayedMouseEvent")||e.isMarked("cancelAutoClose"))){return}var c=this;while(c&&!i){if(jQuery.sap.containsOrEquals(c.getDomRef(),e.target)){i=true}c=c.oOpenedSubMenu}}else if(e.type=="sapfocusleave"){if(t){return}if(e.relatedControlId){var c=this;while(c&&!i){if((c.oOpenedSubMenu&&c.oOpenedSubMenu.getId()==e.relatedControlId)||jQuery.sap.containsOrEquals(c.getDomRef(),jQuery.sap.byId(e.relatedControlId).get(0))){i=true}c=c.oOpenedSubMenu}}}if(!i){this.ignoreOpenerDOMRef=true;this.close();this.ignoreOpenerDOMRef=false}};sap.ui.unified.Menu.prototype.getItemByDomRef=function(d){var o=this.getItems(),l=o.length;for(var i=0;i<l;i++){var b=o[i],c=b.getDomRef();if(jQuery.sap.containsOrEquals(c,d)){return b}}return null};sap.ui.unified.Menu.prototype.selectItem=function(i,W,c){if(!i||!(i instanceof sap.ui.unified.MenuItemBase&&this.checkEnabled(i))){return}var S=i.getSubmenu();if(!S){this.getRootMenu().close()}else{if(!sap.ui.Device.system.desktop&&this.oOpenedSubMenu===S){this.oOpenedSubMenu.close();this.oOpenedSubMenu=null}else{this.openSubmenu(i,W)}}i.fireSelect({item:i,ctrlKey:c});this.getRootMenu().fireItemSelect({item:i})};sap.ui.unified.Menu.prototype.isSubMenu=function(){return this.getParent()&&this.getParent().getParent&&this.getParent().getParent()instanceof sap.ui.unified.Menu};sap.ui.unified.Menu.prototype.getRootMenu=function(){var m=this;while(m.isSubMenu()){m=m.getParent().getParent()}return m};sap.ui.unified.Menu.prototype.getMenuLevel=function(){var l=1;var m=this;while(m.isSubMenu()){m=m.getParent().getParent();l++}return l};sap.ui.unified.Menu.prototype.getPopup=function(){if(!this.oPopup){this.oPopup=new sap.ui.core.Popup(this,false,true,false);this.oPopup.setDurations(0,0);this.oPopup.attachOpened(this._menuOpened,this);this.oPopup.attachClosed(this._menuClosed,this)}return this.oPopup};sap.ui.unified.Menu.prototype.setHoveredItem=function(i){if(this.oHoveredItem){this.oHoveredItem.hover(false,this)}if(!i){this.oHoveredItem=null;jQuery(this.getDomRef()).removeAttr("aria-activedescendant");return}this.oHoveredItem=i;i.hover(true,this);if(sap.ui.getCore().getConfiguration().getAccessibility()){jQuery(this.getDomRef()).attr("aria-activedescendant",i.getId())}};sap.ui.unified.Menu.prototype.openSubmenu=function(i,W,b){var S=i.getSubmenu();if(!S){return}if(this.oOpenedSubMenu&&this.oOpenedSubMenu!==S){this.oOpenedSubMenu.close();this.oOpenedSubMenu=null}if(this.oOpenedSubMenu){this.oOpenedSubMenu._bFixed=(b&&this.oOpenedSubMenu._bFixed)||(!b&&!this.oOpenedSubMenu._bFixed);this.oOpenedSubMenu._bringToFront()}else{this.oOpenedSubMenu=S;var e=sap.ui.core.Popup.Dock;S.open(W,this,e.BeginTop,e.EndTop,i,"0 0")}};sap.ui.unified.Menu.prototype._bringToFront=function(){jQuery.sap.byId(this.getPopup().getId()).mousedown()};sap.ui.unified.Menu.prototype.checkEnabled=function(i){I(this);return i&&i.getEnabled()&&this.getEnabled()};sap.ui.unified.Menu.prototype.getNextVisibleItem=function(b){var o=null;var c=this.getItems();for(var i=b+1;i<c.length;i++){if(c[i].getVisible()){o=c[i];break}}if(!o){for(var i=0;i<=b;i++){if(c[i].getVisible()){o=c[i];break}}}return o};sap.ui.unified.Menu.prototype.getPreviousVisibleItem=function(b){var o=null;var c=this.getItems();for(var i=b-1;i>=0;i--){if(c[i].getVisible()){o=c[i];break}}if(!o){for(var i=c.length-1;i>=b;i--){if(c[i].getVisible()){o=c[i];break}}}return o};sap.ui.unified.Menu.prototype.setRootMenuTopStyle=function(U){this.getRootMenu().bUseTopStyle=U;sap.ui.unified.Menu.rerenderMenu(this.getRootMenu())};sap.ui.unified.Menu.rerenderMenu=function(m){var b=m.getItems();for(var i=0;i<b.length;i++){var S=b[i].getSubmenu();if(S){sap.ui.unified.Menu.rerenderMenu(S)}}m.invalidate();m.rerender()};function s(m,o){var p=m.getParent();if(p&&p instanceof sap.ui.unified.MenuItemBase){p.onSubmenuToggle(o)}};var I=function(){};if(sap.ui.Device.browser.internet_explorer&&sap.ui.Device.browser.version<9){I=function(m,d){if(d===u){d=50}jQuery.sap.delayedCall(d,m,function(){var e=this.$();if(e.length>0){var D=e[0].firstChild;sap.ui.core.RenderManager.forceRepaint(D)}})}}
/*!
 * The following code is taken from 
 * jQuery UI 1.10.3 - 2013-11-18
 * jquery.ui.position.js
 *
 * http://jqueryui.com
 * Copyright 2013 jQuery Foundation and other contributors; Licensed MIT
 */
function _(d){var b=jQuery(w);d.within={element:b,isWindow:true,offset:b.offset()||{left:0,top:0},scrollLeft:b.scrollLeft(),scrollTop:b.scrollTop(),width:b.width(),height:b.height()};d.collisionPosition={marginLeft:0,marginTop:0};return d};var a={fit:{left:function(p,d){var b=d.within,c=b.isWindow?b.scrollLeft:b.offset.left,o=b.width,e=p.left-d.collisionPosition.marginLeft,f=c-e,g=e+d.collisionWidth-o-c,n;if(d.collisionWidth>o){if(f>0&&g<=0){n=p.left+f+d.collisionWidth-o-c;p.left+=f-n}else if(g>0&&f<=0){p.left=c}else{if(f>g){p.left=c+o-d.collisionWidth}else{p.left=c}}}else if(f>0){p.left+=f}else if(g>0){p.left-=g}else{p.left=Math.max(p.left-e,p.left)}},top:function(p,d){var b=d.within,c=b.isWindow?b.scrollTop:b.offset.top,o=d.within.height,e=p.top-d.collisionPosition.marginTop,f=c-e,g=e+d.collisionHeight-o-c,n;if(d.collisionHeight>o){if(f>0&&g<=0){n=p.top+f+d.collisionHeight-o-c;p.top+=f-n}else if(g>0&&f<=0){p.top=c}else{if(f>g){p.top=c+o-d.collisionHeight}else{p.top=c}}}else if(f>0){p.top+=f}else if(g>0){p.top-=g}else{p.top=Math.max(p.top-e,p.top)}}},flip:{left:function(p,d){var b=d.within,c=b.offset.left+b.scrollLeft,o=b.width,e=b.isWindow?b.scrollLeft:b.offset.left,f=p.left-d.collisionPosition.marginLeft,g=f-e,h=f+d.collisionWidth-o-e,m=d.my[0]==="left"?-d.elemWidth:d.my[0]==="right"?d.elemWidth:0,i=d.at[0]==="left"?d.targetWidth:d.at[0]==="right"?-d.targetWidth:0,j=-2*d.offset[0],n,k;if(g<0){n=p.left+m+i+j+d.collisionWidth-o-c;if(n<0||n<Math.abs(g)){p.left+=m+i+j}}else if(h>0){k=p.left-d.collisionPosition.marginLeft+m+i+j-e;if(k>0||Math.abs(k)<h){p.left+=m+i+j}}},top:function(p,d){var b=d.within,c=b.offset.top+b.scrollTop,o=b.height,e=b.isWindow?b.scrollTop:b.offset.top,f=p.top-d.collisionPosition.marginTop,g=f-e,h=f+d.collisionHeight-o-e,t=d.my[1]==="top",m=t?-d.elemHeight:d.my[1]==="bottom"?d.elemHeight:0,i=d.at[1]==="top"?d.targetHeight:d.at[1]==="bottom"?-d.targetHeight:0,j=-2*d.offset[1],n,k;if(g<0){k=p.top+m+i+j+d.collisionHeight-o-c;if((p.top+m+i+j)>g&&(k<0||k<Math.abs(g))){p.top+=m+i+j}}else if(h>0){n=p.top-d.collisionPosition.marginTop+m+i+j-e;if((p.top+m+i+j)>h&&(n>0||Math.abs(n)<h)){p.top+=m+i+j}}}},flipfit:{left:function(){a.flip.left.apply(this,arguments);a.fit.left.apply(this,arguments)},top:function(){a.flip.top.apply(this,arguments);a.fit.top.apply(this,arguments)}}};jQuery.ui.position._sapUiCommonsMenuFlip={left:function(p,d){if(jQuery.ui.position.flipfit){jQuery.ui.position.flipfit.left.apply(this,arguments);return}d=_(d);a.flipfit.left.apply(this,arguments)},top:function(p,d){if(jQuery.ui.position.flipfit){jQuery.ui.position.flipfit.top.apply(this,arguments);return}d=_(d);a.flipfit.top.apply(this,arguments)}}})(window);
