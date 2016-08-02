var assert = require('assert');
var recSpec = {"graphType": "lines","group": "Date","series": ["Price"]};

function reclineToVegaSpec(reclineSpec){
    
    var url;  // how to get path to raw data on github?
    var type = reclineSpec.graphType;
    var xColumn = reclineSpec.group;
    var yColumn = reclineSpec.series[0];
    var parse = {};
    parse[xColumn] = 'date';
    parse[yColumn] = 'number';
    
    var spec;
    switch (type){
        case 'lines':
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
                    "format": {"type": "csv", "parse": parse}
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
            break;
        case 'points':
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
                    "format": {"type": "csv", "parse": parse}
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
                    "type": "symbol",
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
            break;
        case 'columns':
            spec = {
                "width": 1110,
                "height": 500,
                "padding": {"top": 10, "left": 30, "bottom": 30, "right": 10},
                "data": [
                  {
                    "name": "mainData",
                    "url": url,
                    "format": {"type": "csv", "parse": parse}
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
                    "type": "rect",
                    "from": {"data": "mainData"},
                    "properties": {
                      "enter": {
                        "x": {"scale": "x", "field": xColumn},
                        "y": {"scale": "y", "field": yColumn},
                        "stroke": {"value": "steelblue"},
                        "strokeWidth": {"value": 2}
                      },
                      "update":{"fill": {"value": "steelblue"}},
                      "hover": {"fill": {"value": "red"}}
                    }
                  }
                ]  
            };
            break;
        }
    return spec;
};

describe('VegaSpec', function() {
    var vegaSpec = reclineToVegaSpec(recSpec);
    it('Parsing works', function(){
        assert.deepEqual(vegaSpec.data[0].format.parse, {Date: 'date', Price: 'number'});
    });
    it('Works with URL', function(){
        assert.notEqual(vegaSpec.data[0].url, undefined);
    });
    it('Filter test works', function(){
        var result = "year(datum.Date) == year(mouseX) && month(datum.Date) == month(mouseX) && date(datum.Date) == date(mouseX)";
        assert.equal(vegaSpec.data[1].transform[0].test, result);    
    });
    it('Transforming works', function(){
        assert.equal(vegaSpec.data[1].transform[1].expr, 'year(datum.Date)');
        assert.equal(vegaSpec.data[1].transform[2].expr, 'parseInt(month(datum.Date)) + 1');
        assert.equal(vegaSpec.data[1].transform[3].expr, 'date(datum.Date)');    
    });
    it('Works for scales', function(){
        assert.equal(vegaSpec.scales[0].domain.field, 'Date');
        assert.equal(vegaSpec.scales[1].domain.field, 'Price');
    });
    it('Works for marks', function(){
        assert.equal(vegaSpec.marks[0].type, 'line');
        assert.equal(vegaSpec.marks[0].properties.enter.x.field, 'Date');
        assert.equal(vegaSpec.marks[0].properties.enter.y.field, 'Price');
    });
    it('Works with different types', function(){
        vegaSpec = reclineToVegaSpec({"graphType": "lines","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'line');
        vegaSpec = reclineToVegaSpec({"graphType": "points","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'symbol');
        vegaSpec = reclineToVegaSpec({"graphType": "columns","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'rect');
    });
    
})