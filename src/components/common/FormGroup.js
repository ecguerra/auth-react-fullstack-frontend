import React from 'react'

// destructured props so that we don't have to write 'props' every time
const FormGroup = ({children, text}) => {
    return(
        <div className='form-group'>
            <label htmlFor={text}>{text.slice(0,1).toUpperCase() + text.slice(1, text.length)}</label>
            {children}
    </div>
    )
}

export default FormGroup