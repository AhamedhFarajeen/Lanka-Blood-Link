import React from 'react';
import RequestCard from './RequestCard';

const RequestList = ({ requests }) => {
    if (!requests || requests.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '30px', color: '#666', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
                <p style={{ margin: 0, fontSize: '1.1rem' }}>No blood requests found at the moment.</p>
            </div>
        );
    }

    return (
        <div className="request-list">
            {requests.map((request, index) => (
                <RequestCard key={request.id || index} request={request} />
            ))}
        </div>
    );
};

export default RequestList;
