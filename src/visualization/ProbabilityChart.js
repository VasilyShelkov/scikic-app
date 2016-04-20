import React, { Component } from 'react';
import Faux from 'react-faux-dom';
import d3 from 'd3';

class ProbabilityChart extends Component {
  componentDidMount() {
    const width = 200;
    const height = 200;

    const xScale = d3.scale.ordinal()
      .domain(this.props.feature.distribution)
      .rangeBands([0, width], 0.1, 0);

    const yScale = d3.scale.linear()
      .domain([0, 1])
      .range([0, height]);

    const init = (selection) => {
      selection.selectAll('rect')
        .data(this.props.feature.distribution)
        .enter()
        .append('rect')
        .style('fill', 'green')
        .attr('x', (d) => xScale(d))
        .attr('y', (d) => height - yScale(d))
        .attr('width', xScale.rangeBand())
        .attr('height', (d) => yScale(d));
    };

    d3.select(this.refs.mountPoint)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .call(init)
      // .call(responsivefy);

    // const responsivefy = (svg) => {
    //   // get container + svg aspect ratio
    //   const container = d3.select(svg.node().parentNode),
    //     width = parseInt(svg.style('width')),
    //     height = parseInt(svg.style('height')),
    //     aspect = width / height;
    //
    //   // add viewBox and preserveAspectRatio properties,
    //   // and call resize so that svg resizes on inital page load
    //   svg.attr('viewBox', `0 0 ${width} ${height}`)
    //     .attr('preserveAspectRatio', 'xMinYMid')
    //     .call(resize);
    //
    //   // to register multiple listeners for same event type,
    //   // you need to add namespace, i.e., 'click.foo'
    //   // necessary if you call invoke this function for multiple svgs
    //   // api docs: https://github.com/mbostock/d3/wiki/Selections#on
    //   d3.select(window).on(`resize.${container.attr('id')}`, resize);
    //
    //   // get width of container and resize svg to fit it
    //   const resize = () => {
    //     const targetWidth = parseInt(container.style('width'), 10);
    //     svg.attr('width', targetWidth);
    //     svg.attr('height', Math.round(targetWidth / aspect));
    //   };
    // };
  }

  render() {
    return (
      <div className="col-md-2" ref="mountPoint" />
    );
  }
}

export default ProbabilityChart;
