/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2014 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.m.ViewSettingsDialog");jQuery.sap.require("sap.m.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.m.ViewSettingsDialog",{metadata:{publicMethods:["open","getSelectedFilters","getSelectedFilterString","getSelectedFilterKeys","setSelectedFilterKeys"],library:"sap.m",properties:{"title":{type:"string",group:"Behavior",defaultValue:null},"sortDescending":{type:"boolean",group:"Behavior",defaultValue:false},"groupDescending":{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{"sortItems":{type:"sap.m.ViewSettingsItem",multiple:true,singularName:"sortItem",bindable:"bindable"},"groupItems":{type:"sap.m.ViewSettingsItem",multiple:true,singularName:"groupItem",bindable:"bindable"},"filterItems":{type:"sap.m.ViewSettingsItem",multiple:true,singularName:"filterItem",bindable:"bindable"},"presetFilterItems":{type:"sap.m.ViewSettingsItem",multiple:true,singularName:"presetFilterItem",bindable:"bindable"}},associations:{"selectedSortItem":{type:"sap.m.ViewSettingsItem",multiple:false},"selectedGroupItem":{type:"sap.m.ViewSettingsItem",multiple:false},"selectedPresetFilterItem":{type:"sap.m.ViewSettingsItem",multiple:false}},events:{"confirm":{},"cancel":{},"resetFilters":{}}}});sap.m.ViewSettingsDialog.M_EVENTS={'confirm':'confirm','cancel':'cancel','resetFilters':'resetFilters'};jQuery.sap.require("sap.ui.core.IconPool");
sap.m.ViewSettingsDialog.prototype.init=function(){this._rb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sDialogWidth="350px";this._sDialogHeight="434px";this._bAppendedToUIArea=false;this._showSubHeader=false;this._filterDetailList=undefined;this._iContentPage=-1;this._oContentItem=null;this._oPreviousState={}};
sap.m.ViewSettingsDialog.prototype.exit=function(){this._rb=null;this._sDialogWidth=null;this._sDialogHeight=null;this._bAppendedToUIArea=null;this._showSubHeader=null;this._iContentPage=null;this._oContentItem=null;this._oPreviousState=null;this._sortContent=null;this._groupContent=null;this._filterContent=null;if(this._dialog){this._dialog.destroy();this._dialog=null}if(this._navContainer){this._navContainer.destroy();this._navContainer=null}if(this._titleLabel){this._titleLabel.destroy();this._titleLabel=null}if(this._page1){this._page1.destroy();this._page1=null}if(this._header){this._header.destroy();this._header=null}if(this._resetButton){this._resetButton.destroy();this._resetButton=null}if(this._subHeader){this._subHeader.destroy();this._subHeader=null}if(this._segmentedButton){this._segmentedButton.destroy();this._segmentedButton=null}if(this._sortButton){this._sortButton.destroy();this._sortButton=null}if(this._groupButton){this._groupButton.destroy();this._groupButton=null}if(this._filterButton){this._filterButton.destroy();this._filterButton=null}if(this._sortList){this._sortList.destroy();this._sortList=null}if(this._sortOrderList){this._sortOrderList.destroy();this._sortOrderList=null}if(this._groupList){this._groupList.destroy();this._groupList=null}if(this._groupOrderList){this._groupOrderList.destroy();this._groupOrderList=null}if(this._presetFilterList){this._presetFilterList.destroy();this._presetFilterList=null}if(this._filterList){this._filterList.destroy();this._filterList=null}if(this._page2){this._page2.destroy();this._page2=null}if(this._detailTitleLabel){this._detailTitleLabel.destroy();this._detailTitleLabel=null}if(this._filterDetailList){this._filterDetailList.destroy();this._filterDetailList=null}};
sap.m.ViewSettingsDialog.prototype.invalidate=function(){if(this._dialog&&(!arguments[0]||arguments[0]&&arguments[0].getId()!==this.getId()+"-dialog")){this._dialog.invalidate(arguments)}else{sap.ui.core.Control.prototype.invalidate.apply(this,arguments)}};
sap.m.ViewSettingsDialog.prototype.addStyleClass=function(){var d=this._getDialog();d.addStyleClass.apply(d,arguments);return this};
sap.m.ViewSettingsDialog.prototype.removeStyleClass=function(){var d=this._getDialog();d.removeStyleClass.apply(d,arguments);return this};
sap.m.ViewSettingsDialog.prototype.toggleStyleClass=function(){var d=this._getDialog();d.toggleStyleClass.apply(d,arguments);return this};
sap.m.ViewSettingsDialog.prototype.hasStyleClass=function(){var d=this._getDialog();return d.hasStyleClass.apply(d,arguments)};
sap.m.ViewSettingsDialog.prototype.getDomRef=function(){if(this._dialog){return this._dialog.getDomRef.apply(this._dialog,arguments)}else{return null}};
sap.m.ViewSettingsDialog.prototype.setTitle=function(t){this._getTitleLabel().setText(t);this.setProperty("title",t,true);return this};
sap.m.ViewSettingsDialog.prototype.addSortItem=function(i){if(i.getSelected()){this.setSelectedSortItem(i)}this.addAggregation("sortItems",i);return this};
sap.m.ViewSettingsDialog.prototype.addGroupItem=function(i){if(i.getSelected()){this.setSelectedGroupItem(i)}this.addAggregation("groupItems",i);return this};
sap.m.ViewSettingsDialog.prototype.addPresetFilterItem=function(i){if(i.getSelected()){this.setSelectedPresetFilterItem(i)}this.addAggregation("presetFilterItems",i);return this};
sap.m.ViewSettingsDialog.prototype.setSelectedSortItem=function(I){var a=this.getSortItems(),i=0;if(typeof I==="string"){for(;i<a.length;i++){if(a[i].getKey()===I){I=a[i];break}}}for(i=0;i<a.length;i++){a[i].setSelected(false)}if(I){I.setSelected(true)}if(this._getDialog().isOpen()){this._updateListSelection(this._sortList,I)}this.setAssociation("selectedSortItem",I,true);return this};
sap.m.ViewSettingsDialog.prototype.setSelectedGroupItem=function(I){var a=this.getGroupItems(),i=0;if(typeof I==="string"){for(;i<a.length;i++){if(a[i].getKey()===I){I=a[i];break}}}for(i=0;i<a.length;i++){a[i].setSelected(false)}if(I){I.setSelected(true)}if(this._getDialog().isOpen()){this._updateListSelection(this._groupList,I)}this.setAssociation("selectedGroupItem",I,true);return this};
sap.m.ViewSettingsDialog.prototype.setSelectedPresetFilterItem=function(I){var a=this.getPresetFilterItems(),i=0;if(typeof I==="string"){for(;i<a.length;i++){if(a[i].getKey()===I){I=a[i];break}}}for(i=0;i<a.length;i++){a[i].setSelected(false)}if(I){I.setSelected(true);this._clearSelectedFilters()}this.setAssociation("selectedPresetFilterItem",I,true);return this};
sap.m.ViewSettingsDialog.prototype.open=function(p){if(!this.getParent()&&!this._bAppendedToUIArea){var s=sap.ui.getCore().getStaticAreaRef();s=sap.ui.getCore().getUIArea(s);s.addContent(this,true);this._bAppendedToUIArea=true}this._initDialogContent();this._oPreviousState={sortItem:sap.ui.getCore().byId(this.getSelectedSortItem()),sortDescending:this.getSortDescending(),groupItem:sap.ui.getCore().byId(this.getSelectedGroupItem()),groupDescending:this.getGroupDescending(),presetFilterItem:sap.ui.getCore().byId(this.getSelectedPresetFilterItem()),filterKeys:this.getSelectedFilterKeys(),navPage:this._getNavContainer().getCurrentPage(),contentPage:this._iContentPage,contentItem:this._oContentItem};this._getDialog().setInitialFocus((sap.ui.Device.system.desktop&&this._showSubHeader)?this._segmentedButton:null);this._getDialog().open();return this};
sap.m.ViewSettingsDialog.prototype.getSelectedFilterItems=function(){var s=[],f=this.getFilterItems(),S,m=true,i=0,j;for(;i<f.length;i++){if(f[i]instanceof sap.m.ViewSettingsCustomItem){if(f[i].getSelected()){s.push(f[i])}}else if(f[i]instanceof sap.m.ViewSettingsFilterItem){S=f[i].getItems();m=f[i].getMultiSelect();for(j=0;j<S.length;j++){if(S[j].getSelected()){s.push(S[j]);if(!m){break}}}}}return s};
sap.m.ViewSettingsDialog.prototype.getSelectedFilterString=function(){var f="",s,p=this.getSelectedPresetFilterItem(),F=this.getFilterItems(),S,m=true,i=0,j;if(p){f=this._rb.getText("VIEWSETTINGS_FILTERTEXT").concat(" "+sap.ui.getCore().byId(p).getText())}else{for(;i<F.length;i++){if(F[i]instanceof sap.m.ViewSettingsCustomItem){if(F[i].getSelected()){f+=F[i].getText()+", "}}else if(F[i]instanceof sap.m.ViewSettingsFilterItem){S=F[i].getItems();m=F[i].getMultiSelect();s="";for(j=0;j<S.length;j++){if(S[j].getSelected()){s+=S[j].getText()+", ";if(!m){break}}}s=s.substring(0,s.length-2);if(s){s=" ("+s+")";f+=F[i].getText()+s+", "}}}f=f.substring(0,f.length-2);if(f){f=this._rb.getText("VIEWSETTINGS_FILTERTEXT").concat(" "+f)}}return f};
sap.m.ViewSettingsDialog.prototype.getSelectedFilterKeys=function(){var s={},S=this.getSelectedFilterItems(),i=0;for(;i<S.length;i++){s[S[i].getKey()]=S[i].getSelected()}return s};
sap.m.ViewSettingsDialog.prototype.setSelectedFilterKeys=function(s){var K="",f=this.getFilterItems(),S={},F,m,i,j,k;if(Object.keys(s).length){this._clearPresetFilter()}for(K in s){F=null;if(s.hasOwnProperty(K)){for(i=0;i<f.length;i++){if(f[i]instanceof sap.m.ViewSettingsCustomItem){if(f[i].getKey()===K){F=f[i];f[i].setSelected(s[K])}}else if(f[i]instanceof sap.m.ViewSettingsFilterItem){S=f[i].getItems();m=f[i].getMultiSelect();for(j=0;j<S.length;j++){if(S[j].getKey()===K){F=S[j];if(!m){for(k=0;k<S.length;k++){S[k].setSelected(false)}}break}}}if(F){break}}if(F===null){jQuery.sap.log.warning('Cannot set state for key "'+K+'" because there is no filter with these keys');continue}F.setSelected(s[K])}}return this};
sap.m.ViewSettingsDialog.prototype._getDialog=function(){var t=this;if(this._dialog===undefined){this._dialog=new sap.m.Dialog(this.getId()+"-dialog",{showHeader:false,stretch:sap.ui.Device.system.phone,verticalScrolling:true,horizontalScrolling:false,contentWidth:this._sDialogWidth,contentHeight:this._sDialogHeight,content:this._getNavContainer(),beginButton:new sap.m.Button({text:this._rb.getText("VIEWSETTINGS_ACCEPT")}).attachPress(this._onConfirm,this),endButton:new sap.m.Button({text:this._rb.getText("VIEWSETTINGS_CANCEL")}).attachPress(this._onCancel,this)}).addStyleClass("sapMVSD");var d=this._dialog.onsapescape;this._dialog.onsapescape=function(e){if(d){d.call(t._dialog,e)}t._onCancel()}}return this._dialog};
sap.m.ViewSettingsDialog.prototype._getNavContainer=function(){if(this._navContainer===undefined){this._navContainer=new sap.m.NavContainer(this.getId()+'-navcontainer',{pages:[]})}return this._navContainer};
sap.m.ViewSettingsDialog.prototype._getTitleLabel=function(){if(this._titleLabel===undefined){this._titleLabel=new sap.m.Label(this.getId()+"-title",{text:this._rb.getText("VIEWSETTINGS_TITLE")}).addStyleClass("sapMVSDTitle")}return this._titleLabel};
sap.m.ViewSettingsDialog.prototype._getResetButton=function(){var t=this;if(this._resetButton===undefined){this._resetButton=new sap.m.Button(this.getId()+"-resetbutton",{icon:sap.ui.core.IconPool.getIconURI("refresh"),press:function(){t._onClearFilters()},tooltip:this._rb.getText("VIEWSETTINGS_CLEAR_FILTER_TOOLTIP")})}return this._resetButton};
sap.m.ViewSettingsDialog.prototype._getDetailTitleLabel=function(){if(this._detailTitleLabel===undefined){this._detailTitleLabel=new sap.m.Label(this.getId()+"-detailtitle",{text:this._rb.getText("VIEWSETTINGS_TITLE_FILTERBY")}).addStyleClass("sapMVSDTitle")}return this._detailTitleLabel};
sap.m.ViewSettingsDialog.prototype._getHeader=function(){if(this._header===undefined){this._header=new sap.m.Bar({contentMiddle:[this._getTitleLabel()],}).addStyleClass("sapMVSDBar")}return this._header};
sap.m.ViewSettingsDialog.prototype._getSubHeader=function(){if(this._subHeader===undefined){this._subHeader=new sap.m.Bar({contentLeft:[this._getSegmentedButton()]}).addStyleClass("sapMVSDBar")}return this._subHeader};
sap.m.ViewSettingsDialog.prototype._getSegmentedButton=function(){var t=this;if(this._segmentedButton===undefined){this._segmentedButton=new sap.m.SegmentedButton({select:function(e){var s=e.getParameter('id');if(s===t.getId()+"-sortbutton"){t._switchToPage(0)}else if(s===t.getId()+"-groupbutton"){t._switchToPage(1)}else if(s===t.getId()+"-filterbutton"){t._switchToPage(2)}jQuery.sap.log.info('press event segmented: '+e.getParameter('id'))}}).addStyleClass("sapMVSDSeg");this._segmentedButton._fCalcBtnWidth=function(){}}return this._segmentedButton};
sap.m.ViewSettingsDialog.prototype._getSortButton=function(){if(this._sortButton===undefined){this._sortButton=new sap.m.Button(this.getId()+"-sortbutton",{visible:false,icon:sap.ui.core.IconPool.getIconURI("sort"),tooltip:this._rb.getText("VIEWSETTINGS_TITLE_SORT")})}return this._sortButton};
sap.m.ViewSettingsDialog.prototype._getGroupButton=function(){if(this._groupButton===undefined){this._groupButton=new sap.m.Button(this.getId()+"-groupbutton",{visible:false,icon:sap.ui.core.IconPool.getIconURI("group-2"),tooltip:this._rb.getText("VIEWSETTINGS_TITLE_GROUP")})}return this._groupButton};
sap.m.ViewSettingsDialog.prototype._getFilterButton=function(){if(this._filterButton===undefined){this._filterButton=new sap.m.Button(this.getId()+"-filterbutton",{visible:false,icon:sap.ui.core.IconPool.getIconURI("filter"),tooltip:this._rb.getText("VIEWSETTINGS_TITLE_FILTER")})}return this._filterButton};
sap.m.ViewSettingsDialog.prototype._getPage1=function(){if(this._page1===undefined){this._page1=new sap.m.Page(this.getId()+'-page1',{title:this._rb.getText("VIEWSETTINGS_TITLE"),customHeader:this._getHeader()});this._getNavContainer().addPage(this._page1)}return this._page1};
sap.m.ViewSettingsDialog.prototype._getPage2=function(){var t=this,d,b,D;if(this._page2===undefined){b=new sap.m.Button(this.getId()+"-backbutton",{icon:sap.ui.core.IconPool.getIconURI("nav-back"),press:function(){t._updateFilterCounters();jQuery.sap.delayedCall(0,t._navContainer,"back");t._switchToPage(2);t._segmentedButton.setSelectedButton(t._filterButton)}});D=new sap.m.Button(this.getId()+"-detailresetbutton",{icon:sap.ui.core.IconPool.getIconURI("refresh"),press:function(){t._onClearFilters()},tooltip:this._rb.getText("VIEWSETTINGS_CLEAR_FILTER_TOOLTIP")});d=new sap.m.Bar({contentLeft:[b],contentMiddle:[this._getDetailTitleLabel()],contentRight:[D]}).addStyleClass("sapMVSDBar");this._page2=new sap.m.Page(this.getId()+'-page2',{title:this._rb.getText("VIEWSETTINGS_TITLE_FILTERBY"),customHeader:d});this._getNavContainer().addPage(this._page2)}return this._page2};
sap.m.ViewSettingsDialog.prototype._initSortContent=function(){var t=this;if(this._sortContent){return}this._sortOrderList=new sap.m.List(this.getId()+"-sortorderlist",{mode:sap.m.ListMode.SingleSelectLeft,includeItemInSelection:true,selectionChange:function(e){t.setSortDescending(e.getParameter("listItem").data("item"))}}).addStyleClass("sapMVSDUpperList");this._sortOrderList.addItem(new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_ASCENDING_ITEM")}).data("item",false).setSelected(true));this._sortOrderList.addItem(new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_DESCENDING_ITEM")}).data("item",true));this._sortList=new sap.m.List(this.getId()+"-sortlist",{mode:sap.m.ListMode.SingleSelectLeft,includeItemInSelection:true,selectionChange:function(e){var i=e.getParameter("listItem").data("item");if(i){i.setSelected(e.getParameter("listItem").getSelected())}t.setAssociation("selectedSortItem",i,true)}});this._sortContent=[this._sortOrderList,this._sortList]};
sap.m.ViewSettingsDialog.prototype._initGroupContent=function(){var t=this;if(this._groupContent){return}this._groupOrderList=new sap.m.List(this.getId()+"-grouporderlist",{mode:sap.m.ListMode.SingleSelectLeft,includeItemInSelection:true,selectionChange:function(e){t.setGroupDescending(e.getParameter("listItem").data("item"))}}).addStyleClass("sapMVSDUpperList");this._groupOrderList.addItem(new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_ASCENDING_ITEM")}).data("item",false).setSelected(true));this._groupOrderList.addItem(new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_DESCENDING_ITEM")}).data("item",true));this._groupList=new sap.m.List(this.getId()+"-grouplist",{mode:sap.m.ListMode.SingleSelectLeft,includeItemInSelection:true,selectionChange:function(e){var i=e.getParameter("listItem").data("item");if(i){i.setSelected(e.getParameter("listItem").getSelected())}t.setAssociation("selectedGroupItem",i,true)}});this._groupContent=[this._groupOrderList,this._groupList]};
sap.m.ViewSettingsDialog.prototype._initFilterContent=function(){var t=this;if(this._filterContent){return}this._presetFilterList=new sap.m.List(this.getId()+"-predefinedfilterlist",{mode:sap.m.ListMode.SingleSelectLeft,includeItemInSelection:true,selectionChange:function(e){var i=e.getParameter("listItem").data("item");if(i){i.setSelected(e.getParameter("listItem").getSelected())}t.setAssociation("selectedPresetFilterItem",i,true);t._clearSelectedFilters()}}).addStyleClass("sapMVSDUpperList");this._filterList=new sap.m.List(this.getId()+"-filterlist",{});this._filterContent=[this._presetFilterList,this._filterList]};
sap.m.ViewSettingsDialog.prototype._initDialogContent=function(){var s=!!this.getSortItems().length,g=!!this.getGroupItems().length,p=!!this.getPresetFilterItems().length,f=!!this.getFilterItems().length,t=this,l,S=[],G=[],P=[],F=[];if(s){this._initSortContent();this._sortList.removeAllItems();S=this.getSortItems();if(S.length){S.forEach(function(i){l=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,selected:i.getSelected()}).data("item",i);this._sortList.addItem(l)},this)}}if(g){this._initGroupContent();this._groupList.removeAllItems();G=this.getGroupItems();if(G.length){G.forEach(function(i){l=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,selected:i.getSelected()}).data("item",i);this._groupList.addItem(l)},this)}if(G.length){l=new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_NONE_ITEM"),type:sap.m.ListType.Active,selected:!!this.getSelectedGroupItem()});this._groupList.addItem(l)}}if(p||f){this._initFilterContent();this._presetFilterList.removeAllItems();P=this.getPresetFilterItems();if(P.length){P.forEach(function(i){l=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,selected:i.getSelected()}).data("item",i);this._presetFilterList.addItem(l)},this)}if(P.length){l=new sap.m.StandardListItem({title:this._rb.getText("VIEWSETTINGS_NONE_ITEM"),selected:!!this.getSelectedPresetFilterItem()});this._presetFilterList.addItem(l)}this._filterList.removeAllItems();F=this.getFilterItems();if(F.length){F.forEach(function(i){l=new sap.m.StandardListItem({title:i.getText(),type:sap.m.ListType.Active,press:function(i){return function(e){if(t._navContainer.getCurrentPage().getId()!==t.getId()+'-page2'){t._switchToPage(3,i);jQuery.sap.delayedCall(0,t._navContainer,"to",[t.getId()+'-page2',"slide"])}}}(i)}).data("item",i);this._filterList.addItem(l)},this)}}this._updateDialogState();this._updateListSelections()};
sap.m.ViewSettingsDialog.prototype._updateDialogState=function(){var s=!!this.getSortItems().length,g=!!this.getGroupItems().length,p=!!this.getPresetFilterItems().length,f=!!this.getFilterItems().length,n=!s&&!g&&!p&&!f,i=false,a=0,S=this._getSegmentedButton();S.removeAllButtons();if(this._filterContent){this._presetFilterList.setVisible(true);this._filterList.setVisible(true)}if(this._iContentPage===-1||this._iContentPage===0&&!s||this._iContentPage===1&&!g||this._iContentPage===2&&!(p||f)){i=true}if(s){S.addButton(this._getSortButton());if(this._iContentPage===0){S.setSelectedButton(this._getSortButton())}a++}if(p||f){S.addButton(this._getFilterButton());if(this._iContentPage===2){S.setSelectedButton(this._getFilterButton())}if(!p){this._presetFilterList.setVisible(false);this._presetFilterList.addStyleClass("sapMVSDUpperList")}if(!f){this._filterList.setVisible(false);this._presetFilterList.removeStyleClass("sapMVSDUpperList")}a++}if(g){S.addButton(this._getGroupButton());if(this._iContentPage===1){S.setSelectedButton(this._getGroupButton())}a++}this._showSubHeader=(a>1?true:false);if(i){if(s||n){this._switchToPage(0)}else if(p||f){this._switchToPage(2)}else if(g){this._switchToPage(1)}}if(this._iContentPage===3){this._iContentPage=-1;this._switchToPage(3,this._oContentItem)}};
sap.m.ViewSettingsDialog.prototype._switchToPage=function(w,I){var i=0,t=this,s=[],T=this._getTitleLabel(),r=this._getResetButton(),h=this._getHeader(),S=this._getSubHeader(),l;if(this._iContentPage===w&&w!==3){return false}h.removeAllContentRight();S.removeAllContentRight();this._iContentPage=w;this._oContentItem=I;if(w>=0&&w<3){this._getPage1().removeAllAggregation("content",true);if(this._showSubHeader){if(!this._getPage1().getSubHeader()){this._getPage1().setSubHeader(S)}S.addContentRight(r)}else{if(this._getPage1().getSubHeader()){this._getPage1().setSubHeader()}h.addContentRight(r)}}else if(w===3){this._getPage2().removeAllAggregation("content",true)}if(this.getTitle()){T.setText(this.getTitle())}else{T.setText(this._rb.getText("VIEWSETTINGS_TITLE"))}switch(w){case 1:r.setVisible(false);if(!this._showSubHeader&&!this.getTitle()){T.setText(this._rb.getText("VIEWSETTINGS_TITLE_GROUP"))}for(;i<this._groupContent.length;i++){this._getPage1().addContent(this._groupContent[i])}break;case 2:r.setVisible(!!this.getFilterItems().length);if(!this._showSubHeader&&!this.getTitle()){T.setText(this._rb.getText("VIEWSETTINGS_TITLE_FILTER"))}this._updateListSelection(this._presetFilterList,sap.ui.getCore().byId(this.getSelectedPresetFilterItem()));this._updateFilterCounters();for(;i<this._filterContent.length;i++){this._getPage1().addContent(this._filterContent[i])}break;case 3:this._getDetailTitleLabel().setText(this._rb.getText("VIEWSETTINGS_TITLE_FILTERBY")+" "+I.getText());if(I instanceof sap.m.ViewSettingsCustomItem&&I.getCustomControl()){this._clearPresetFilter();this._getPage2().addContent(I.getCustomControl())}else if(I instanceof sap.m.ViewSettingsFilterItem&&I.getItems()){s=I.getItems();if(this._filterDetailList){this._filterDetailList.destroy()}this._filterDetailList=new sap.m.List({mode:(I.getMultiSelect()?sap.m.ListMode.MultiSelect:sap.m.ListMode.SingleSelectLeft),includeItemInSelection:true,selectionChange:function(e){var o=e.getParameter("listItem").data("item"),a,i=0;t._clearPresetFilter();if(!I.getMultiSelect()){a=I.getItems();for(;i<a.length;i++){a[i].setSelected(false)}}o.setSelected(e.getParameter("listItem").getSelected())}});for(i=0;i<s.length;i++){l=new sap.m.StandardListItem({title:s[i].getText(),type:sap.m.ListType.Active,selected:s[i].getSelected()}).data("item",s[i]);this._filterDetailList.addItem(l)}this._getPage2().addContent(this._filterDetailList)}break;case 0:default:r.setVisible(false);if(!this._getPage1().getSubHeader()&&!this.getTitle()){T.setText(this._rb.getText("VIEWSETTINGS_TITLE_SORT"))}if(this._sortContent){for(;i<this._sortContent.length;i++){this._getPage1().addContent(this._sortContent[i])}}break}};
sap.m.ViewSettingsDialog.prototype._updateListSelections=function(){this._updateListSelection(this._sortList,sap.ui.getCore().byId(this.getSelectedSortItem()));this._updateListSelection(this._sortOrderList,this.getSortDescending());this._updateListSelection(this._groupList,sap.ui.getCore().byId(this.getSelectedGroupItem()));this._updateListSelection(this._groupOrderList,this.getGroupDescending());this._updateListSelection(this._presetFilterList,sap.ui.getCore().byId(this.getSelectedPresetFilterItem()));this._updateFilterCounters()};
sap.m.ViewSettingsDialog.prototype._updateListSelection=function(l,I){var a,i=0;if(!l){return false}a=l.getItems();l.removeSelections();for(;i<a.length;i++){if(a[i].data("item")===I||a[i].data("item")===null){l.setSelectedItem(a[i],(I&&I.getSelected?I.getSelected():true));return true}}return false};
sap.m.ViewSettingsDialog.prototype._updateFilterCounters=function(){var l=(this._filterList?this._filterList.getItems():[]),I,s,f=0,i=0,j;for(;i<l.length;i++){I=l[i].data("item");f=0;if(I){if(I instanceof sap.m.ViewSettingsCustomItem){f=I.getFilterCount()}else if(I instanceof sap.m.ViewSettingsFilterItem){f=0;s=I.getItems();for(j=0;j<s.length;j++){if(s[j].getSelected()){f++}}}}l[i].setCounter(f)}};
sap.m.ViewSettingsDialog.prototype._clearSelectedFilters=function(){var a=this.getFilterItems(),s,i=0,j;for(;i<a.length;i++){if(a[i]instanceof sap.m.ViewSettingsFilterItem){s=a[i].getItems();for(j=0;j<s.length;j++){s[j].setSelected(false)}}a[i].setSelected(false)}if(this._iContentPage===2&&this._getDialog().isOpen()){this._updateFilterCounters()}};
sap.m.ViewSettingsDialog.prototype._clearPresetFilter=function(){if(this.getSelectedPresetFilterItem()){this.setSelectedPresetFilterItem(null)}};
sap.m.ViewSettingsDialog.prototype._onConfirm=function(e){var t=this,d=this._getDialog(),a=function(){t._dialog.detachAfterClose(a);t.fireConfirm({sortItem:sap.ui.getCore().byId(t.getSelectedSortItem()),sortDescending:t.getSortDescending(),groupItem:sap.ui.getCore().byId(t.getSelectedGroupItem()),groupDescending:t.getGroupDescending(),presetFilterItem:sap.ui.getCore().byId(t.getSelectedPresetFilterItem()),filterItems:t.getSelectedFilterItems(),filterKeys:t.getSelectedFilterKeys(),filterString:t.getSelectedFilterString()})};d.attachAfterClose(a);d.close()};
sap.m.ViewSettingsDialog.prototype._onCancel=function(e){var t=this,d=this._getDialog(),a=function(){t.setSelectedSortItem(t._oPreviousState.sortItem);t.setSortDescending(t._oPreviousState.sortDescending);t.setSelectedGroupItem(t._oPreviousState.groupItem);t.setGroupDescending(t._oPreviousState.groupDescending);t.setSelectedPresetFilterItem(t._oPreviousState.presetFilterItem);t._clearSelectedFilters();t.setSelectedFilterKeys(t._oPreviousState.filterKeys);if(t._navContainer.getCurrentPage()!==t._oPreviousState.navPage){jQuery.sap.delayedCall(0,t._navContainer,"to",[t._oPreviousState.navPage.getId(),"show"])}t._switchToPage(t._oPreviousState.contentPage,t._oPreviousState.contentItem);t._dialog.detachAfterClose(a);t.fireCancel()};d.attachAfterClose(a);d.close()};
sap.m.ViewSettingsDialog.prototype._onClearFilters=function(){this._clearSelectedFilters();this._clearPresetFilter();this.fireResetFilters();this._updateFilterCounters();if(this._iContentPage===3){jQuery.sap.delayedCall(0,this._getNavContainer(),"back");this._switchToPage(2);this._getSegmentedButton().setSelectedButton(this._getFilterButton())}this._updateListSelection(this._presetFilterList,sap.ui.getCore().byId(this.getSelectedPresetFilterItem()))};
