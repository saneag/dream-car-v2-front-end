import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';

import ShowInputs from '../../components/ShowInputs';

import { isAuthenticated } from '../../redux/slices/userAuthSlice';

import { useForm } from 'react-hook-form';
import ImageDisplay from './ImageDisplay';
import styles from './styles.module.scss';

function AddCar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthenticated);

    const form = useForm({
        defaultValues: {
            brand: '',
            model: '',
            year: '',
            fuel_type: '',
            engine_capacity: '',
            engine_power: '',
            traction_type: '',
            gearbox_type: '',
            price: '',
            imageUrl: '',
        },
        mode: 'onChange',
    });

    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        setIsLoading(true);
        try {
            id
                ? await axios.patch(`/cars/${id}`, form.getValues())
                : await axios.post('/cars', form.getValues());
            navigate('/');
        } catch (err) {
            console.log(err);
        }

        setIsLoading(false);
    };

    React.useEffect(() => {
        if (id) {
            setIsLoading(true);
            axios
                .get(`/cars/${id}`)
                .then(({ data }) => {
                    form.reset(data);
                })
                .catch((err) => {
                    console.log(err);
                });

            setIsLoading(false);
        }
    }, [id]);

    if (!localStorage.getItem('token') && !isAuth) {
        return <Navigate to='/' />;
    }

    const leftInputs = [
        'brand',
        'model',
        'year',
        'fuel_type',
        'engine_capacity',
    ];

    const rightInputs = [
        'engine_power',
        'traction_type',
        'gearbox_type',
        'price',
    ];

    return (
        <main className={styles.root}>
            <div className={styles.add_car_form}>
                <p className={styles.caption}>Add Car</p>
                <form>
                    <div>
                        {leftInputs.map((value, index) => {
                            return (
                                <ShowInputs
                                    key={index}
                                    form={form}
                                    name={value}
                                />
                            );
                        })}
                    </div>
                    <div>
                        {rightInputs.map((value, index) => {
                            return (
                                <ShowInputs
                                    key={index}
                                    form={form}
                                    name={value}
                                />
                            );
                        })}
                    </div>
                    <ImageDisplay
                        form={form}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.input_field}
                    >
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className={styles.submit_btn}
                            disabled={isLoading}
                        >
                            Submit
                        </button>
                    </motion.div>
                </form>
            </div>
        </main>
    );
}

export default React.memo(AddCar);
