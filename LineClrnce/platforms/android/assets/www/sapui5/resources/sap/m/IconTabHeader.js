/*!
 * SAP UI development toolkit for HTML5 (SAPUI5/OpenUI5)
 * (c) Copyright 2009-2014 SAP AG or an SAP affiliate company. 
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
jQuery.sap.declare("sap.m.IconTabHeader");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.IconTabHeader",{metadata:{library:"sap.m",properties:{"showSelection":{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},"selectedKey":{type:"string",group:"Data",defaultValue:null},"visible":{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{"items":{type:"sap.m.IconTab",multiple:true,singularName:"item"}},events:{"select":{}}}});sap.m.IconTabHeader.M_EVENTS={'select':'select'};jQuery.sap.require("sap.ui.core.delegate.ItemNavigation");jQuery.sap.require("sap.ui.core.EnabledPropagator");sap.ui.core.EnabledPropagator.apply(sap.m.IconTabHeader.prototype,[true]);sap.m.IconTabHeader.SCROLL_STEP=264;sap.m.IconTabHeader.prototype._bDoScroll=!sap.ui.Device.system.desktop||(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8);
sap.m.IconTabHeader.prototype.init=function(){this._bPreviousScrollForward=false;this._bPreviousScrollBack=false;this._iCurrentScrollLeft=0;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this.startScrollX=0;this.startTouchX=0;this._scrollable=null;this._aTabKeys=[];this._oItemNavigation=new sap.ui.core.delegate.ItemNavigation().setCycling(false);this.addDelegate(this._oItemNavigation);if(this._bDoScroll){jQuery.sap.require("sap.ui.core.delegate.ScrollEnablement");this._oScroller=new sap.ui.core.delegate.ScrollEnablement(this,this.getId()+"-head",{horizontal:true,vertical:false,nonTouchScrolling:true})}};
sap.m.IconTabHeader.prototype.exit=function(){if(this._oArrowLeft){this._oArrowLeft.destroy()}if(this._oArrowRight){this._oArrowRight.destroy()}if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation}if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this._aTabKeys){this._aTabKeys=null}};
sap.m.IconTabHeader.prototype.onBeforeRendering=function(){var I=this.getItems(),s=this.getSelectedKey(),i=0;if(this._sResizeListenerId){sap.ui.core.ResizeHandler.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(I.length>0){if(!this.oSelectedItem||s&&s!==this.oSelectedItem.getKey()){if(s){for(;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)&&I[i].getKey()===s){this.oSelectedItem=I[i];break}}}if(!this.oSelectedItem&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){for(i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)&&I[i].getVisible()){this.oSelectedItem=I[i];break}}}}if(this.oSelectedItem&&!this.oSelectedItem.getVisible()&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){for(i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)&&I[i].getVisible()){this.oSelectedItem=I[i];break}}}if(this.oSelectedItem){this.setProperty("selectedKey",this.oSelectedItem.getKey(),true)}}};
sap.m.IconTabHeader.prototype.invalidate=function(){if(this.getParent()instanceof sap.m.IconTabBar&&!this.getParent()._bHideHeader){this.getParent().invalidate()}else{sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}};
sap.m.IconTabHeader.prototype.setSelectedKey=function(k){var I=this.getItems(),i=0;if(this.$().length){for(;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)&&I[i].getKey()===k){this.setSelectedItem(I[i],true);break}}}this.setProperty("selectedKey",k,true);return this};
sap.m.IconTabHeader.prototype.setSelectedItem=function(i,a){if(!i||!i.getEnabled()){return this}var I=false;if(i.getContent().length===0&&this.oSelectedItem&&this.oSelectedItem.getContent().length===0){I=true}if(this.oSelectedItem&&this.oSelectedItem.getVisible()&&(this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpandable()||this.oSelectedItem!==i)){this.oSelectedItem.$().removeClass("sapMITBSelected")}if(i.getVisible()){if(this.oSelectedItem===i){if(this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpandable()){this.getParent()._toggleExpandCollapse()}}else{this.oSelectedItem=i;this.setProperty("selectedKey",this.oSelectedItem.getKey(),true);if(this.getParent()instanceof sap.m.IconTabBar&&(this.getParent().getExpandable()||this.getParent().getExpanded())){this.oSelectedItem.$().addClass("sapMITBSelected");var s=this.oSelectedItem.getContent();if(s.length>0){this.getParent()._rerenderContent(s)}else{if(!I){this.getParent()._rerenderContent(this.getParent().getContent())}}if(this.getParent().getExpandable()&&!this.getParent().getExpanded()){this.getParent()._toggleExpandCollapse(true)}}}if(this.oSelectedItem.$().length>0){this._scrollIntoView(i,500)}else{this._scrollAfterRendering=true}}var S=this.oSelectedItem.getKey();this.oSelectedItem=i;this.setProperty("selectedKey",S,true);if(!a){if(this.getParent()instanceof sap.m.IconTabBar){this.getParent().fireSelect({selectedItem:this.oSelectedItem,selectedKey:S,item:this.oSelectedItem,key:S})}else{this.fireSelect({selectedItem:this.oSelectedItem,selectedKey:S,item:this.oSelectedItem,key:S})}}return this};
sap.m.IconTabHeader.prototype._getFirstVisibleItem=function(I){for(var i=0;i<I.length;i++){if(I[i].getVisible()){return I[i]}}return null};
sap.m.IconTabHeader.prototype.onAfterRendering=function(){var h=this.getDomRef("head"),$=this.$();if(this._oScroller){this._oScroller.setIconTabBar(this,jQuery.proxy(this._afterIscroll,this),jQuery.proxy(this._scrollPreparation,this))}if(this.oSelectedItem&&this.getParent()instanceof sap.m.IconTabBar&&this.getParent().getExpanded()){this.oSelectedItem.$().addClass("sapMITBSelected")}if(this._bDoScroll){jQuery.sap.delayedCall(350,this,"_checkOverflow",[h,$])}if(this._iCurrentScrollLeft!==0&&!this._bDoScroll){h.scrollLeft=this._iCurrentScrollLeft}if(this.oSelectedItem){if(!this._bDoThisOnlyOnce){jQuery.sap.delayedCall(1000,this,"_scrollIntoView",[this.oSelectedItem,0]);this._bDoThisOnlyOnce=true}else if(this._scrollAfterRendering){this._scrollIntoView(this.oSelectedItem,500);this._scrollAfterRendering=false}}var i=this.getItems();var t=[];var s=-1;var a=this;i.forEach(function(I){if(I instanceof sap.m.IconTabFilter){var o=a.getFocusDomRef(I);jQuery(o).attr("tabindex","-1");t.push(o);if(a===this.oSelectedItem){s=t.indexOf(I)}}});if(!this._oItemNavigation){this._oItemNavigation=new sap.ui.core.delegate.ItemNavigation();this.addDelegate(this._oItemNavigation)}this._oItemNavigation.setRootDomRef(h);this._oItemNavigation.setItemDomRefs(t);this._oItemNavigation.setSelectedIndex(s);this._sResizeListenerId=sap.ui.core.ResizeHandler.register(this.getDomRef(),jQuery.proxy(this._fnResize,this))};
sap.m.IconTabHeader.prototype.destroyItems=function(){this.oSelectedItem=null;this._aTabKeys=[];this.destroyAggregation("items")};
sap.m.IconTabHeader.prototype.addItem=function(i){if(!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();if(this._aTabKeys.indexOf(k)!==-1){jQuery.sap.log.warning("sap.m.IconTabHeader: duplicate key '"+k+"' inside the IconTabFilter. Please use unique keys.")}this._aTabKeys.push(k)}this.addAggregation("items",i)};
sap.m.IconTabHeader.prototype.insertItem=function(i,I){if(!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();if(this._aTabKeys.indexOf(k)!==-1){jQuery.sap.log.warning("sap.m.IconTabHeader: duplicate key '"+k+"' inside the IconTabFilter. Please use unique keys.")}this._aTabKeys.push(k)}this.insertAggregation("items",i,I)};
sap.m.IconTabHeader.prototype.removeAllItems=function(){this._aTabKeys=[];this.removeAllAggregation("items")};
sap.m.IconTabHeader.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(i&&!(i instanceof sap.m.IconTabSeparator)){var k=i.getKey();this._aTabKeys.splice(this._aTabKeys.indexOf(k),1)}return i};
sap.m.IconTabHeader.prototype._checkTextOnly=function(I){if(I.length>0){for(var i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)){if(I[i].getIcon()){this._bTextOnly=false;return false}}}}this._bTextOnly=true;return true};
sap.m.IconTabHeader.prototype._checkNoText=function(I){if(I.length>0){for(var i=0;i<I.length;i++){if(!(I[i]instanceof sap.m.IconTabSeparator)){if(I[i].getText().length>0){return false}}}}return true};
sap.m.IconTabHeader.prototype._checkScrolling=function(h,$){var s=false;if(this._bDoScroll){var d=this.getDomRef("scrollContainer");var a=this.getDomRef("head");if(a.offsetWidth>d.offsetWidth){s=true}}else{if(h){if(h.scrollWidth>h.clientWidth){s=true}}}if(this._scrollable!==s){$.toggleClass("sapMITBScrollable",s);$.toggleClass("sapMITBNotScrollable",!s);this._scrollable=s}return s};
sap.m.IconTabHeader.prototype._getScrollingArrow=function(n){var p={src:"sap-icon://navigation-"+n+"-arrow"};var c=["sapMITBArrowScroll","sapMITBArrowScrollLeft"];var C=["sapMITBArrowScroll","sapMITBArrowScrollRight"];if(n==="left"){if(!this._oArrowLeft){this._oArrowLeft=sap.m.ImageHelper.getImageControl(this.getId()+"-arrowScrollLeft",this._oArrowLeft,this,p,c)}return this._oArrowLeft}if(n==="right"){if(!this._oArrowRight){this._oArrowRight=sap.m.ImageHelper.getImageControl(this.getId()+"-arrowScrollRight",this._oArrowRight,this,p,C)}return this._oArrowRight}};
sap.m.IconTabHeader.prototype._checkOverflow=function(b,$){if(this._checkScrolling(b,$)&&b){var s=false;var S=false;if(this._bDoScroll){var d=this.getDomRef("scrollContainer");var a=this.getDomRef("head");if(this._oScroller.getScrollLeft()>0){s=true}if((this._oScroller.getScrollLeft()+d.offsetWidth)<a.offsetWidth){S=true}}else{var i=b.scrollLeft;var r=b.scrollWidth;var c=b.clientWidth;if(Math.abs(r-c)==1){r=c}if(!this._bRtl){if(i>0){s=true}if((r>c)&&(i+c<r)){S=true}}else{var l=jQuery(b);if(l.scrollLeftRTL()>0){S=true}if(l.scrollRightRTL()>0){s=true}}}if((S!=this._bPreviousScrollForward)||(s!=this._bPreviousScrollBack)){this._bPreviousScrollForward=S;this._bPreviousScrollBack=s;$.toggleClass("sapMITBScrollBack",s);$.toggleClass("sapMITBNoScrollBack",!s);$.toggleClass("sapMITBScrollForward",S);$.toggleClass("sapMITBNoScrollForward",!S)}}};
sap.m.IconTabHeader.prototype._handleActivation=function(e){var t=e.target.id,c=e.srcControl,C;var $=jQuery.sap.byId(t);if(jQuery.inArray(this.$("content")[0],$.parents())>-1){}else{if(t){var i=this.getId();e.preventDefault();if(t==i+"-arrowScrollLeft"&&sap.ui.Device.system.desktop){if(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8){var s=this._oScroller.getScrollLeft()-sap.m.IconTabHeader.SCROLL_STEP;if(s<0){s=0}this._scrollPreparation();jQuery.sap.delayedCall(0,this._oScroller,"scrollTo",[s,0,500]);jQuery.sap.delayedCall(500,this,"_afterIscroll")}else{this._scroll(-sap.m.IconTabHeader.SCROLL_STEP,500)}}else if(t==i+"-arrowScrollRight"&&sap.ui.Device.system.desktop){if(sap.ui.Device.os.windows&&sap.ui.Device.os.version===8){var s=this._oScroller.getScrollLeft()+sap.m.IconTabHeader.SCROLL_STEP;var a=this.$("scrollContainer").width();var h=this.$("head").width();if(s>(h-a)){s=h-a}this._scrollPreparation();jQuery.sap.delayedCall(0,this._oScroller,"scrollTo",[s,0,500]);jQuery.sap.delayedCall(500,this,"_afterIscroll")}else{this._scroll(sap.m.IconTabHeader.SCROLL_STEP,500)}}else{if(c instanceof sap.ui.core.Icon||c instanceof sap.m.Image){C=e.srcControl.getId().replace(/-icon$/,"");c=sap.ui.getCore().byId(C);if(!(c instanceof sap.m.IconTabSeparator)){this.setSelectedItem(c)}}else if(c.getMetadata().isInstanceOf("sap.m.IconTab")&&!(c instanceof sap.m.IconTabSeparator)){if(c.getShowAll()||this._bTextOnly&&t===c.getId()+"-text"){this.setSelectedItem(c)}}}}else{if(c.getMetadata().isInstanceOf("sap.m.IconTab")&&!(c instanceof sap.m.IconTabSeparator)&&c.getShowAll()){this.setSelectedItem(c)}}}};
sap.m.IconTabHeader.prototype._scrollIntoView=function(i,d){var $=i.$(),h,s,n,c;if($.length>0){var I=$.outerWidth();var a=$.position().left;if(this._bDoScroll){s=this._oScroller.getScrollLeft();c=this.$("scrollContainer").width();n=0;if(a-s<0||a-s>c-I){if(a-s<0){n+=a}else{n+=a+I-c}this._scrollPreparation();jQuery.sap.delayedCall(0,this._oScroller,"scrollTo",[n,0,d]);jQuery.sap.delayedCall(d,this,"_afterIscroll")}}else{h=this.getDomRef("head");s=h.scrollLeft;c=$.parent().width();n=s;if(a<0||a>c-I){if(a<0){n+=a}else{n+=a+I-c}this._scrollPreparation();jQuery(h).stop(true,true).animate({scrollLeft:n},d,jQuery.proxy(this._adjustAndShowArrow,this))}}this._iCurrentScrollLeft=n}return this};
sap.m.IconTabHeader.prototype._scroll=function(d,D){this._scrollPreparation();var o=this.getDomRef("head");var s=o.scrollLeft;if(!!!sap.ui.Device.browser.internet_explorer&&this._bRtl){d=-d}var S=s+d;jQuery(o).stop(true,true).animate({scrollLeft:S},D,jQuery.proxy(this._adjustAndShowArrow,this));this._iCurrentScrollLeft=S};
sap.m.IconTabHeader.prototype._adjustAndShowArrow=function(){this._$bar&&this._$bar.toggleClass("sapMITBScrolling",false);this._$bar=null;if(sap.ui.Device.system.desktop){this._checkOverflow(this.getDomRef("head"),this.$())}};
sap.m.IconTabHeader.prototype._scrollPreparation=function(){if(!this._$bar){this._$bar=this.$().toggleClass("sapMITBScrolling",true)}};
sap.m.IconTabHeader.prototype._afterIscroll=function(){var h=this.getDomRef("head");this._checkOverflow(h,this.$());this._adjustAndShowArrow()};
sap.m.IconTabHeader.prototype._fnResize=function(){var h=this.getDomRef("head");this._checkOverflow(h,this.$())};
sap.m.IconTabHeader.prototype.getFocusDomRef=function(f){var t=f||this.oSelectedItem;if(!t){return null}if(!this._bTextOnly){if(t.getShowAll()){return t.getDomRef()}return t.getDomRef("icon")}return t.getDomRef("text")};
sap.m.IconTabHeader.prototype.applyFocusInfo=function(f){if(f.focusDomRef){jQuery(f.focusDomRef).focus()}};
sap.m.IconTabHeader.prototype.ontouchstart=function(e){var t=e.targetTouches[0];this._iActiveTouch=t.identifier;this._iTouchStartPageX=t.pageX;this._iTouchDragX=0};
sap.m.IconTabHeader.prototype.ontouchmove=function(e){var t=sap.m.touch.find(e.changedTouches,this._iActiveTouch);if(!t||t.pageX===this._iTouchStartPageX){return}this._iTouchDragX+=Math.abs(this._iTouchStartPageX-t.pageX);this._iTouchStartPageX=t.pageX};
sap.m.IconTabHeader.prototype.ontouchend=function(e){if(this._iTouchDragX>5||e.isMarked()){return}this._handleActivation(e)};
sap.m.IconTabHeader.prototype.ontouchcancel=sap.m.IconTabHeader.prototype.ontouchend;
sap.m.IconTabHeader.prototype.onsapselect=function(e){this._handleActivation(e)};
