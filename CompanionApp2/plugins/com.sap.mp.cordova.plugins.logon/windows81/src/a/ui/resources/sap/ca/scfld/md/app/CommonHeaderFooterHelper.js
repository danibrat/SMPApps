/*
 * Copyright (C) 2009-2013 SAP AG or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.scfld.md.app.CommonHeaderFooterHelper");jQuery.sap.require("sap.ushell.ui.footerbar.JamShareButton");jQuery.sap.require("sap.ushell.ui.footerbar.JamDiscussButton");jQuery.sap.require("sap.ushell.ui.footerbar.AddBookmarkButton");jQuery.sap.require("sap.ca.scfld.md.app.ButtonListHelper");jQuery.sap.require("sap.ushell.services.AppConfiguration");sap.ui.base.Object.extend("sap.ca.scfld.md.app.CommonHeaderFooterHelper",{constructor:function(a,d){this.oAppImp=a;this.detailHeaderFooterRules=d},startBuild:function(c,o,s,k){c._oHeaderFooterOptions=o;var p=c.getPage();if(c._oControlStore){c._oControlStore.oButtonListHelper.startBuild(k)}else{c._oControlStore={};if(s){jQuery.extend(c._oControlStore,s)}c._oControlStore.oButtonListHelper=new sap.ca.scfld.md.app.ButtonListHelper(this.oAppImp,20,c._oControlStore.bAllDisabled);this.oAppImp.registerExitModule(function(){c._oControlStore.oButtonListHelper.destroy()});var f=p.getFooter();if(f&&f.destroy){f.destroy()}p.setFooter(c._oControlStore.oButtonListHelper.oBar)}return p},endBuild:function(c){c._oControlStore.oButtonListHelper.endBuild()},defineFooterRight:function(c,p,f,I,b){var h=false;if(c._oHeaderFooterOptions.oEditBtn){var B={};jQuery.extend(B,c._oHeaderFooterOptions.oEditBtn);B.style=sap.m.ButtonType.Emphasized;c._oControlStore.oButtonListHelper.ensureButton(B,"b",f);h=true}else{if(c._oHeaderFooterOptions.oPositiveAction){var B={};jQuery.extend(B,c._oHeaderFooterOptions.oPositiveAction);B.style=sap.m.ButtonType.Accept;c._oControlStore.oButtonListHelper.ensureButton(B,"b",f);h=true}if(c._oHeaderFooterOptions.oNegativeAction){var B={};jQuery.extend(B,c._oHeaderFooterOptions.oNegativeAction);B.style=sap.m.ButtonType.Reject;c._oControlStore.oButtonListHelper.ensureButton(B,"b",f);h=true}}if(c._oHeaderFooterOptions.buttonList){for(var i=0;i<c._oHeaderFooterOptions.buttonList.length;i++){var B={};jQuery.extend(B,c._oHeaderFooterOptions.buttonList[i]);B.style=sap.m.ButtonType.Default;c._oControlStore.oButtonListHelper.ensureButton(B,"b",f);h=true}}if(I){var g=this.getGenericButtons(f,c,c._oControlStore.oButtonListHelper);h=h||g.length>0}h=this.defineShareButton(c)||h;return h},defineShareButton:function(c){var b=this.getShareButtons(c);if(b.length==0){return false}if(!c._oControlStore.oShareSheet){c._oControlStore.oShareSheet=new sap.m.ActionSheet();c._oControlStore.oShareSheet.setShowCancelButton(true);c._oControlStore.oShareSheet.setPlacement(sap.m.PlacementType.Top)}else{c._oControlStore.oShareSheet.removeAllButtons()}var B={sIcon:"sap-icon://action",onBtnPressed:function(e){if(c._oHeaderFooterOptions.oJamOptions){if(c._oHeaderFooterOptions.oJamOptions.fGetShareSettings){var s=c._oHeaderFooterOptions.oJamOptions.fGetShareSettings();if(s){c._oControlStore.oJamShareButton.setJamData(s)}}if(c._oHeaderFooterOptions.oJamOptions.fGetDiscussSettings){var d=c._oHeaderFooterOptions.oJamOptions.fGetDiscussSettings();if(d){c._oControlStore.oJamDiscussButton.setJamData(d)}}}c._oControlStore.oShareSheet.openBy(e.getSource())}};c._oControlStore.oButtonListHelper.ensureButton(B,"b");for(var i=0;i<b.length;i++){c._oControlStore.oShareSheet.addButton(b[i])}return true},hasShareButtons:function(c){return c.isMainScreen()||!!(c._oHeaderFooterOptions.oEmailSettings||(c._oHeaderFooterOptions.oJamOptions&&(c._oHeaderFooterOptions.oJamOptions.oShareSettings||c._oHeaderFooterOptions.oJamOptions.fGetShareSettings||c._oHeaderFooterOptions.oJamOptions.oDiscussSettings||c._oHeaderFooterOptions.oJamOptions.fGetDiscussSettings))||c._oHeaderFooterOptions.oAddBookmarkSettings||(c._oHeaderFooterOptions.additionalShareButtonList&&c._oHeaderFooterOptions.additionalShareButtonList.length>0))},getShareButtons:function(c){var r=[];var e=this.getEmailButton(c);var j=this.getJamShareButton(c);var J=this.getJamDiscussButton(c);var b=this.getBookmarkButton(c);if(e){r.push(e)}if(j){r.push(j)}if(J){r.push(J)}if(b){r.push(b)}if(c._oHeaderFooterOptions.additionalShareButtonList){var a=this.getAdditionalShareButtons(c);r=r.concat(a)}return r},getEmailButton:function(c){if(!c._oHeaderFooterOptions.oEmailSettings){return null}if(!c._oControlStore.oEmailButton){c._oControlStore.oEmailButton=new sap.m.Button();c._oControlStore.oEmailButton.setIcon("sap-icon://email");c._oControlStore.oEmailButton.setText(this.oAppImp.UilibI18nModel.getResourceBundle().getText("SEND_EMAIL"));c._oControlStore.oEmailButton.attachPress(function(){if(c._oHeaderFooterOptions.oEmailSettings.fGetMailBody){var b=c._oHeaderFooterOptions.oEmailSettings.fGetMailBody()}else{var b=null}sap.m.URLHelper.triggerEmail(c._oHeaderFooterOptions.oEmailSettings.sRecepient,c._oHeaderFooterOptions.oEmailSettings.sSubject,b)})}this.supportEnablement(c,c._oControlStore.oEmailButton,c._oHeaderFooterOptions.oEmailSettings);return c._oControlStore.oEmailButton},getJamShareButton:function(c){if(!c._oHeaderFooterOptions.oJamOptions||!(c._oHeaderFooterOptions.oJamOptions.oShareSettings||c._oHeaderFooterOptions.oJamOptions.fGetShareSettings)){return null}if(!c._oControlStore.oJamShareButton){c._oControlStore.oJamShareButton=new sap.ushell.ui.footerbar.JamShareButton({})}if(c._oHeaderFooterOptions.oJamOptions.oShareSettings){c._oControlStore.oJamShareButton.setJamData(c._oHeaderFooterOptions.oJamOptions.oShareSettings);this.supportEnablement(c,c._oControlStore.oJamShareButton,c._oHeaderFooterOptions.oJamOptions.oShareSettings)}return c._oControlStore.oJamShareButton},getJamDiscussButton:function(c){if(!c._oHeaderFooterOptions.oJamOptions||!(c._oHeaderFooterOptions.oJamOptions.oDiscussSettings||c._oHeaderFooterOptions.oJamOptions.fGetDiscussSettings)){return null}if(!c._oControlStore.oJamDiscussButton){c._oControlStore.oJamDiscussButton=new sap.ushell.ui.footerbar.JamDiscussButton({})}if(c._oHeaderFooterOptions.oJamOptions.oDiscussSettings){c._oControlStore.oJamDiscussButton.setJamData(c._oHeaderFooterOptions.oJamOptions.oDiscussSettings);this.supportEnablement(c,c._oControlStore.oJamDiscussButton,c._oHeaderFooterOptions.oJamOptions.oDiscussSettings)}return c._oControlStore.oJamDiscussButton},getBookmarkButton:function(c){if(c._oHeaderFooterOptions.bSuppressBookmarkButton||!c._oHeaderFooterOptions.oAddBookmarkSettings&&!c.isMainScreen()){return null}if(!c._oControlStore.oBookmarkButton){c._oControlStore.oBookmarkButton=new sap.ushell.ui.footerbar.AddBookmarkButton({})}var a={url:document.URL,title:c._oControlStore.oTitle.getText()};jQuery.extend(a,c._oHeaderFooterOptions.oAddBookmarkSettings||{});c._oControlStore.oBookmarkButton.setAppData(a);this.supportEnablement(c,c._oControlStore.oBookmarkButton,c._oHeaderFooterOptions.oAddBookmarkSettings||{});return c._oControlStore.oBookmarkButton},supportEnablement:function(c,b,s){b.setEnabled(!s.bDisabled);if(s.sId){c._oControlStore.oButtonListHelper.mButtons[s.sId]=b}},getAdditionalShareButtons:function(c){var r=[];if(!c._oControlStore.shareButtons){c._oControlStore.shareButtons=new sap.ca.scfld.md.app.ButtonListHelper(this.oAppImp,1);c._oControlStore.oButtonListHelper.addButtonListHelper(c._oControlStore.shareButtons)}for(var i=0;i<c._oHeaderFooterOptions.additionalShareButtonList.length;i++){var b={};jQuery.extend(b,c._oHeaderFooterOptions.additionalShareButtonList[i]);var B=c._oControlStore.shareButtons.ensureButton(b,"b");r.push(B)}return r},getFooterRightCount:function(c,t){var l;var C=this.getActionsCount(c);switch(t){case"XL":l=this.detailHeaderFooterRules.maxBtnCountXL;break;case"L":l=this.detailHeaderFooterRules.maxBtnCountL;break;case"M":l=this.detailHeaderFooterRules.maxBtnCountM;break;case"S":l=this.detailHeaderFooterRules.maxBtnCountS;break;default:l=this.detailHeaderFooterRules.maxBtnCountXL}return l},getActionsCount:function(c){var C=0;if(c._oHeaderFooterOptions.buttonList){C=c._oHeaderFooterOptions.buttonList.length}if(c._oHeaderFooterOptions.oEditBtn){C++}else{if(c._oHeaderFooterOptions.oPositiveAction){C++}if(c._oHeaderFooterOptions.oNegativeAction){C++}}return C},createSettingsButton:function(c){if(c._oControlStore.oSettingsButton){var r=false}else{var r=true}if(c._oHeaderFooterOptions.aAdditionalSettingButtons){if(!c._oControlStore.oSettingsButtonListHelper){c._oControlStore.oSettingsButtonListHelper=new sap.ca.scfld.md.app.ButtonListHelper(this.oAppImp,0);c._oControlStore.oButtonListHelper.addButtonListHelper(c._oControlStore.oSettingsButtonListHelper)}var b=[];for(var i=0;i<c._oHeaderFooterOptions.aAdditionalSettingButtons.length;i++){var B={};jQuery.extend(B,c._oHeaderFooterOptions.aAdditionalSettingButtons[i]);delete B.sIcon;var o=c._oControlStore.oSettingsButtonListHelper.ensureButton(B,"b");o.setWidth("100%");b.push(o)}sap.ushell.services.AppConfiguration.addApplicationSettingsButtons(b)}return r},getGenericButtons:function(f,c,b){var r=[];if(c._oHeaderFooterOptions.oSortOptions){r.push(this.addSortButton(f,c,b))}if(c._oHeaderFooterOptions.oFilterOptions){r.push(this.addFilterButton(f,c,b))}if(c._oHeaderFooterOptions.oGroupOptions){r.push(this.addGroupButton(f,c,b))}return r},addFilterButton:function(f,c,b){var B={sId:c._oHeaderFooterOptions.oFilterOptions.sId,bDisabled:c._oHeaderFooterOptions.oFilterOptions.bDisabled,sIcon:"sap-icon://filter",sBtnTxt:this.oAppImp.UilibI18nModel.getResourceBundle().getText("FILTER")};if(c._oHeaderFooterOptions.oFilterOptions.aFilterItems){B.onChange=jQuery.proxy(function(k){c._oHeaderFooterOptions.oFilterOptions.onFilterSelected(k)},this);B.aItems=c._oHeaderFooterOptions.oFilterOptions.aFilterItems;B.sSelectedItemKey=c._oHeaderFooterOptions.oFilterOptions.sSelectedItemKey;var t="s"}else{B.onBtnPressed=jQuery.proxy(function(e){c._oHeaderFooterOptions.oFilterOptions.onFilterPressed(e)},this);var t="b"}return b.ensureButton(B,t,f)},addSortButton:function(f,c,b){var B={sId:c._oHeaderFooterOptions.oSortOptions.sId,bDisabled:c._oHeaderFooterOptions.oSortOptions.bDisabled,sIcon:"sap-icon://sort",sBtnTxt:this.oAppImp.UilibI18nModel.getResourceBundle().getText("SORT")};if(c._oHeaderFooterOptions.oSortOptions.aSortItems){B.onChange=jQuery.proxy(function(k){c._oHeaderFooterOptions.oSortOptions.onSortSelected(k)},this);B.aItems=c._oHeaderFooterOptions.oSortOptions.aSortItems;B.sSelectedItemKey=c._oHeaderFooterOptions.oSortOptions.sSelectedItemKey;var t="s"}else{B.onBtnPressed=jQuery.proxy(function(e){c._oHeaderFooterOptions.oSortOptions.onSortPressed(e)},this);var t="b"}return b.ensureButton(B,t,f)},addGroupButton:function(f,c,b){var B={sId:c._oHeaderFooterOptions.oGroupOptions.sId,bDisabled:c._oHeaderFooterOptions.oGroupOptions.bDisabled,sIcon:"sap-icon://group-2",sBtnTxt:this.oAppImp.UilibI18nModel.getResourceBundle().getText("GROUP")};if(c._oHeaderFooterOptions.oGroupOptions.aGroupItems){B.onChange=jQuery.proxy(function(k){c._oHeaderFooterOptions.oGroupOptions.onGroupSelected(k)},this);B.aItems=c._oHeaderFooterOptions.oGroupOptions.aGroupItems;B.sSelectedItemKey=c._oHeaderFooterOptions.oGroupOptions.sSelectedItemKey;var t="s"}else{B.onBtnPressed=jQuery.proxy(function(e){c._oHeaderFooterOptions.oGroupOptions.onGroupPressed(e)},this);var t="b"}return b.ensureButton(B,t,f)},ensureHeader:function(c,p,g,s){if(!c._oControlStore.oHeaderBar){c._oControlStore.oHeaderBar=new sap.m.Bar();c._oControlStore.oTitle=new sap.m.Label();c._oControlStore.oHeaderBar.addContentMiddle(c._oControlStore.oTitle);var C=p.getCustomHeader();if(C&&C.destroy){C.destroy()}p.setCustomHeader(c._oControlStore.oHeaderBar)}this.setBackButton(c,c._oControlStore.oHeaderBar,g,s)},setAppHeaderBtn:function(c,b){if(!c._oControlStore.oHeaderBar){return}if(!c._oControlStore.oHeaderBtn){if(b.sId){c._oControlStore.oHeaderBtn=new sap.m.Button(b.sId)}else{c._oControlStore.oHeaderBtn=new sap.m.Button()}c._oControlStore.oHeaderBar.addContentRight(c._oControlStore.oHeaderBtn)}var _=c._oControlStore.oHeaderBtn;_.setIcon("sap-icon://cart-3");if(b.onBtnPressed){_.attachPress(b.onBtnPressed)}if(b.sText){_.setText(b.sText)}else if(b.oTextBinding){if(b.oTextBinding.elementPath){_.bindElement(b.oTextBinding.elementPath)}if(b.oTextBinding.property){_.bindProperty("text",b.oTextBinding.property)}}else if(this.oAppImp.bIsPhone&&b.i18nPhoneTxt){_.setText(this.oAppImp.UilibI18nModel.getResourceBundle().getText(b.i18nPhoneTxt))}else if(b.i18nTxt){_.setText(this.oAppImp.UilibI18nModel.getResourceBundle().getText(b.i18nTxt))}},setBackButton:function(c,b,g,s){if(s||(g&&c._oHeaderFooterOptions.onBack===null)){c._oControlStore.fBack=null}else if(g&&c._oHeaderFooterOptions.onBack==undefined){if(window.history.length==0){c._oControlStore.fBack=null}else{c._oControlStore.fBack=function(){window.history.back(1)}}}else{c._oControlStore.fBack=c._oHeaderFooterOptions.onBack}if(c._oControlStore.oBackButton){c._oControlStore.oBackButton.setVisible(!!c._oControlStore.fBack)}else if(c._oControlStore.fBack){c._oControlStore.oBackButton=new sap.m.Button();c._oControlStore.oBackButton.setIcon("sap-icon://nav-back");c._oControlStore.oBackButton.attachPress(function(e){c._oControlStore.fBack(e)});b.addContentLeft(c._oControlStore.oBackButton)}},getGenericCount:function(c){var r=0;if(c._oHeaderFooterOptions.oSortOptions){r++}if(c._oHeaderFooterOptions.oFilterOptions){r++}if(c._oHeaderFooterOptions.oGroupOptions){r++}return r}});
sap.ca.scfld.md.app.CommonHeaderFooterHelper.getPageFromController=function(c){return c.getView().getContent()[0]};
