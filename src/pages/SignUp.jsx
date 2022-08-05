import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { fetchRegister, isAuthenticated } from '../redux/slices/userAuthSlice'

function SignUp() {
    const dispatch = useDispatch()
    const isAuth = useSelector(isAuthenticated)
    const [passwordVisibility, setPasswordVisibility] = React.useState(false)
    const [passwordRepeatVisibility, setPasswordRepeatVisibility] = React.useState(false)

    const { register, handleSubmit, formState: { errors, isValid }, getValues } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        },
        mode: 'onChange',
    })

    const onSubmit = async (values) => {
        const data = await dispatch(fetchRegister(values))
        if ('token' in data.payload) {
            window.localStorage.setItem('token', data.payload.token)
        } else {
            alert('Could not sign up')
        }
    }

    if (isAuth) {
        return <Navigate to='/' />
    }

    return (
        <div className='sign_in_page sign_up_page'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form'>
                    <div className='input_field'>
                        <label htmlFor='name_input'>Name</label>
                        <input
                            placeholder='Enter Name'
                            id='name_input'
                            type='text'
                            {...register('name', { required: "* Input name" })}
                        />
                        <span className='border'></span>
                    </div>
                    <p className='error_message'>{errors.name?.message}</p>
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
                        <label htmlFor='pass_input'>Repeat Password</label>
                        <input
                            placeholder='Enter Password'
                            id='pass_input'
                            type={passwordRepeatVisibility ? 'text' : 'password'}
                            {...register('confirm_password', {
                                required: "* Password doesn't match",
                                validate: value => value === getValues('password') || 'Passwords do not match'
                            }
                            )}
                        />
                        <FontAwesomeIcon icon={faEye}
                            className='show_pass'
                            onClick={() => setPasswordRepeatVisibility(!passwordRepeatVisibility)}
                        />
                        <span className='border'></span>
                    </div>
                    <p className='error_message'>{errors.password?.message}</p>
                    <button
                        className='sign_in_btn'
                        type='submit'
                        disabled={!isValid}
                    >
                        Sign in
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SignUp