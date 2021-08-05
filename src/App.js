import React from "react";
import { Container, Button } from "react-bootstrap";
import FormComponent from "./components/FormComponent";
import TimeDomain from "./components/TimeDomain";
import PowerBand from "./components/PowerBand";
import NavBar from "./components/NavBar";
import LowerBins from "./components/LowerBins";
import UpperBins from "./components/UpperBins";
import UploadFile from "./components/UploadFile";
import FileName from "./components/FileName";

import "./App.css";

// Schema validator
var Validator = require("jsonschema").Validator;
var v = new Validator();
// Master schema
const master_schema = require("./schemas/sense_config_schema.json");

// Default sense for initial load
const defaultSense = {
  Sense: {
    TDSampleRate: 1000,
    FFT: {
      FftSize: 1024,
    },
    TimeDomains: [{}, {}, {}, {}],
    PowerBands: [{}, {}, {}, {}, {}, {}, {}, {}],
  },
};

function App() {
  // The form with all values
  const [formData, setFormData] = React.useState(defaultSense);
  // Uploaded file name
  const [fileName, setFileName] = React.useState("sense");
  // Sample rate and fft size for bin calculations
  const [tdSampleRate, setSampleRate] = React.useState(1000);
  const [fftSize, setFftSize] = React.useState(1024);
  // Enabled td channels
  const [tdEnabled, setTdEnabled] = React.useState([
    false,
    false,
    false,
    false,
  ]);
  // Enabled powerbands
  const [pbEnabled, setPbEnabled] = React.useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  // Popup window for upper and lower bins
  const [showLowerBins, setShowLowerBins] = React.useState(false);
  const [showUpperBins, setShowUpperBins] = React.useState(false);
  // Dropdown for file upload
  const [showUploadFile, setShowUploadFile] = React.useState(false);
  // Show download button and download link
  const [downloadHref, setHref] = React.useState("");
  const [downLoadDisabled, setDownloadDisabled] = React.useState(true);
  // Function called when an uploaded form is submitted
  const uploadForm = (inputForm, inputName) => {
    // Sets the enabled TD and powerbands
    setTdEnabled([
      inputForm.Sense.TimeDomains[0].IsEnabled,
      inputForm.Sense.TimeDomains[1].IsEnabled,
      inputForm.Sense.TimeDomains[2].IsEnabled,
      inputForm.Sense.TimeDomains[3].IsEnabled,
    ]);
    setPbEnabled([
      inputForm.Sense.PowerBands[0].IsEnabled,
      inputForm.Sense.PowerBands[1].IsEnabled,
      inputForm.Sense.PowerBands[2].IsEnabled,
      inputForm.Sense.PowerBands[3].IsEnabled,
      inputForm.Sense.PowerBands[4].IsEnabled,
      inputForm.Sense.PowerBands[5].IsEnabled,
      inputForm.Sense.PowerBands[6].IsEnabled,
      inputForm.Sense.PowerBands[7].IsEnabled,
    ]);
    // Sets the new sample rate and fft size
    setSampleRate(inputForm.Sense.TDSampleRate);
    setFftSize(inputForm.Sense.FFT.FftSize);
    // Overwrites formData
    setFormData(inputForm);
    // Hide upload file dropdown
    setShowUploadFile(false);
    // Updates file name
    setFileName(inputName);
    // Requires revalidation
    setDownloadDisabled(true);
  };

  const validate = () => {
    // Validates formData to the schema
    if (v.validate(formData, master_schema).errors.length === 0) {
      // Validates file name
      if (fileName.length > 5 && fileName.endsWith(".json")) {
        // If validated, allow download and update download link
        setDownloadDisabled(false);
        setHref(
          `data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(formData)
          )}`
        );
        window.confirm(`Please comfirm your file name: ${fileName}`);
      }
      else{
        window.alert("File name not valid")
      }
    } else {
      window.alert("There are some required fields missing");
    }
  };

  // Data update for General and Sensing section
  const changeData = (data, sense) => {
    // If the data comes from the sensing section
    if (sense) {
      formData["Sense"] = data;
      // Updates sample rate and fft size
      setSampleRate(formData.Sense.TDSampleRate);
      setFftSize(formData.Sense.FFT.FftSize);
    } else {
      setFormData(data);
    }
    // Requires revalidation
    setDownloadDisabled(true);
  };

  // Data update for time domain data
  const updateTimeDomain = (data, index) => {
    if (data) {
      formData["Sense"]["TimeDomains"][index] = data;
      // Checks if enabled and updates the array
      var newTdEnabled = [...tdEnabled];
      newTdEnabled[index] = data.IsEnabled;
      setTdEnabled(newTdEnabled);
    }
    // Requires revalidation
    setDownloadDisabled(true);
  };

  // Data update for powerbands data
  const updatePowerBands = (data, index) => {
    if (data) {
      formData["Sense"]["PowerBands"][index] = data;
      // Checks if enabled and updates the array
      var newPbEnabled = [...pbEnabled];
      newPbEnabled[index] = data.IsEnabled;
      setPbEnabled(newPbEnabled);
    }
    // Requires revalidation
    setDownloadDisabled(true);
  };

  const updateFileName = (data) => {
    setFileName(data);
    // Requires revalidation
    setDownloadDisabled(true);
  };

  return (
    <Container fluid>
      <NavBar
        onUpload={() => {
          setShowUploadFile(!showUploadFile);
          window.scrollTo(0, 0);
        }}
        fileName={fileName}
        onValidate={validate}
        downloadHref={downloadHref}
        downLoadDisabled={downLoadDisabled}
      />
      {/* Upload file dropdown */}
      {showUploadFile ? <UploadFile updateFile={uploadForm} /> : ""}
      {/* General Section */}
      <Container id="general">
        <h1 style={{ marginLeft: "55px", paddingTop: "80px" }}>General</h1>
        <Container className="main-window">
          {/* 1st column */}
          <Container>
            <FileName fileName={fileName} onChange={updateFileName} />
            <FormComponent
              schema={require("./schemas/Mode_Ratio_schema.json")}
              changeData={changeData}
              sense={false}
              input={formData}
            />
            <FormComponent
              schema={require("./schemas/TDSampleRate_schema.json")}
              changeData={changeData}
              sense={true}
              input={formData.Sense}
            />
          </Container>
          {/* 2nd column */}
          <Container>
            <FormComponent
              schema={require("./schemas/SenseOptions_schema.json")}
              changeData={changeData}
              sense={false}
              input={formData}
            />
          </Container>
          {/* 3rd column */}
          <Container>
            <FormComponent
              schema={require("./schemas/StreamEnables_schema.json")}
              changeData={changeData}
              sense={false}
              input={formData}
            />
          </Container>
          {/* Sensing section */}
        </Container>
        <h1 id="sensing" style={{ marginLeft: "55px", paddingTop: "60px" }}>
          Sensing
        </h1>
        <Container className="main-window">
          {/* 1st column */}
          <Container>
            <FormComponent
              schema={require("./schemas/FFT_schema.json")}
              changeData={changeData}
              sense={true}
              input={formData.Sense}
            />
          </Container>
          {/* 2nd column */}
          <Container>
            <FormComponent
              schema={require("./schemas/Accelerometer_schema.json")}
              changeData={changeData}
              sense={true}
              input={formData.Sense}
            />
            <FormComponent
              schema={require("./schemas/Misc_schema.json")}
              changeData={changeData}
              sense={true}
              input={formData.Sense}
            />
          </Container>
        </Container>
        {/* Time Domains section */}
        <Container>
          <Container style={{ display: "flex", gap: "30px" }}>
            <h1 id="time-domains" style={{ paddingTop: "60px" }}>
              Time Domains
            </h1>
            {/* Button for lower bins */}
            <Button
              onClick={() => {
                setShowLowerBins(!showLowerBins);
              }}
              variant="secondary"
              style={{ marginTop: "60px", marginLeft: "100px" }}
            >
              Lower Bins
            </Button>
            {/* Button for upper bins */}
            <Button
              onClick={() => {
                setShowUpperBins(!showUpperBins);
              }}
              variant="secondary"
              style={{ marginTop: "60px" }}
            >
              Upper Bins
            </Button>
          </Container>
          <p style={{padding:'15px'}}>No more than two channels can be on a single bore. When configuring, channels on first bore will always be first.</p>
          <Container style={{ display: "flex" }}>
            {/* Time Domain 0 */}
            <Container
              className={tdEnabled[0] ? "td-enabled" : "td-disabled"}
              style={{ marginRight: "20px" }}
            >
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[0]}
                index={0}
              />
              {/* Powerbands 0,1 */}
              <Container className="powerband-column">
                <Container
                  className={
                    tdEnabled[0] && pbEnabled[0] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[0]}
                    index={0}
                    number={0}
                  />
                </Container>
                <Container
                  className={
                    tdEnabled[0] && pbEnabled[1] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[1]}
                    index={1}
                    number={1}
                  />
                </Container>
              </Container>
            </Container>
            {/* Time Domain 1 */}
            <Container className={tdEnabled[1] ? "td-enabled" : "td-disabled"}>
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[1]}
                index={1}
              />
              {/* Powerbands 0 and 1 */}
              <Container className="powerband-column">
                <Container
                  className={
                    tdEnabled[1] && pbEnabled[2] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[2]}
                    index={2}
                    number={0}
                  />
                </Container>
                <Container
                  className={
                    tdEnabled[1] && pbEnabled[3] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[3]}
                    index={3}
                    number={1}
                  />
                </Container>
              </Container>
            </Container>
          </Container>
          <Container style={{ display: "flex" }}>
            {/* Time Domain 2 */}
            <Container
              className={tdEnabled[2] ? "td-enabled" : "td-disabled"}
              style={{ marginRight: "20px" }}
            >
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[2]}
                index={2}
              />
              {/* Powerbands 0,1 */}
              <Container className="powerband-column">
                <Container
                  className={
                    tdEnabled[2] && pbEnabled[4] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[4]}
                    index={4}
                    number={0}
                  />
                </Container>
                <Container
                  className={
                    tdEnabled[2] && pbEnabled[5] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[5]}
                    index={5}
                    number={1}
                  />
                </Container>
              </Container>
            </Container>
            {/* Time Domain 3 */}
            <Container
              className={tdEnabled[3] ? "td-enabled" : "td-disabled"}
              style={{ marginRight: "20px" }}
            >
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[3]}
                index={3}
              />
              {/* Powerbands 0,1 */}
              <Container className="powerband-column">
                <Container
                  className={
                    tdEnabled[3] && pbEnabled[6] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[6]}
                    index={6}
                    number={0}
                  />
                </Container>
                <Container
                  className={
                    tdEnabled[3] && pbEnabled[7] ? "pb-enabled" : "pb-disabled"
                  }
                >
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[7]}
                    index={7}
                    number={1}
                  />
                </Container>
              </Container>
            </Container>
          </Container>
        </Container>
      </Container>

      {showLowerBins ? (
        <LowerBins fftSize={fftSize} tdSampleRate={tdSampleRate} />
      ) : (
        ""
      )}
      {showUpperBins ? (
        <UpperBins fftSize={fftSize} tdSampleRate={tdSampleRate} />
      ) : (
        ""
      )}
    </Container>
  );
}

export default App;
