import { faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import imageCompression from 'browser-image-compression';
import { motion } from 'framer-motion';
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

import axios from '../../utils/axios';
import { generateId } from '../../utils/randomHashImages';

import ShowInputs from '../../components/ShowInputs';

import { isAuthenticated } from '../../redux/slices/userAuthSlice';

import styles from './styles.module.scss';

function AddCar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isAuth = useSelector(isAuthenticated);

    const [brand, setBrand] = React.useState('');
    const [model, setModel] = React.useState('');
    const [year, setYear] = React.useState('');
    const [fuel_type, setFuelType] = React.useState('');
    const [engine_capacity, setEngineCapacity] = React.useState('');
    const [engine_power, setEnginePower] = React.useState('');
    const [traction_type, setTractionType] = React.useState('');
    const [gearbox_type, setGearboxType] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [imageUrl, setImageUrl] = React.useState('');

    const statesNameArray = [
        'brand',
        'model',
        'year',
        'fuel_type',
        'engine_capacity',
        'engine_power',
        'traction_type',
        'gearbox_type',
        'price',
    ];

    const leftStatesArray = [brand, model, year, fuel_type, engine_capacity];
    const rightStatesArray = [engine_power, traction_type, gearbox_type, price];

    const leftOptionsArray = [
        setBrand,
        setModel,
        setYear,
        setFuelType,
        setEngineCapacity,
    ];
    const rightOptionsArray = [
        setEnginePower,
        setTractionType,
        setGearboxType,
        setPrice,
    ];

    const handleChangeFile = async (e) => {
        try {
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true,
            };
            const formData = new FormData();
            try {
                const compressedFile = await imageCompression(
                    e.target.files[0],
                    options
                );
                const name = e.target.files[0].name.replace(' ', '-');
                const generatedId = `${name.split('.')[0]}-${generateId(32)}.${
                    name.split('.')[1]
                }`;
                const file = new File([compressedFile], generatedId, {
                    type: e.target.files[0].type,
                });
                formData.append('image', file);
            } catch (err) {
                console.log('something went wrong');
            }
            const { data } = await axios.post('/upload', formData);
            setImageUrl(data.url);
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        try {
            const fields = {
                brand,
                model,
                year,
                fuel_type,
                engine_capacity,
                engine_power,
                traction_type,
                gearbox_type,
                price,
                imageUrl,
            };
            //eslint-disable-next-line
            const { data } = id
                ? await axios.patch(`/cars/${id}`, fields)
                : await axios.post('/cars', fields);
            navigate('/');
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        if (id) {
            axios
                .get(`/cars/${id}`)
                .then(({ data }) => {
                    setBrand(data.brand);
                    setModel(data.model);
                    setYear(data.year);
                    setFuelType(data.fuel_type);
                    setEngineCapacity(data.engine_capacity);
                    setEnginePower(data.engine_power);
                    setTractionType(data.traction_type);
                    setGearboxType(data.gearbox_type);
                    setPrice(data.price);
                    setImageUrl(data.imageUrl);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [id]);

    if (
        !(
            window.localStorage.getItem('token') ||
            window.sessionStorage.getItem('token')
        ) &&
        !isAuth
    ) {
        return <Navigate to='/' />;
    }

    return (
        <main className={styles.root}>
            <div className={styles.add_car_form}>
                <p className={styles.caption}>Add Car</p>
                <form>
                    <div>
                        {leftStatesArray.map((value, index) => {
                            return (
                                <ShowInputs
                                    key={statesNameArray[index]}
                                    value={statesNameArray[index]}
                                    states={leftStatesArray[index]}
                                    options={leftOptionsArray[index]}
                                />
                            );
                        })}
                    </div>
                    <div>
                        {rightStatesArray.map((value, index) => {
                            return (
                                <ShowInputs
                                    key={statesNameArray[index + 5]}
                                    value={statesNameArray[index + 5]}
                                    states={rightStatesArray[index]}
                                    options={rightOptionsArray[index]}
                                />
                            );
                        })}
                        {!imageUrl && (
                            <div className={styles.input_field}>
                                <input
                                    id='file_upload'
                                    type='file'
                                    accept='image/*'
                                    onChange={handleChangeFile}
                                />
                                <label
                                    htmlFor='file_upload'
                                    className={styles.file_upload}>
                                    <p>Image URL</p>
                                    <FontAwesomeIcon icon={faFileCirclePlus} />
                                </label>
                            </div>
                        )}
                        {imageUrl && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className={styles.input_field}>
                                <button
                                    type='button'
                                    onClick={handleSubmit}
                                    className={styles.submit_btn}>
                                    Submit
                                </button>
                            </motion.div>
                        )}
                    </div>
                </form>
                {imageUrl && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className={styles.uploaded_image}>
                        <motion.img
                            src={`${process.env.REACT_APP_API_URL}${imageUrl}`}
                            alt='car'
                            className={styles.car_image}
                        />
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setImageUrl('')}>
                            <FontAwesomeIcon
                                icon={faXmark}
                                className={styles.delete}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </div>
        </main>
    );
}

export default React.memo(AddCar);
