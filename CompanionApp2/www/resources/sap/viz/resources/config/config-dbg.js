$(function(){
    sap.viz.api.env.globalSettings({
        "enableCanvgConfig" : {
        'viz/bar': { max_svg: 2100, max_canvas:4000 } ,
        
        'viz/mekko': { max_svg: 2800, max_canvas:5000 } ,
        
        'viz/100_mekko': { max_svg: 2800, max_canvas:5000 } ,
        
        'viz/horizontal_mekko': { max_svg: 2800, max_canvas:5000 } ,
        
        'viz/100_horizontal_mekko': { max_svg: 2800, max_canvas:5000 } ,
        
        'viz/column': { max_svg: 2100, max_canvas: 4000 } ,
        
        'viz/dual_bar': { max_svg: 2900, max_canvas: 6000 } ,
        
        'viz/dual_column': { max_svg: 2800, max_canvas: 6000 } ,
        
        'viz/stacked_bar': { max_svg: 2000, max_canvas: 6000 } ,
        
        'viz/stacked_column': { max_svg: 2000, max_canvas: 5000 } ,
        
        'viz/100_stacked_bar': { max_svg: 2000, max_canvas: 5000 } ,
        
        'viz/100_stacked_column': { max_svg: 2000, max_canvas: 5000 } ,
        
        'viz/pie': { max_svg: 3200, max_canvas: 20000 } ,
        
        'viz/pie_with_depth': { max_svg: 1800, max_canvas: 7200 } ,
        
        'viz/donut': { max_svg: 3400, max_canvas: 20000 } ,
        
        'viz/donut_with_depth': { max_svg: 1600, max_canvas: 5600 } ,
        
        'viz/line': { max_svg: 1600, max_canvas: 4000 } ,
        
        'viz/dual_line': { max_svg: 1600, max_canvas: 6000 } ,
        
        'viz/dual_horizontal_line': { max_svg: 1800, max_canvas: 6000 } ,
        
        'viz/horizontal_line': { max_svg: 1600, max_canvas: 4000 } ,
        
        'viz/bubble': { max_svg: 9600, max_canvas:32000 } ,
        
        'viz/scatter': { max_svg: 4800, max_canvas: 18000 } ,
        
        'viz/combination': { max_svg: 2100, max_canvas: 6000 } ,
        
        'viz/heatmap': { max_svg: 2500, max_canvas: 10000 } ,
        
        'viz/waterfall': { max_svg: 1700, max_canvas: 4000 } ,
        
        'viz/stacked_waterfall': { max_svg: 2400, max_canvas: 6000 } ,
        
        'viz/100_dual_stacked_bar': { max_svg: 2600, max_canvas: 6000 } ,
        
        'viz/100_dual_stacked_column': { max_svg: 2600, max_canvas: 6000 } ,
        
        'viz/dual_stacked_bar': { max_svg: 2600, max_canvas: 6000 } ,
        
        'viz/dual_stacked_column': { max_svg: 2600, max_canvas: 6000 } ,
        
        'viz/horizontal_waterfall': { max_svg: 1600, max_canvas: 4000 } ,
        
        'viz/horizontal_stacked_waterfall': { max_svg: 2400, max_canvas: 6000 } ,
        
        'viz/scatter_matrix': { max_svg: 400, max_canvas: 2500 } ,
        
        'viz/tagcloud': { max_svg: 7000, max_canvas: 7000 } ,
        
        'viz/boxplot': { max_svg: 1200, max_canvas: 1200 } ,
        
        'viz/multi_bubble': { max_svg: 8000, max_canvas: 30000 } ,
        
        'viz/multi_donut': { max_svg: 8000, max_canvas: 20000 } ,
        
        'viz/multi_dual_bar': { max_svg: 2400, max_canvas: 6000 } ,
        
        'viz/multi_dual_horizontal_line': { max_svg: 2000, max_canvas: 7000 } ,
        
        'viz/multi_dual_line': { max_svg: 2400, max_canvas: 9000 } ,
        
        'viz/multi_dual_column': { max_svg: 4000, max_canvas: 10000 } ,
        
        'viz/multi_horizontal_line': { max_svg: 2000, max_canvas: 5000 } ,
        
        'viz/multi_bar': { max_svg: 2000, max_canvas: 5000 } ,
        
        'viz/multi_line': { max_svg: 2000, max_canvas: 8000 } ,
        
        'viz/multi_100_stacked_bar': { max_svg: 2400, max_canvas: 5000 } ,
        
        'viz/multi_100_stacked_column': { max_svg: 3000, max_canvas: 7000 } ,
        
        'viz/multi_pie': { max_svg: 8000, max_canvas: 20000 } ,
        
        'viz/multi_scatter': { max_svg: 4000, max_canvas: 16000 } ,
        
        'viz/multi_stacked_bar': { max_svg: 2400, max_canvas: 5000 } ,
        
        'viz/multi_stacked_column': { max_svg: 3000, max_canvas: 7000 } ,
        
        'viz/multi_column': { max_svg: 3500, max_canvas: 6000 } ,
        
        'viz/dual_combination': { max_svg: 2000, max_canvas: 6000 } ,
        
        'viz/horizontal_combination': { max_svg: 2000, max_canvas: 6000 } ,
        
        'viz/dual_horizontal_combination': { max_svg: 2000, max_canvas: 6000 } ,
        
        'viz/horizontal_boxplot': { max_svg: 1200, max_canvas:1200 } ,
        
        'viz/multi_dual_stacked_bar': { max_svg: 2400, max_canvas: 5000 } ,
        
        'viz/multi_100_dual_stacked_bar': { max_svg: 2400, max_canvas: 5000 } ,
        
        'viz/multi_dual_stacked_column': { max_svg: 3000, max_canvas: 6000 } ,
        
        'viz/multi_100_dual_stacked_column': { max_svg: 3000, max_canvas: 6000 } ,
        
        'viz/radar': { max_svg: 1000, max_canvas: 2500 } ,
        
        'viz/multi_radar': { max_svg: 1700, max_canvas: 5000 } ,
        
        'viz/treemap': { max_svg: 8000, max_canvas: 10000 } ,
        
        'viz/tree': { max_svg: 8000, max_canvas: 10000 } ,
        
        'viz/area': { max_svg: 1500, max_canvas: 4000 } ,
        
        'viz/horizontal_area': { max_svg: 1500, max_canvas: 4000 } ,
        
        'viz/100_area': { max_svg: 1500, max_canvas: 6000 } ,
        
        'viz/100_horizontal_area': { max_svg: 1500, max_canvas: 6000 } ,
        
        'viz/multi_area': { max_svg: 1500, max_canvas: 6800 } ,
        
        'viz/multi_horizontal_area': { max_svg: 2400, max_canvas: 5000 } ,
        
        'viz/multi_100_area': { max_svg: 2400, max_canvas: 6800 } ,
        
        'viz/multi_100_horizontal_area': { max_svg: 2400, max_canvas: 6000 } ,
        
        'viz/geobubble': { max_svg:1000, max_canvas:3000 } ,
        
        'viz/geopie': { max_svg:1000, max_canvas:5000 } ,
        
        'viz/choropleth': { max_svg:2000, max_canvas:6000 } ,
        
        'viz/multi_geobubble': { max_svg:1000, max_canvas:3000 } ,
        
        'viz/multi_choropleth': { max_svg:2000, max_canvas:6000 },
        
        'viz/bullet': { max_svg: 1500, max_canvas: 4000 },
        
        'viz/time_bubble': { max_svg: 9600, max_canvas:32000 }
    }
  });
});
