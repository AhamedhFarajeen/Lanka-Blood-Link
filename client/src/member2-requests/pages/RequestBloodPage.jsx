import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BloodRequestForm from '../components/BloodRequestForm';
import { createRequest } from '../services/requestApi';

const RequestBloodPage = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Create the request via the API, then go straight to the matching results
    // for the new request id — this is the core "request -> see donors" flow.
    const handleFormSubmit = async (formData) => {
        setSubmitting(true);
        setError('');
        try {
            const created = await createRequest({
                ...formData,
                unitsRequired: Number(formData.unitsRequired),
            });
            navigate(`/matches/${created._id}`);
        } catch (err) {
            setError(err.message || 'Could not submit the request. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>Request Blood</h1>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>
                Please complete the form below to submit a blood request. You can specify whether you need blood for a <strong>Normal</strong> requirement or a critical <strong>Emergency</strong>.
            </p>

            {error && (
                <p role="alert" style={{ color: '#a01021', textAlign: 'center', marginBottom: '16px' }}>
                    {error}
                </p>
            )}
            {submitting && (
                <p style={{ textAlign: 'center', marginBottom: '16px', color: '#555' }}>
                    Submitting request…
                </p>
            )}

            <BloodRequestForm onSubmit={handleFormSubmit} />
        </div>
    );
};

export default RequestBloodPage;
