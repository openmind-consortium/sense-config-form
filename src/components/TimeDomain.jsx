import React from 'react';
import Form from "@rjsf/core";

const schema = require('../schemas/TimeDomain_schema.json')

const uiSchema = {
    "Hpf": {
        "ui:title": "Hpf (Hz)"
    },
    "Lpf1": {
        "ui:title": "Lpf1 (Hz)"
    },
    "Lpf2": {
        "ui:title": "Lpf2 (Hz)"
    }
}

function TimeDomain({changeData, input, index}) {
    return (
        <div style={{padding: '30px'}}>
            <h3>Time Domain {index}</h3>
            <Form schema={schema} children={true} uiSchema={uiSchema} formData={input} onChange={e=>changeData(e.formData, index)}/>
        </div>
    );
}

export default TimeDomain;