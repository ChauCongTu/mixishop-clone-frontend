// src/components/ImageUpload.js

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ImageUpload = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e: any) => {
        setImage(e.target.files[0]);
    };

    const handleImageUpload = () => {
        const formData = new FormData();
        if (image)
            formData.append('image', image);

        axios.post('http://127.0.0.1:8000/api/upload', formData)
            .then(response => {
                console.log(response.data);
                toast.success('Má, thành công rồi!');
            })
            .catch(error => {
                console.error(error);
                toast.error('Haizzz, lỗi nữa dm');
            });
    };

    return (
        <div>
            <input type="file" onChange={handleImageChange} />
            <button onClick={handleImageUpload}>Upload Image</button>
        </div>
    );
};

export default ImageUpload;
