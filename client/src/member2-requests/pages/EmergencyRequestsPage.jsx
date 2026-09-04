import React from 'react';
import RequestList from '../components/RequestList';

const EmergencyRequestsPage = () => {
    // Temporary sample array to test the UI
    const sampleRequests = [
        {
            id: 'req_1',
            bloodGroup: 'O-',
            unitsRequired: 3,
            district: 'Kandy',
            hospital: 'Kandy General Hospital',
            requestType: 'Emergency',
            urgency: 'Critical',
            status: 'pending',
            contactNumber: '0771122334',
            additionalInformation: 'Patient is in ICU. Immediate requirement.'
        },
        {
            id: 'req_2',
            bloodGroup: 'A+',
            unitsRequired: 2,
            district: 'Colombo',
            hospital: 'National Hospital Colombo',
            requestType: 'Emergency',
            urgency: 'High',
            status: 'pending',
            contactNumber: '0719988776',
            additionalInformation: 'Required for emergency surgery tonight.'
        }
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '10px', color: '#d9534f' }}>
                Emergency Blood Requests
            </h1>
            <p style={{ textAlign: 'center', marginBottom: '30px', color: '#555' }}>
                This page shows currently open emergency blood requests that require immediate attention. Every drop counts.
            </p>

            <RequestList requests={sampleRequests} />
        </div>
    );
};

export default EmergencyRequestsPage;
