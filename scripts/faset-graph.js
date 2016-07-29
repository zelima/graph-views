spec = {
  "parameters": [
    {
        "signal": "company", "type": "radio", "value": "all",
        "options": ["MSFT","AMZN","IBM","GOOG","AAPL", "all"]
    }
  ],
  "spec":{
    "width": 1110,
    "height": 500,
    "data": [
      {
        "name": "stocks",
        "url": "https://raw.githubusercontent.com/vega/vega-datasets/gh-pages/data/stocks.csv",
        "format": {"type": "csv", "parse": {"price":"number", "date":"date"}},
        "transform": [
            {
                "type": "filter",
                "test": "(company === 'all' || datum.symbol === company)"
            }
        ]
      }
    ],
    "scales": [
      {
        "name": "x",
        "type": "time",
        "range": "width",
        "domain": {"data": "stocks", "field": "date"}
      },
      {
        "name": "y",
        "type": "linear",
        "range": "height",
        "nice": true,
        "domain": {"data": "stocks", "field": "price"}
      },
      {
        "name": "color", 
        "type": "ordinal", 
        "domain": {"data": "stocks", "field": "symbol"},
        "range": "category10"
      }
    ],
    "axes": [
      {"type": "x", "scale": "x", "tickSizeEnd": 0},
      {"type": "y", "scale": "y"}
    ],
    "marks": [
      {
        "type": "group",
        "from": {
          "data": "stocks",
          "transform": [{"type": "facet", "groupby": ["symbol"]}]
        },
        "marks": [
          {
            "type": "line",
            "properties": {
              "enter": {
                "x": {"scale": "x", "field": "date"},
                "y": {"scale": "y", "field": "price"},
                "stroke": {"scale": "color", "field": "symbol"},
                "strokeWidth": {"value": 2}
              }
            }
          }
        ]
      }
    ]
  }
};
vg.embed('#vis', spec, function(error, result) {});