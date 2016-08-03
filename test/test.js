var assert = require('assert');
var transform = require('../scripts/transform');
var recSpec = {"graphType": "lines","group": "Date","series": ["Price"]};

describe('VegaSpec', function() {
    var vegaSpec = transform(recSpec);
    it('Parsing works', function(){
        assert.deepEqual(vegaSpec.data[0].format.parse, {Date: 'date', Price: 'number'});
    });
    it('Loads data', function(){
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
        vegaSpec = transform({"graphType": "lines","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'line');
        vegaSpec = transform({"graphType": "points","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'symbol');
        vegaSpec = transform({"graphType": "columns","group": "Date","series": ["Price"]});
        assert.equal(vegaSpec.marks[0].type, 'rect');
    });
    
})
