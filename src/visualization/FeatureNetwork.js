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

    const path = svg.append('g').attr('class', 'path')
      .selectAll('path')
      .data(force.links())
      .enter()
      .append('path')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d) => Math.sqrt(d.value))
      .style('fill', 'none')
      .attr('marker-end', 'url(#end)');

    const node = svg.selectAll('g.node')
      .data(force.nodes())
      .enter()
      .append('g')
      .attr('class', 'node')
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
      path.attr('d', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

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

    const path = network.select('g.path').selectAll('path')
      .data(force.links());

    path.enter().append('path')
      .style('stroke', '#999999')
      .style('stroke-opacity', 0.6)
      .style('stroke-width', (d) => Math.sqrt(d.value))
      .style('fill', 'none')
      .attr('marker-end', 'url(#end)');

    const node = network.selectAll('g.node')
      .data(force.nodes());

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

    force.on('tick', () => {
      path.attr('d', d => {
        const dx = d.target.x - d.source.x;
        const dy = d.target.y - d.source.y;
        const dr = Math.sqrt(dx * dx + dy * dy);
        return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
      });

      node.attr('transform', d => `translate(${d.x}, ${d.y})`);
    });
    force.start();
  }

  render() {
    return <div className="col-xs-12" ref="mountPoint" />;
  }
}

export default FeatureNetwork;
