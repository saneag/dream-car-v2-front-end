import styles from '../styles.module.scss';

import { faFileCirclePlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import imageCompression from 'browser-image-compression';
import { motion } from 'framer-motion';
import axios from '../../../utils/axios';
import { generateId } from '../../../utils/randomHashImages';

export default function ImageDisplay({ setIsLoading, form }) {
    const handleChangeFile = async (e) => {
        setIsLoading(true);
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
            try {
                const { data } = await axios.post('/upload', formData);
                form.setValue('imageUrl', data.url);
            } catch (error) {
                console.log(error);
            }
        } catch (err) {
            console.log(err);
        }
        setIsLoading(false);
    };

    return !form.watch('imageUrl') ? (
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
    ) : (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={styles.uploaded_image}>
            <motion.img
                src={`${process.env.REACT_APP_API_URL}${form.watch(
                    'imageUrl'
                )}`}
                alt='car'
                className={styles.car_image}
            />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                onClick={() => form.setValue('imageUrl', '')}>
                <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.delete}
                />
            </motion.div>
        </motion.div>
    );
}
