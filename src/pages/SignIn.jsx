import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../components/SignIn/InputField';
import { fetchAuth, isAuthenticated } from '../redux/slices/userAuthSlice';

function SignIn() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthenticated);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        const data = await dispatch(fetchAuth(values));

        if (data && data.payload?.message) {
            toast(`${data.payload.message}`, {
                type: 'error',
                closeOnClick: true,
            });
            return;
        }

        if (data && data.payload) {
            localStorage.setItem('token', data.payload.token);
        }
    };

    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <div className='sign_in_page'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='form'>
                <InputField
                    inputId='email_input'
                    displayLabel='Email'
                    errorMessage={errors.email?.message}
                    isRequired
                    formRegister={register}
                    inputName='email'
                    inputPlaceholder='Enter Email'
                    inputRequiredMessage='Email is required'
                />
                <InputField
                    inputId='pass_input'
                    displayLabel='Password'
                    errorMessage={errors.password?.message}
                    isRequired
                    formRegister={register}
                    inputName='password'
                    inputPlaceholder='Enter Password'
                    inputRequiredMessage='Password is required'
                    isPassword
                    inputType='password'
                />
                <button
                    className={`sign_in_btn ${isValid ? 'active' : 'disabled'}`}
                    type='submit'
                    disabled={!isValid}>
                    Sign in
                </button>
            </form>
        </div>
    );
}

export default SignIn;
