import React, { Component } from 'react';
import d3 from 'd3';

class FeatureNetwork extends Component {
  componentDidMount() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.6;

    const force = this.props.force
      .size([width, height]);

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    svg.append('svg:defs').selectAll('marker')
      .data(['end'])
      .enter().append('svg:marker')
      .attr('id', String)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 55)
      .attr('refY', -6)
      .attr('markerWidth', 13)
      .attr('markerHeight', 13)
      .attr('orient', 'auto')
      .append('svg:path')
      .attr('d', 'M0,-5L10,0L0,5');

    svg.append('g').attr('class', 'paths');

    this.updateNetwork(force);

    force.start();
  }

  componentDidUpdate() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.6;

    const force = this.props.force.size([width, height]);

    this.updateNetwork(force);

    force.start();
  }

  updateNetwork(force) {
    const network = d3.select(this.refs.mountPoint);

    const path = network.select('g.paths')
      .selectAll('path')
      .data(force.links(), d => `${d.source.name}-${d.target.name}`);

    path.enter()
      .append('path')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', d => Math.sqrt(d.value))
      .style('fill', 'none')
      .attr('marker-end', 'url(#end)');

    path.exit().remove();

    const node = network.select('svg').selectAll('g.node')
      .data(force.nodes(), d => d.name);

    const nodeEnter = node.enter().append('g')
      .attr('class', 'node')
      .call(force.drag);

    nodeEnter.append('circle')
      .attr('r', 60)
      .style('fill', d => d.color);

    nodeEnter.append('text')
      .attr('x', 0)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => d.name);

    node.exit().remove();
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" />;
  }
}

export default FeatureNetwork;
