/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 * 
 * (c) Copyright 2009-2013 SAP AG. All rights reserved
 */
jQuery.sap.declare("sap.landvisz.internal.EntityActionRenderer");sap.landvisz.internal.EntityActionRenderer={};
sap.landvisz.internal.EntityActionRenderer.render=function(r,c){if(!this.initializationDone){c.initControls();c.initializationDone=true;r.write("<div tabIndex='0' ");r.writeControlData(c);var a=c.getRenderingSize();if(c.entityMaximized!=true){if(a==sap.landvisz.EntityCSSSize.Small||a==sap.landvisz.EntityCSSSize.RegularSmall||a==sap.landvisz.EntityCSSSize.Regular||a==sap.landvisz.EntityCSSSize.Medium){r.addClass("sapLandviszIcon_buttonSmall")}else r.addClass("sapLandviszIcon_button")}else if(c.entityMaximized==true){r.addClass("sapLandviszIcon_button");c.entityActionIcon.setWidth("16px");c.entityActionIcon.setHeight("16px")}r.writeClasses();r.write(">");c.setTooltip(c.getActionTooltip());c.entityActionIcon.setSrc(c.getIconSrc());c.entityActionIcon.setTooltip(c.getActionTooltip());r.renderControl(c.entityActionIcon);r.write("</div>")}};
