import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

import styles from './styles.module.scss';

export default function InputField({
    inputId,
    displayLabel,
    errorMessage,
    isRequired,
    inputPlaceholder,
    inputType = 'text',
    inputName,
    formRegister,
    inputRequiredMessage,
    isPassword,
    validation,
}) {
    const [passwordVisibility, setPasswordVisibility] = useState(false);

    const getInputType = () => {
        if (isPassword && inputType === 'password' && passwordVisibility) {
            return 'text';
        }

        return inputType;
    };

    return (
        <div className={styles.input_field}>
            <label htmlFor={inputId}>
                {displayLabel}{' '}
                {isRequired && <span className={styles.required_star}>*</span>}
                <p className={styles.error_message}>{errorMessage}</p>
            </label>
            <input
                placeholder={inputPlaceholder}
                type={getInputType()}
                id={inputId}
                {...formRegister(inputName, {
                    required: inputRequiredMessage,
                    validate: (value) => validation && validation(value),
                })}
                className={isPassword ? styles.pass_input : ''}
                autoComplete='new-password'
            />
            {isPassword && (
                <PasswordVisibility
                    passwordVisibility={passwordVisibility}
                    setPasswordVisibility={setPasswordVisibility}
                />
            )}
            <span className={styles.border} />
        </div>
    );
}

function PasswordVisibility({ passwordVisibility, setPasswordVisibility }) {
    return (
        <FontAwesomeIcon
            icon={faEye}
            className={styles.show_pass}
            onClick={() => setPasswordVisibility(!passwordVisibility)}
        />
    );
}
