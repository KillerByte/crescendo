/*requirejs.config({
    //"baseUrl": "/",
    "paths": {
      "artifacts":       "./artifacts",

      "text":            "https://unpkg.com/requirejs-text@2.0.15/text",

      "ethers":          "https://unpkg.com/ethers@5.0.17/dist/ethers.umd",
      "react":           "https://unpkg.com/react@16/umd/react.development",
      "react-dom":       "https://unpkg.com/react-dom@16/umd/react-dom.development",
      "@portis/web3":    "https://unpkg.com/@portis/web3@2.0.0-beta.59/umd/index"
    }
});*/

// Load the main app module to start the app
//requirejs(["./components/CrecUniswap.js"]);

//requirejs(['./components/CrecUniswap.js', './components/CrecTransfer.js', 'react', 'react-dom'], (CrecUniswap, CrecTransfer, React, ReactDOM) => {

import CrecUniswap from "./components/CrecUniswap";
import CrecTransfer from "./components/CrecTransfer";

import React from 'react';
import ReactDOM from 'react-dom';

//ReactDOM.render(React.createElement(CrecUniswap), document.querySelector('#crecUniswap'));

ReactDOM.render(React.createElement(CrecTransfer), document.querySelector('#crecTransfer'));

//});