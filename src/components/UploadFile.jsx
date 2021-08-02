import React from "react";
import { Form, Container, Button } from "react-bootstrap";

function UploadFile({updateFile}) {
    const [file,setFile] = React.useState(null)
    const [fileName, setFileName] = React.useState(null)
    const handleSubmit = (e) => {
        // Only accept json files
        if (e.target.files[0].type==="application/json"){
          console.log(e)
          // Read json file
          const fileReader = new FileReader();
          setFileName(e.target.files[0].name)
          fileReader.readAsText(e.target.files[0], "UTF-8");
          fileReader.onload = e => {
          setFile(JSON.parse(e.target.result));
        };
        }
        else {
          window.alert("Not a JSON file")
        }
        
    }

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
          <Form.Control type="file" onChange={e=>handleSubmit(e)}/>
        </Form.Group>
        <Button variant="success" style={{ margin: "20px" }} disabled={file===null} onClick={()=>{
            if (file)
              updateFile(file, fileName)}}>
          Submit
        </Button>
      </Container>
    </Container>
  );
}

export default UploadFile;
