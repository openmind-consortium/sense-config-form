import React from "react";
import { Form, Container, Button } from "react-bootstrap";

var Validator = require("jsonschema").Validator;
var v = new Validator();
const master_schema = require("../schemas/sense_config_schema.json");

function UploadFile({ updateFile }) {
  const [file, setFile] = React.useState(null);
  const [fileName, setFileName] = React.useState(null);
  const handleSubmit = (e) => {
    // Only accept json files
    if (e.target.files[0] && e.target.files[0].type === "application/json") {
      // Set file name
      setFileName(e.target.files[0].name);
      // Read json file
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (e) => {
        // Get JSON data
        const json = JSON.parse(e.target.result);
        // Validate against master schema
        if (v.validate(json, master_schema).errors.length === 0) {
          // Upload success
          setFile(JSON.parse(e.target.result));
        } else {
          window.alert("JSON file not valid");
        }
      };
    } else {
      window.alert("Not a JSON file");
    }
  };

  return (
    <Container style={{ paddingTop: "60px" }}>
      <h3 style={{ margin: "40px" }}>Upload Sense Configuration</h3>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          border: "3px solid #808080",
          margin: "20px",
        }}
      >
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>Sense JSON file</Form.Label>
          <Form.Control type="file" onChange={(e) => handleSubmit(e)} />
        </Form.Group>
        <Button
          variant="success"
          style={{ margin: "20px" }}
          disabled={file === null}
          onClick={() => {
            if (file) updateFile(file, fileName);
          }}
        >
          Submit
        </Button>
      </Container>
    </Container>
  );
}

export default UploadFile;
