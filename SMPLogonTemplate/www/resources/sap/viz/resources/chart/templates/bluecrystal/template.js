(function(){var t=Object.prototype.toString;function c(i){return t.call(i)==='[object Array]'}function d(i){return t.call(i)==='[object Object]'}function _(a,b){for(var i in b){if(c(b[i])){a[i]=b[i].slice()}else if(d(b[i])){a[i]=a[i]||{};_(a[i],b[i])}else{a[i]=b[i]}}return a}function m(){var a={};for(var i=0;i<arguments.length;++i){_(a,arguments[i])}return a}var e="#333333";var f="#d8d8d8";var p=["#5cbae6","#b6d957","#fac364","#8cd3ff","#d998cb","#fade64","#93b9c6","#d9d6c7","#52bacc","#dce65c","#98aafb"];var r={rangeSlider:{sliderStyle:{borderColor:"#d8d8d8",highlightBorderColor:"#707070"},tooltipStyle:{fontColor:"#000000",borderColor:"#bebebe",highlightBorderColor:"#748cb2",backgroundColor:"#f4f3f4"},thumbStyle:{indicatorStartColor:"#fbfbfb",indicatorEndColor:"#cccccc",indicatorPressStartColor:"#e8e8e8",indicatorPressEndColor:"#a4a4a4",indicatorBorderStartColor:"#878787",indicatorBorderEndColor:"#474747",indicatorPressBorderStartColor:"#878787",indicatorPressBorderEndColor:"#474747",indicatorInternalLineColor:"#000000",subRectBorderColor:"#707070",subRectColor:"#bbbbbb",rectOpacity:0.2,rectColor:'#009de0',rectPressOpacity:0.48,rectPressColor:"#636363"}}};var g={background:{border:{top:{visible:false},bottom:{visible:false},left:{visible:false},right:{visible:false}},drawingEffect:"normal"}};var l={legend:{drawingEffect:"normal",title:{visible:true}}};var h={tooltip:{drawingEffect:"normal"}};var j={plotArea:{drawingEffect:"normal","colorPalette":p}};var k={plotArea:{drawingEffect:"normal",primaryValuesColorPalette:["#5cbae5","#27a3dd","#1b7eac"],secondaryValuesColorPalette:["#b6d957","#9dc62d","#759422"]}};var z={zAxis:{title:{visible:true},color:e}};var n={title:{visible:true},gridline:{color:f},color:e};var s={axisline:{visible:true}};var o={axisLine:{visible:true}};var q={axisline:{visible:false}};var u={axisLine:{visible:false}};var v={gridline:{type:"line",color:f,showLastLine:true}};var w={title:{applyAxislineColor:true}};var x=m(g,l,h,j);var y=m(g,l,h,k);var A={xAxis:m(n,q,v),yAxis:n,xAxis2:m(n,q)};var B=m(A,{xAxis:w,xAxis2:w});var C={yAxis:m(n,q,v),xAxis:n,yAxis2:m(n,q)};var D=m(C,{yAxis:w,yAxis2:w});var E=m(x,A);var F=m(x,z,A);var G=m(y,B);var H=m(x,r,C);var I=m(x,z,C);var J=m(y,D);var K=m(x,A);var L=m(y,B);var M=m(x,C);var N=m(y,D);var O=m(x,r,C);var P=m(y,D);var Q=m(x,A);var R=m(y,B);var S=m(x,r,C);var T=m(y,D);var U=m(x,A);var V=m(y,B);var W=m(x,{yAxis:m(n,q,v),xAxis:n});var X=m(l,j);var Y=X;var Z=m(l,h,j,{background:{visible:false},plotArea:{valueAxis:{title:{visible:true},gridline:{color:f}},dataline:{fill:{transparency:0}}}});var $=m(x,{yAxis:m(n,q,{gridline:{type:"line"}}),xAxis:m(n,s),xAxis2:m(n,s)});var a1=m(x,{xAxis:m(n,q,{gridline:{type:"line"}}),yAxis:m(n,s),yAxis2:m(n,s)});var b1=m(l,g,h,j,{});var c1={legend:{title:{visible:true}}};sap.viz.extapi.env.Template.register({id:"bluecrystal",name:"BlueCrystal",version:"4.0.0",properties:{'viz/bar':E,'viz/3d_bar':F,'viz/image_bar':E,'viz/multi_bar':E,'viz/dual_bar':G,'viz/multi_dual_bar':G,'viz/column':H,'viz/3d_column':I,'viz/multi_column':H,'viz/dual_column':J,'viz/multi_dual_column':J,'viz/stacked_bar':K,'viz/multi_stacked_bar':K,'viz/dual_stacked_bar':L,'viz/multi_dual_stacked_bar':L,'viz/100_stacked_bar':K,'viz/multi_100_stacked_bar':K,'viz/100_dual_stacked_bar':L,'viz/multi_100_dual_stacked_bar':L,'viz/stacked_column':M,'viz/multi_stacked_column':M,'viz/dual_stacked_column':N,'viz/multi_dual_stacked_column':N,'viz/100_stacked_column':M,'viz/multi_100_stacked_column':M,'viz/100_dual_stacked_column':N,'viz/multi_100_dual_stacked_column':N,'riv/cbar':m(l,h,j,{background:{drawingEffect:"normal"},yAxis:n}),'viz/combination':S,'viz/horizontal_combination':U,'viz/dual_combination':T,'viz/dual_horizontal_combination':V,'viz/boxplot':m(x,{yAxis:m(n,q,v),xAxis:n}),'viz/horizontal_boxplot':m(x,{xAxis:m(n,q,v),yAxis:n}),'viz/waterfall':m(x,{yAxis:m(n,q,v),xAxis:{title:{visible:true},color:e}}),'viz/horizontal_waterfall':m(x,{xAxis:m(n,q,v),yAxis:{title:{visible:true},color:e}}),'viz/stacked_waterfall':M,'viz/horizontal_stacked_waterfall':K,'viz/line':O,'viz/multi_line':O,'viz/dual_line':P,'viz/multi_dual_line':P,'viz/horizontal_line':Q,'viz/multi_horizontal_line':Q,'viz/dual_horizontal_line':R,'viz/multi_dual_horizontal_line':R,'viz/area':O,'viz/multi_area':O,'viz/100_area':O,'viz/multi_100_area':O,'viz/horizontal_area':Q,'viz/multi_horizontal_area':Q,'viz/100_horizontal_area':Q,'viz/multi_100_horizontal_area':Q,'viz/pie':X,'viz/multi_pie':X,'viz/donut':X,'viz/multi_donut':X,'viz/pie_with_depth':Y,'viz/donut_with_depth':Y,'viz/multi_pie_with_depth':Y,'viz/multi_donut_with_depth':Y,'viz/bubble':W,'viz/multi_bubble':W,'viz/scatter':W,'viz/multi_scatter':W,'viz/scatter_matrix':W,'viz/radar':Z,'viz/multi_radar':Z,'viz/tagcloud':{legend:{title:{visible:true}}},'viz/heatmap':{legend:{title:{visible:true}},xAxis:{title:{visible:true},color:e},yAxis:{title:{visible:true},color:e}},'viz/treemap':c1,'viz/mekko':$,'viz/100_mekko':$,'viz/horizontal_mekko':a1,'viz/100_horizontal_mekko':a1,'viz/number':{plotArea:{"colorPalette":p,valuePoint:{label:{fontColor:'#000000'}}}},'info/column':e1(H),'info/bar':e1(E),'info/line':e1(O),'info/pie':e1(X),'info/donut':e1(X),'info/scatter':g1(W),'info/bubble':g1(W),'info/stacked_column':e1(M),'info/stacked_bar':e1(K),'info/combination':e1(S),'info/stacked_combination':e1(S),'info/dual_stacked_combination':f1(T),'info/dual_column':f1(J),'info/dual_line':f1(P),'info/dual_bar':f1(G),'info/100_stacked_column':e1(M),'info/100_stacked_bar':e1(K),'info/horizontal_line':e1(Q),'info/dual_horizontal_line':f1(R),'info/horizontal_combination':e1(U),'info/horizontal_stacked_combination':e1(U),'info/dual_horizontal_stacked_combination':f1(V),'info/treemap':c1,'info/trellis_column':e1(H),'info/trellis_bar':e1(E),'info/trellis_line':e1(O),'info/trellis_pie':e1(X),'info/trellis_donut':e1(X),'info/trellis_scatter':g1(W),'info/trellis_bubble':g1(W),'info/trellis_stacked_column':e1(M),'info/trellis_stacked_bar':e1(K),'info/trellis_combination':e1(S),'info/trellis_dual_column':f1(J),'info/trellis_dual_line':f1(P),'info/trellis_dual_bar':f1(G),'info/trellis_100_stacked_column':e1(M),'info/trellis_100_stacked_bar':e1(K),'info/trellis_horizontal_line':e1(Q),'info/trellis_dual_horizontal_line':f1(R),'info/trellis_horizontal_combination':e1(U),'info/dual_stacked_bar':f1(L),'info/100_dual_stacked_bar':f1(L),'info/dual_stacked_column':f1(N),'info/100_dual_stacked_column':f1(N),'info/time_bubble':g1(W),'info/bullet':d1(b1),'info/vertical_bullet':d1(b1),'info/trellis_bullet':d1(b1),'info/trellis_vertical_bullet':d1(b1)},css:".v-datapoint .v-boxplotmidline{stroke:#333333}\
         .v-longtick{stroke:#b3b3b3;}"});function d1(a){var b=e1(a);b.valueAxis.title.visible=true;b.categoryAxis.title.visible=true;b.plotArea.gridline={};b.plotArea.gridline.visible=true;return b}function e1(a){var b={};for(var i in a){if(a.hasOwnProperty(i)){b[i]=a[i]}}b.valueAxis=m(n,u,v);b.categoryAxis=m(n);h1(b);return b}function f1(a){var b={};for(var i in a){if(a.hasOwnProperty(i)){b[i]=a[i]}}b.valueAxis=m(n,u,v,w);delete b.valueAxis.color;b.categoryAxis=m(n);b.valueAxis2=m(n,u,w);delete b.valueAxis2.color;h1(b);return b}function g1(a){var b={};for(var i in a){if(a.hasOwnProperty(i)){b[i]=a[i]}}b.valueAxis=m(n,o,v);b.valueAxis2=m(n,u);b.sizeLegend=m(a.sizeLegend||{},{title:{visible:true}});h1(b);return b}function h1(a){a.plotArea=a.plotArea||{};a.plotArea.background=a.background;delete a.background;delete a.xAxis;delete a.xAxis2;delete a.yAxis;delete a.yAxis2}})();
