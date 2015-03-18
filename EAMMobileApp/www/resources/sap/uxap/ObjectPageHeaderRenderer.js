jQuery.sap.require("sap.ui.core.Renderer");sap.uxap.ObjectPageHeaderRenderer={};
sap.uxap.ObjectPageHeaderRenderer.render=function(r,c){var n=c.getNavigationBar();var t=(c.getIsObjectIconAlwaysVisible()||c.getIsObjectTitleAlwaysVisible()||c.getIsObjectSubtitleAlwaysVisible()||c.getIsActionAreaAlwaysVisible());r.write("<div");r.writeControlData(c);r.addClass('sapUxAPObjectPageHeader');r.addClass('sapUxAPObjectPageHeaderDesign-'+c.getHeaderDesign());r.writeClasses();r.write(">");if(n){r.write("<div");r.addClass('sapUxAPObjectPageHeaderNavigation');r.writeClasses();r.write(">");r.renderControl(n);r.write("</div>")}r.write("<div");r.writeAttributeEscaped("id",c.getId()+"-identifierLine");r.addClass('sapUxAPObjectPageHeaderIdentifier');if(t){r.addClass('sapUxAPObjectPageHeaderIdentifierForce')}r.writeClasses();r.write(">");if(c.getObjectImageURI()){r.write("<span ");r.addClass('sapUxAPObjectPageHeaderObjectImageContainer');r.addClass('sapUxAPObjectPageHeaderObjectImage-'+c.getObjectImageShape());if(c.getIsObjectIconAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderObjectImageForce')}r.writeClasses();r.write(">");r.write("<span class='sapUxAPObjectPageHeaderObjectImageContainerSub'>");r.renderControl(c.getAggregation("_objectImage"));r.write("</span>");r.write("</span>")}r.write("<span ");r.writeAttributeEscaped("id",c.getId()+"-identifierLineContainer");r.addClass('sapUxAPObjectPageHeaderIdentifierContainer');r.writeClasses();r.write(">");r.write("<span ");r.addClass('sapUxAPObjectPageHeaderIdentifierTitle');if(c.getIsObjectTitleAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierTitleForce')}r.writeClasses();r.write(">");r.writeEscaped(c.getObjectTitle());r.write("</span>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderIdentifierDescription');if(c.getIsObjectSubtitleAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierDescriptionForce')}r.writeClasses();r.write(">");r.writeEscaped(c.getObjectSubtitle());r.write("</span>");r.write("</span>");r.write("<span");r.addClass('sapUxAPObjectPageHeaderIdentifierActions');if(c.getIsActionAreaAlwaysVisible()){r.addClass('sapUxAPObjectPageHeaderIdentifierActionsForce')}r.writeClasses();r.write(">");var a=c.getActions();for(var i=0;i<a.length;i++){var A=a[i];r.renderControl(A)}var o=c.getAggregation("_overflowButton");r.renderControl(o);r.write("</span>");r.write("</div>");r.write("</div>")};
