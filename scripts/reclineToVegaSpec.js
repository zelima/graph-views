var vegaSpec = function reclineToVegaSpec(reclineSpec){
    
    var url;  // how to get path to raw data on github?
    var type = reclineSpec.views[0].state.graphType;
    var xColumn = reclineSpec.views[0].state.group;
    var yColumn = reclineSpec.views[0].state.series[0];
    var spec;
    if (type == "lines"){
        spec = {
            "width": 1110,
            "height": 500,
            "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
            "signals": [
              {
                "name": "mouseX",
                "streams": [
                  {
                    "type": "mousemove",
                    "expr": "eventX()",
                    "scale": {"name": "x","invert": true}
                  }
                ]
              },
              {
                "name": "mouseY",
                "streams": [
                  {
                    "type": "mousemove",
                    "expr": "eventY()",
                    "scale": {"name": "y","invert": true}
                  }
                ]
              }
            ],
            "data": [
              {
                "name": "mainData",
                "url": url,
                "format": {"type": "csv", "parse": {xColumn: "date", yColumn: "number"}}
              },
              {
                "name": "filtered",
                "source": "mainData",
                "transform": [
                  {
                    "type": "filter",
                    "test": "year(datum."+xColumn+") == year(mouseX) && month(datum."+xColumn+") == month(mouseX) && date(datum."+xColumn+") == date(mouseX)"
                  },
                  {"type": "formula", "field": "y", "expr": "year(datum."+xColumn+")"},
                  {"type": "formula", "field": "m", "expr": "parseInt(month(datum."+xColumn+")) + 1"},
                  {"type": "formula", "field": "d", "expr": "date(datum."+xColumn+")"}
                ]
              }
            ],
            "scales": [
              {
                "name": "x",
                "type": "time",
                "range": "width",
                "domain": {"data": "mainData", "field": xColumn}
              },
              {
                "name": "y",
                "type": "linear",
                "range": "height",
                "domain": {"data": "mainData", "field": yColumn},
                "nice": true
              }
            ],
            "axes": [
              {"type": "x", "scale": "x", "grid": true},
              {"type": "y", "scale": "y"}
            ],
            "marks": [
              {
                "type": "line",
                "from": {"data": "mainData"},
                "properties": {
                  "enter": {
                    "x": {"scale": "x", "field": xColumn},
                    "y": {"scale": "y", "field": yColumn},
                    "stroke": {"value": "steelblue"},
                    "strokeWidth": {"value": 2}
                  }
                }
              },
              {
                "type": "symbol",
                "from": {"data": "filtered"},
                "properties": {
                  "enter": {
                    "x": {"scale": "x","field": xColumn},
                    "y": {"scale": "y","field": yColumn},
                    "stroke": {"value": "black"},
                    "strokeWidth": {"value": 2}
                  }
                }
              },
              {
              "type": "group",
              "from": {"data": "filtered"},
              "properties": {
                "update": {
                  "x": {"scale": "x", "signal": "mouseX", "offset": 5},
                  "y": {"scale": "y", "signal": "mouseY", "offset": -40},
                  "width": {"value": 150},
                  "height": {"value": 35},
                  "fill": {"value": "#edf1f7"},
                  "fillOpacity": {"value": 0.85},
                  "stroke": {"value": "#aaa"},
                  "strokeWidth": {"value": 0.5}
                }
              },
                "marks": [
                  {
                    "type": "text",
                    "properties": {
                      "update": {
                        "x": {"value": 6},
                        "y": {"value": 14},
                        "text": {"template": "Date: {{prent.y-parent.m-parent.d}}"},
                        "fill": {"value": "black"},
                        "fontWeight": {"value": "bold"}
                      }
                    }
                  },
                  {
                    "type": "text",
                    "properties": {
                      "update": {
                        "x": {"value": 6},
                        "y": {"value": 29},
                        "text": {"template": "Price: ${{parent."+yColumn+"}}"},
                        "fill": {"value": "black"},
                        "align": {"value": "left"}
                      }
                    }
                  }
                ]
              }
            ]
        };
    }
    return spec;
};
