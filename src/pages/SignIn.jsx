import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { fetchAuth, isAuthenticated } from '../redux/slices/userAuthSlice'

function SignIn() {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthenticated)
    const [passwordVisibility, setPasswordVisibility] = React.useState(false)
    const [isChecked, setIsChecked] = React.useState(false)

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'onChange'
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values))
        if (isChecked && 'token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        } else if (!isChecked && 'token' in data.payload) {
            window.sessionStorage.setItem('token', data.payload.token)
        } else {
            alert('Could not sign in')
        }
    }

    if (isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div className='sign_in_page'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <div className='input_field'>
                        <label htmlFor='email_input'>Email</label>
                        <input
                            placeholder='Enter Email'
                            id='email_input'
                            type='text'
                            {...register('email', { required: "* Input email" })}
                        />
                        <span className='border'></span>
                    </div>
                    <p className='error_message'>{errors.email?.message}</p>
                    <div className='input_field'>
                        <label htmlFor='pass_input'>Password</label>
                        <input
                            placeholder='Enter Password'
                            id='pass_input'
                            type={passwordVisibility ? 'text' : 'password'}
                            {...register('password', { required: "* Input password" })}
                        />
                        <FontAwesomeIcon icon={faEye}
                            className='show_pass'
                            onClick={() => setPasswordVisibility(!passwordVisibility)}
                        />
                        <span className='border'></span>
                    </div>
                    <p className='error_message'>{errors.password?.message}</p>
                    <div className='input_field'>
                        <div className='checkbox_input'>
                            <input
                                id='checkbox_input'
                                type='checkbox'
                                onChange={() => setIsChecked(!isChecked)}
                            />
                            <label htmlFor='checkbox_input'>Stay logged in</label>
                        </div>
                    </div>
                    <button
                        className='sign_in_btn'
                        type='submit'
                        disabled={!isValid}
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div >
    )
}

export default SignIn