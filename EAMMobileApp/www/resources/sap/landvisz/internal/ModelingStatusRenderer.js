/*!
 *  @copyright 2012-2014 SAP SE. All rights reserved@
 */
jQuery.sap.declare("sap.landvisz.internal.ModelingStatusRenderer");sap.landvisz.internal.ModelingStatusRenderer={};
sap.landvisz.internal.ModelingStatusRenderer.render=function(r,c){var a=sap.ui.getCore().getLibraryResourceBundle("sap.landvisz");if(!this.initializationDone){c.initControls();r.write("<div");r.writeControlData(c);if(c.entityMaximized!=true){if(c.renderSize==sap.landvisz.EntityCSSSize.Small){c._imgFolderPath="16x16/";r.addClass("sapLandviszStatusSectionSmallSize")}else if(c.renderSize==sap.landvisz.EntityCSSSize.RegularSmall||c.renderSize==sap.landvisz.EntityCSSSize.Regular||c.renderSize==sap.landvisz.EntityCSSSize.Medium||c.renderSize==sap.landvisz.EntityCSSSize.Large){c._imgFolderPath="24x24/";r.addClass("sapLandviszStatusSectionAllSize")}}else if(c.entityMaximized==true){c._imgFolderPath="24x24/";r.addClass("sapLandviszStatusSectionAllSize")}r.writeClasses();if(c.getStatus()==sap.landvisz.ModelingStatus.ERROR||c.getStatus()==sap.landvisz.ModelingStatus.WARNING)r.addStyle("border","1px solid #999999");r.writeStyles();r.writeAttributeEscaped("title",c.getStatusTooltip());r.write(">");if(c.initializationDone==false){c.statusImage.attachPress(function(e){c.fireEvent("statusSelected")})}this._assignIconSrc(r,c);if(c.getStatus()==sap.landvisz.ModelingStatus.ERROR||c.getStatus()==sap.landvisz.ModelingStatus.WARNING)r.renderControl(c.statusImage);if(c.getStateIconSrc()&&""!=c.getStateIconSrc()){c.stateImage.setSrc(c.getStateIconSrc());c.stateImage.setTooltip(c.getStateIconTooltip());c.stateImage.addStyleClass("stateIconClass");r.renderControl(c.stateImage)}c.initializationDone=true;r.write("</div>")}};
sap.landvisz.internal.ModelingStatusRenderer._assignIconSrc=function(r,c){if(c.getStatus()==sap.landvisz.ModelingStatus.ERROR)c.statusImage.setSrc(c._imgResourcePath+c._imgFolderPath+"error.png");else if(c.getStatus()==sap.landvisz.ModelingStatus.WARNING)c.statusImage.setSrc(c._imgResourcePath+c._imgFolderPath+"warning.png");else if(c.getStatus()==sap.landvisz.ModelingStatus.WARNING)c.statusImage.setSrc(c._imgResourcePath+c._imgFolderPath+"success.png")};
