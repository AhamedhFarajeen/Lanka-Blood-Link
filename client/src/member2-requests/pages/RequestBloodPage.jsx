import React from 'react';
import BloodRequestForm from '../components/BloodRequestForm';

const RequestBloodPage = () => {
    const handleFormSubmit = (formData) => {
        console.log('Submitted Blood Request Data:', formData);
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Request Blood</h1>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>
                Please complete the form below to submit a blood request. You can specify whether you need blood for a <strong>Normal</strong> requirement or a critical <strong>Emergency</strong>.
            </p>

            <BloodRequestForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default RequestBloodPage;
