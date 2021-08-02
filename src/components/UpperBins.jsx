import React from "react";
import { Table } from "react-bootstrap";
import NewWindow from "react-new-window";

const calculateUpperBins = (tdSampleRate, fftSize) => {
  let numBins = fftSize / 2;
  let binWidth = tdSampleRate / fftSize;

  let fftBins = [];
  for (let i = 0; i < numBins; i++) {
    fftBins.push(i * binWidth);
  }

  let upperBins = [];
  for (let i = 0; i < numBins; i++) {
    upperBins.push((fftBins[i] + binWidth / 2).toFixed(2));
  }
  return upperBins;
};

const UpperBins = ({ fftSize, tdSampleRate }) => (
  <NewWindow>
    <h1>Upper Bin</h1>
<h5>Fft Size: {fftSize}</h5>
<h5>TD Sample Rate: {tdSampleRate}</h5>
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Bin Index</th>
          <th>Band (Hz)</th>
        </tr>
      </thead>
      <tbody>
        {calculateUpperBins(tdSampleRate,fftSize).map((band,index)=>{
            return(
            <tr key={index}>
                <td>{index}</td>
                <td>{band}</td>
            </tr>)
        })}
      </tbody>
    </Table>
  </NewWindow>
);

export default UpperBins;
