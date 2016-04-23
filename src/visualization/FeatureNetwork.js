import React, { Component } from 'react';
import d3 from 'd3';

class FeatureNetwork extends Component {
  componentDidMount() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.6;

    const force = this.props.force
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
      .append('g')
      .call(force.drag);

    node.append('circle')
      .attr('r', 60)
      .style('fill', d => d.color);

    node.append('text')
      .attr('x', 0)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => d.name);

    force.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    force.start();
  }

  componentDidUpdate() {
    const width = $(this.refs.mountPoint).width();
    const height = $(window).height() * 0.6;

    const force = this.props.force
      .size([width, height])
      .nodes(d3.values(this.props.nodes))
      .links(this.props.links);

    const network = d3.select(this.refs.mountPoint).select('svg');

    const link = network.selectAll('line')
      .data(force.links())
      .enter()
      .append('line')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d) => Math.sqrt(d.value));

    const node = network.selectAll('circle')
      .data(force.nodes())
      .enter()
      .append('g')
      .call(force.drag);

    node.append('circle')
      .attr('r', 60)
      .style('fill', d => d.color);

    node.append('text')
      .attr('x', 0)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => d.name);

    force.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    force.start();
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" />;
  }
}

export default FeatureNetwork;
