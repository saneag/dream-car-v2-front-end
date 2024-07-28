import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import InputField from '../components/SignIn/InputField';
import { fetchRegister, isAuthenticated } from '../redux/slices/userAuthSlice';

function SignUp() {
    const dispatch = useDispatch();
    const isAuth = useSelector(isAuthenticated);

    const [isLoading, setIsLoading] = React.useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        getValues,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            repeat_password: '',
        },
        mode: 'onChange',
    });

    const onSubmit = async (values) => {
        setIsLoading(true);
        const data = await dispatch(fetchRegister(values));

        if (data && data.payload?.message) {
            toast(`Could not sign in. ${data.payload.message}`, {
                type: 'error',
                closeOnClick: true,
            });
            return;
        }

        if (data && data.payload) {
            localStorage.setItem('token', data.payload.token);
        }

        setIsLoading(false);
    };

    if (isAuth) {
        return <Navigate to='/' />;
    }

    return (
        <div className='sign_in_page sign_up_page'>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='form'>
                <InputField
                    inputId='name_input'
                    displayLabel='Name'
                    errorMessage={errors.name?.message}
                    isRequired
                    formRegister={register}
                    inputName='name'
                    inputPlaceholder='Input name'
                    inputRequiredMessage='Name is required'
                />
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
                <InputField
                    inputId='repeat_pass_input'
                    displayLabel='Password'
                    errorMessage={errors.password?.message}
                    isRequired
                    formRegister={register}
                    inputName='repeat_password'
                    inputPlaceholder='Enter Password'
                    inputRequiredMessage='Password is required'
                    isPassword
                    inputType='password'
                    validation={(value) => {
                        return (
                            value === getValues('password') ||
                            'Password do not match'
                        );
                    }}
                />
                <button
                    className={`sign_in_btn ${
                        isValid || isLoading ? 'active' : 'disabled'
                    }`}
                    type='submit'
                    disabled={!isValid || isLoading}>
                    Sign up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
