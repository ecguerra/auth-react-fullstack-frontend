import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'
import { isEmail } from 'validator'

// Components
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

// Helpers
import {signUp, login} from '../services/auth.services'
import {resMessage} from '../utilities/functions.utilities'

// function given to react-validator
const required = value => {
    if(!value) {
        return (
            <div className='alert alert-danger' role='alert'>
                This field is required
            </div>
        )
    }
}

// function that validates username
const vusername = value => {
    if(value.length < 3 || value.length >= 20) {
        return(
            <div className='alert alert-danger' role='alert'>
                The username must be between 3 and 20 characters
            </div>
        )
    }
}

// function that checks that email is in valid format
const validEmail = value => {
    if(!isEmail(value)) {
        return(
            <div className='alert alert-danger' role='alert'>
                This is not a valid email
            </div>
        )
    }
}

// function that validates password
const vpassword = value => {
    if(value.length < 6 || value.length >= 40){
        return(
            <div className='alert alert-danger' role='alert'>
                The password must be between 6 and 40 characters
            </div>
        )
    }
}

const SignUp = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [successful, setSuccessful] = useState(false)
    const [message, setMessage] = useState('')

    // stores username in username state
    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    // stores email in email state
    const onChangeEmail = e => {
        const email = e.target.value
        setEmail(email)
    }

    // stores password in passowrd state
    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const handleSignUp = e => {
        e.preventDefault()

        // clear message and set loading
        setMessage('')
        setSuccessful(false)

        // validates all the fields
        form.current.validateAll()

        // Validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0) {
            signUp(username, email, password).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                    login(username, password)
                    props.history.push('/profile')
                    window.location.reload()
                },
                // () => {
                //     login(username, password)
                // .then(()=>{
                //     props.history.push('/profile')
                //     window.location.reload()
                // })
                // },
                err => {
                    setMessage(resMessage(err))
                    setSuccessful(false)
                }
            )
        } 
        // else {
        //     setSuccessful(false)
        // }
    }

    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img 
                    src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    alt='profile-img'
                    className='profile-img-card'
                />

                <Form onSubmit={handleSignUp} ref={form}>
                    <FormGroup text='username'>
                        <Input
                            type='text'
                            className='form-control'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />
                    </FormGroup>

                    <FormGroup text='email'>
                        <Input
                            type='text'
                            className='form-control'
                            name='email'
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, validEmail]}
                        />
                    </FormGroup>
                    
                    <FormGroup text='password'>
                        <Input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />
                    </FormGroup>

                    <ButtonSpinner text='signup' loading={successful} />

                    {message && (
                        <div className='form-group'>
                            <div className= {successful ? 'alert alert-success' : 'alert alert-danger'} role='alert'>
                                {message}
                            </div>
                        </div>
                    )}
                    
                    <CheckButton style={{display:'none'}} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}

export default SignUp