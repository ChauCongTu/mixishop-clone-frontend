import React from 'react';

interface Props {
    desc: string;
}

const ProductDesc: React.FC<Props> = ({ desc }) => {
    // Sử dụng dangerouslySetInnerHTML để render HTML
    const createMarkup = () => ({ __html: desc });

    return (
        <div dangerouslySetInnerHTML={createMarkup()} />
    );
}

export default ProductDesc;
