import axios from 'axios';

export const UploadImage = async (image: never) => {
    try {
        const formData = new FormData();
        formData.append('image', image);

        const response = await axios.post(process.env.NEXT_PUBLIC_API_URL + '/upload', formData);
        console.log(response.data);
        return response.data.image_url;
    } catch (error) {
        console.error(error);
        throw (error)
    }
};
