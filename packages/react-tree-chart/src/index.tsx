import React, { useRef, useState } from 'react';
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

const sampleDataTwo = {
  value: "100",
  children: [
    { value: "3" },
    { value: "2", children: [{ value: "555" }, { value: "444" }] },
  ],
};

const Demo = () => {
  const [dataSet, setDataset] = useState(sampleData);
  const [enableCollapse, setEnableCollapse] = useState(true);
  const treeChartRef = useRef<any>(null);

  return <div>
    <button onClick={() => setDataset(sampleDataTwo)}>change dataset</button>
    <button onClick={() => {
      console.log(!enableCollapse)
      setEnableCollapse(!enableCollapse)
    }}>toggle collapes enable</button>
    <button onClick={() => treeChartRef.current.zoomIn()}>zoom in</button>
    <button onClick={() => treeChartRef.current.zoomOut()}>zoom out</button>
    <TreeChart
      dataset={dataSet}
      ref={treeChartRef}
      collapseEnabled={enableCollapse}
      style={{
        width: '600px',
        height: '600px',
        border: '1px solid black'
      }} />
  </div>
}

ReactDOM.render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>,
  document.getElementById('root')
);
