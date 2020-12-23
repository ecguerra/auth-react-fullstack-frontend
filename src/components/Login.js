import React, { useState, useRef } from 'react'
import Form from 'react-validation/build/form'
import Input from 'react-validation/build/input'
import CheckButton from 'react-validation/build/button'

// Components
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

// Helpers
import {login} from '../services/auth.services'
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

const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState('')

    // stores username in username state
    const onChangeUsername = e => {
        const username = e.target.value
        setUsername(username)
    }

    // stores password in passowrd state
    const onChangePassword = e => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = e => {
        e.preventDefault()

        // clear message and set loading
        setMessage('')
        setLoading(true)

        // validates all the fields
        form.current.validateAll()

        // Validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0) {
            login(username, password).then(
                () => {
                    props.history.push('/profile')
                    window.location.reload()
                },
                err => {
                    setLoading(false)
                    setMessage(resMessage(err))
                }
            )
        } else {
            setLoading(false)
        }

    }

    console.log(username, password)
    return (
        <div className='col-md-12'>
            <div className='card card-container'>
                <img 
                    src='//ssl.gstatic.com/accounts/ui/avatar_2x.png'
                    alt='profile-img'
                    className='profile-img-card'
                />

                <Form onSubmit={handleLogin} ref={form}>
                    <FormGroup text='username'>
                        <Input
                            type='text'
                            className='form-control'
                            name='username'
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </FormGroup>

                    <FormGroup text='password'>
                        <Input
                            type='password'
                            className='form-control'
                            name='password'
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </FormGroup>

                    <ButtonSpinner text='login' loading={loading} />

                    {message && (
                        <div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
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

export default Login