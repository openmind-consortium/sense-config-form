import React from 'react';
import Form from "@rjsf/core";

function FormComponent({changeData, input, schema, sense}) {
    return (
        <div style={{padding: '25px'}}>
            <Form schema={schema} children={true} formData={input} liveValidate showErrorList={false} onChange={e => changeData(e.formData, sense)}/>
        </div>
    );
}

export default FormComponent;