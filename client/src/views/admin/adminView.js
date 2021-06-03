import React, { Component } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControlLabel } from '@material-ui/core';
import { FormLabel, RadioGroup, Radio } from '@material-ui/core';

const AdminView = () => {
    const [value, setValue] = React.useState('0');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <div className="App">
            <h2>Question 1</h2>
            <CKEditor
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
            <h2>Correct Answer</h2>
            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                <FormControlLabel value="0" control={<Radio />} label="Answer 1" />
                <FormControlLabel value="1" control={<Radio />} label="Answer 2" />
                <FormControlLabel value="2" control={<Radio />} label="Answer 3" />
                <FormControlLabel value="3" control={<Radio />} label="Answer 4" />
            </RadioGroup>
        </div>
    )
}

export default AdminView
