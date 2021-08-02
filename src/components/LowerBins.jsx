import React from "react";
import { Table } from "react-bootstrap";
import NewWindow from "react-new-window";

const calculateLowerBins = (tdSampleRate, fftSize) => {
  let numBins = fftSize / 2;
  let binWidth = tdSampleRate / fftSize;

  let fftBins = [];
  for (let i = 0; i < numBins; i++) {
    fftBins.push(i * binWidth);
  }

  let lowerBins = [0];
  for (let i = 1; i < numBins; i++) {
    lowerBins.push((fftBins[i] - binWidth / 2).toFixed(2));
  }
  return lowerBins;
};

const LowerBins = ({ fftSize, tdSampleRate }) => (
  <NewWindow>
    <h1>Lower Bin</h1>
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
        {calculateLowerBins(tdSampleRate,fftSize).map((band,index)=>{
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

export default LowerBins;
