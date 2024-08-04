import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Controller } from 'react-hook-form';

import styles from './styles.module.scss';

function ShowInputs({ form, name }) {
    return (
        <div className={styles.input_field}>
            <label>{name.replace(/_/, ' ')}</label>
            <Controller
                name={name}
                control={form.control}
                render={({ field }) => (
                    <>
                        <input
                            value={field.value}
                            type={
                                name === 'year' ||
                                name === 'engine_capacity' ||
                                name === 'engine_power' ||
                                name === 'price'
                                    ? 'number'
                                    : 'text'
                            }
                            onChange={field.onChange}
                        />
                        {field.value && (
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={styles.delete_icon}
                                onClick={() => form.setValue(name, '')}
                            />
                        )}
                    </>
                )}
            />
        </div>
    );
}

export default React.memo(ShowInputs);
