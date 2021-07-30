import React from "react";
import { Container, Button } from "react-bootstrap";
import FormComponent from "./components/FormComponent";
import TimeDomain from "./components/TimeDomain";
import PowerBand from "./components/PowerBand";
import NavBar from "./components/NavBar";

import "./App.css";

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
const inputForm = require("./sense_config.json");

function App() {
  const [formData, setFormData] = React.useState(defaultSense);
  const [tdSampleRate, setSampleRate] = React.useState(1000);
  const [fftSize, setFftSize] = React.useState(1024);
  const [tdEnabled, setTdEnabled] = React.useState([
    false,
    false,
    false,
    false,
  ]);
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

  const uploadForm = () => {
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
    setSampleRate(inputForm.Sense.TDSampleRate);
    setFftSize(inputForm.Sense.FFT.FftSize);
    setFormData(inputForm);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  const changeData = (data, sense) => {
    if (sense) {
      formData["Sense"] = data;
      setSampleRate(formData.Sense.TDSampleRate);
      setFftSize(formData.Sense.FFT.FftSize);
    } else {
      setFormData(data);
    }
  };

  const updateTimeDomain = (data, index) => {
    if (data) {
      formData["Sense"]["TimeDomains"][index] = data;
      var newTdEnabled = [...tdEnabled];
      newTdEnabled[index] = data.IsEnabled;
      setTdEnabled(newTdEnabled);
    }
  };

  const updatePowerBands = (data, index) => {
    if (data) {
      formData["Sense"]["PowerBands"][index] = data;
      var newPbEnabled = [...pbEnabled];
      newPbEnabled[index] = data.IsEnabled;
      setPbEnabled(newPbEnabled);
    }
  };

  return (
    <Container fluid>
      <NavBar />
      <Container id="general">
        <h1 style={{ marginLeft: "55px", paddingTop: "80px" }}>General</h1>
        <Container className="main-window">
          <Container>
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
          <Container>
            <FormComponent
              schema={require("./schemas/SenseOptions_schema.json")}
              changeData={changeData}
              sense={false}
              input={formData}
            />
          </Container>
          <Container>
            <FormComponent
              schema={require("./schemas/StreamEnables_schema.json")}
              changeData={changeData}
              sense={false}
              input={formData}
            />
          </Container>
        </Container>
        <h1 id="sensing" style={{ marginLeft: "55px", paddingTop: "60px" }}>
          Sensing
        </h1>
        <Container className="main-window">
          <Container>
            <FormComponent
              schema={require("./schemas/FFT_schema.json")}
              changeData={changeData}
              sense={true}
              input={formData.Sense}
            />
          </Container>

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
        <Container>
          <Container
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <h1 id="time-domains" style={{ paddingTop: "60px" }}>
              Time Domains
            </h1>
            <Button
              onClick={uploadForm}
              variant="secondary"
              style={{ marginTop: "60px" }}
            >
              Upload
            </Button>
          </Container>

          <Container style={{ display: "flex" }}>
            <Container
              className={tdEnabled[0] ? "td-enabled" : "td-disabled"}
              style={{ marginRight: "20px" }}
            >
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[0]}
                index={0}
              />
              <Container className="powerband-column">
                <Container
                  className={tdEnabled[0] && pbEnabled[0] ? "pb-enabled" : "pb-disabled"}
                >
                  
                  <PowerBand
                    changeData={updatePowerBands}
                    input={formData.Sense.PowerBands[0]}
                    index={0}
                    number={0}
                  />
                </Container>
                <Container
                  className={tdEnabled[0] && pbEnabled[1] ? "pb-enabled" : "pb-disabled"}
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

            <Container className={tdEnabled[1] ? "td-enabled" : "td-disabled"}>
              <TimeDomain
                changeData={updateTimeDomain}
                input={formData.Sense.TimeDomains[1]}
                index={1}
              />
              <Container></Container>
            </Container>
          </Container>
          <Container style={{ display: "flex" }}></Container>
        </Container>
        <Container style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" onClick={handleSubmit}>
            Submit
          </Button>
        </Container>
      </Container>
    </Container>
  );
}

export default App;
