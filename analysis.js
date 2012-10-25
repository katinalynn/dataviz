
var chart;
var q2;
d3.csv('employer-data-short.csv', function(data) {
    var q2_sums = [
        { label: 'PhD',   value: d3.sum(data, function(d) { return Number(d.q2_phd); }) },
        { label: 'ABD',   value: d3.sum(data, function(d) { return Number(d.q2_abd); }) },
        { label: 'MA',    value: d3.sum(data, function(d) { return Number(d.q2_ma); }) },
        { label: 'MLS',   value: d3.sum(data, function(d) { return Number(d.q2_mls); }) },
        { label: 'Other', value: d3.sum(data, function(d) { return Number(d.q2_other); }) }
    ];
    var h = 20 * q2_sums.length, w = 500;
    q2 = q2_sums;

    var value_scale = d3.scale.linear()
        .domain([0, d3.max(q2_sums, function(d) { return d.value; })])
        .range([0, 400]);

    // Create the SVG element.
    chart = d3.select('body')
        .append('svg')
        .attr('class', 'chart')
        .attr('width', w)
        .attr('height', h)
        ;
    // Add the data.
    chart.selectAll('rect')
        .data(q2_sums)
        .enter()
            .append('rect')
            .attr('height', 18)
            .attr('x', 100)
            .attr('y', function(d, i) { return (i * 20); })
            .attr('width', function(d) { return value_scale(d.value); })
            .attr('fill', '#00d')
            ;
    // Add the labels.
    chart.selectAll('text')
        .data(q2_sums)
        .enter()
            .append('text')
            .attr('x', 90)
            .attr('y', function(d, i) { return (i * 20); })
            .attr('dx', 3)
            .attr('dy', '1em')
            .attr('text-anchor', 'end')
            .text(function(d) { return d.label; })
            ;
});

