import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TreeChart from './tree-chart';

const sampleData = {
  value: "1",
  children: [
    { value: "2", children: [{ value: "4" }, { value: "5" }] },
    { value: "3" },
  ],
};

ReactDOM.render(
  <React.StrictMode>
    <TreeChart dataset={sampleData} style={{
      width: '600px',
      height: '600px',
      border: '1px solid black'
    }} />
  </React.StrictMode>,
  document.getElementById('root')
);
