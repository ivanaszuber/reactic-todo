/**
 * Created by Ivana on 25.7.2015..
 */

import React, { Component } from 'react';
import { canUseDOM } from 'react/lib/ExecutionEnvironment';

function setViewport(ComposedComponent) {
  return class AppViewport extends Component {

    constructor() {
      super();

      this.state = {
        viewport: canUseDOM ?
          {width: window.innerWidth, height: window.innerHeight} :
          {width: 1366, height: 768} // Default size for server-side rendering
      };

      this.handleResize = () => {
        let viewport = {width: window.innerWidth, height: window.innerHeight};
        if (this.state.viewport.width !== viewport.width ||
          this.state.viewport.height !== viewport.height) {
          this.setState({viewport: viewport});
        }
      };
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      window.addEventListener('orientationchange', this.handleResize);
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
      window.removeEventListener('orientationchange', this.handleResize);
    }

    render() {
      return <ComposedComponent {...this.props} viewport={this.state.viewport}/>;
    }

  };
}

export default setViewport;
