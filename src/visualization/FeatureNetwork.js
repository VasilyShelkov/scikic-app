import React, { Component } from 'react';
import d3 from 'd3';

class FeatureNetwork extends Component {
  componentDidMount() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.6;

    const force = d3.layout.force()
      .charge(-120)
      .linkDistance(100)
      .size([width, height])
      .nodes(d3.values(this.props.nodes))
      .links(this.props.links);

    const svg = d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const link = svg.selectAll('line')
      .data(force.links())
      .enter()
      .append('line')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d) => Math.sqrt(d.value));

    const node = svg.selectAll('circle')
      .data(force.nodes())
      .enter()
      .append('circle')
      .attr('r', 20)
      .style('stroke', '#FFFFFF')
      .style('stroke-width', 1.5)
      .style('fill', 'green')
      .call(force.drag);

    node.append('text')
      .attr('x', 12)
      .attr('dy', '.35em')
      .text((d) => d);

    force.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y);
    });
    force.start();
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" />;
  }
}

export default FeatureNetwork;
