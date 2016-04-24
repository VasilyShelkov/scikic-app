import React, { Component } from 'react';
import d3 from 'd3';

class ProbabilityChart extends Component {
  componentDidMount() {
    const margin = this.props.margin;
    const width = $(this.refs.mountPoint).width() - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`);

    svg.append('g')
      .attr('class', 'y axis')
      .style('fill', 'none')
      .style('stroke', '#A0A0A0')
      .style('font', '10px sans-serif')
      .style('shape-rendering', 'crispEdges');

    this.updateGraph();
  }

  componentDidUpdate() {
    this.updateGraph();
  }

  updateGraph() {
    const margin = this.props.margin;
    const width = $(this.refs.mountPoint).width() - margin.left - margin.right;
    const height = this.props.height - margin.top - margin.bottom;

    const xScale = d3.scale.ordinal()
      .domain(this.props.feature.distribution)
      .rangeBands([0, width], 0.1);

    const yScale = d3.scale.linear()
      .domain([0, d3.max(this.props.feature.distribution) * 1.05])
      .range([height, 0]);

    const yAxis = d3.svg.axis()
      .scale(yScale)
      .orient('left')
      .ticks(10, '%');

    const graph = d3.select(this.refs.mountPoint).select('svg g');

    graph.select('.y.axis')
      .transition()
      .duration(1000)
      .call(yAxis);

    const bars = graph.selectAll('rect')
      .data(this.props.feature.distribution);

    bars.enter()
      .append('rect')
      .style('fill', this.props.feature.color)
      .attr('x', d => xScale(d))
      .attr('y', height)
      .attr('width', xScale.rangeBand())
      .attr('height', 0);

    bars.transition()
      .attr('y', d => yScale(d))
      .attr('height', d => height - yScale(d))
      .duration(3000);

    bars.exit()
      .transition()
      .duration(3000)
      .attr('x', width)
      .remove();
  }

  render() {
    return (
      <div className="col-xs-12 col-sm-6 col-md-3" ref="mountPoint" style={{ textAlign: 'center' }}>
        <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
          <b>{this.props.feature.node}</b>
        </div>
      </div>
    );
  }
}

export default ProbabilityChart;
