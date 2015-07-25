/**
 * Created by Ivana on 25.7.2015..
 */

import 'babel/polyfill';
import React from 'react/addons';
import FastClick from 'fastclick';
import App from './components/App/App';
import AppActions from './actions/AppActions';

let path = decodeURI(window.location.pathname);

function run() {
  // Render the top-level React component
  let props = {
    path: path
  };
  let element = React.createElement(App, props);
  React.render(element, document.body);
}

// Run the application when both DOM is ready
// and page content is loaded
Promise.all([
  new Promise((resolve) => {
    if (window.addEventListener) {
      window.addEventListener('DOMContentLoaded', resolve);
    } else {
      window.attachEvent('onload', resolve);
    }
  }).then(() => FastClick.attach(document.body)),
  new Promise((resolve) => AppActions.loadPage(path, resolve))
]).then(run);
