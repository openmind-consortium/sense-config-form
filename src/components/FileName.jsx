import React from 'react';
import Form from "@rjsf/core";

const schema = {
    type: "string",
    description: "Make sure .json is in the name"
}

function FileName({fileName, onChange}) {

    
    return (
    
        <div style={{padding: '25px', paddingBottom:'0px'}}>
            <h5>File Name</h5>
            <Form schema={schema} children={true} formData={fileName} onChange={e=>onChange(e.formData)}/>
        </div>

    );
}

export default FileName;