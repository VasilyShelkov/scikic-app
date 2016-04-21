import React, { Component } from 'react';
import Faux from 'react-faux-dom';
import d3 from 'd3';

class ProbabilityChart extends Component {
  componentDidMount() {
    const margin = { top: 20, right: 30, bottom: 30, left: 47 };
    const width = $(this.refs.mountPoint).width() - margin.left - margin.right;
    const height = $(window).height() * 0.2 - margin.top - margin.bottom;

    const xScale = d3.scale.ordinal()
      .domain(this.props.feature.distribution)
      .rangeBands([0, width], 0.1, 0);

    const yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.feature.distribution) * 1.2])
      .range([height, 0]);

    const init = (selection) => {
      selection.selectAll('rect')
        .data(this.props.feature.distribution)
        .enter()
        .append('rect')
        .style('fill', this.props.feature.color)
        .attr('x', d => xScale(d))
        .attr('y', height)
        .attr('width', xScale.rangeBand())
        .attr('height', 0)
        .transition()
        .attr('height', d => height - yScale(d))
        .attr('y', d => yScale(d))
        .duration(1000)
        .ease('elastic');
    };

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('text')
      .attr('x', margin.left + 5)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text(this.props.feature.node);

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(10, '%');

    svg.append('g')
      .attr('class', 'y axis')
      .call(yAxis);

    svg.call(init);
  }

  render() {
    return (
      <div className="col-md-2" ref="mountPoint" />
    );
  }
}

export default ProbabilityChart;
