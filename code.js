var Data;

var table = d3.select('#graph')
.append('table')
.attr('class', 'table');

var thead = table.append('thead'),
tbody = table.append('tbody');

var reload = function () {
    d3.csv('villains.csv', function (data) {
      Data = data;
      redraw();
    });
  };
reload();

var redraw = function () {
    var tr = tbody.selectAll('tr')
    .data(Data);

    tr.enter()
    .append('tr');

    tr.exit()
    .remove();
    
    tr.selectAll('td')
    .data(function (d) { return d3.values(d); })
    .enter()
    .append('td')
    .text(function (d) { return d; });
};

// arrange by appearance
tbody.selectAll('tr')
.sort(function (a, b) { return d3.ascending(a['Year first'], b['Year first']); });
redraw();

// required to make the list by doctor name work
tbody.selectAll('tr').sort(function (a, b) {
    return d3.descending(Number(a['Doc. no.']), Number(b['Doc. no.']));
  });

// select only one doctor
Data = Data.filter(function (d) { return d['Doctor actor'] == 'Matt Smith'; })
redraw()

tbody.selectAll('tr')
.filter(function (d) { return d['Doctor actor'] != 'Matt Smith'; })
.remove()