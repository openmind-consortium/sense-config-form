import React from 'react';
import Form from "@rjsf/core";

const schema = require('../sense_config_schema.json')

const uiSchema = {
    
};

const formData = require('../sense_config.json')

function ConfigForm(props) {
    return (
        <div style={{marginLeft: '200px', marginRight: '200px', padding: '30px'}}>
            <Form schema={schema} uiSchema={uiSchema} formData={formData}/>
        </div>
    );
}

export default ConfigForm;