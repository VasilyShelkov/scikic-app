import React, { Component } from 'react';
import Faux from 'react-faux-dom';
import d3 from 'd3';

class ProbabilityChart extends Component {
  componentDidMount() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.2;

    const xScale = d3.scale.ordinal()
      .domain(this.props.feature.distribution)
      .rangeBands([0, width], 0.1, 0);

    const yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.feature.distribution) * 1.2])
      .range([0, height]);

    const init = (selection) => {
      selection.selectAll('rect')
        .data(this.props.feature.distribution)
        .enter()
        .append('rect')
        .style('fill', 'green')
        .attr('x', d => xScale(d))
        .attr('y', height)
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .transition()
        .attr('height', d => yScale(d))
        .attr('y', d => height - yScale(d))
        .duration(1000)
        .ease('elastic');
    };

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg
    .append('text')
    .attr('x', (width / 2))
    .attr('y', 0 + height * 0.1)
    .attr('text-anchor', 'middle')
    .style('font-size', '16px')
    .text(this.props.feature.node);

    svg.call(init);
  }

  render() {
    return (
      <div className="col-md-2" ref="mountPoint" />
    );
  }
}

export default ProbabilityChart;
