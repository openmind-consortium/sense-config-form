import React from 'react';
import Form from "@rjsf/core";

const schema = require('../schemas/PowerBand_schema.json')

function PowerBand({changeData, input, index, number}) {
    
    return (
    
        <div>
            <h5>PowerBand {number}</h5>
            <Form schema={schema} children={true} formData={input} onChange={e=>changeData(e.formData, index)}/>
        </div>

    );
}

export default PowerBand;