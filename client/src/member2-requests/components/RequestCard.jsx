import React from 'react';
import UrgencyBadge from './UrgencyBadge';

const RequestCard = ({ request }) => {
    if (!request) return null;

    const {
        bloodGroup,
        unitsRequired,
        district,
        hospital,
        requestType,
        urgency,
        status,
        contactNumber,
        additionalInformation
    } = request;

    const cardStyle = {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '12px',
        borderBottom: '1px solid #f0f0f0',
        paddingBottom: '8px'
    };

    const detailRowStyle = {
        marginBottom: '8px',
        fontSize: '0.95rem',
        color: '#333'
    };

    return (
        <div className="request-card" style={cardStyle}>
            <div style={headerStyle}>
                <h3 style={{ margin: 0, color: '#d9534f', fontSize: '1.25rem' }}>
                    Blood Group: {bloodGroup || 'N/A'}
                </h3>
                <UrgencyBadge urgency={urgency} />
            </div>

            <div style={detailRowStyle}>
                <strong>Request Type:</strong> {requestType || 'Normal'}
            </div>
            <div style={detailRowStyle}>
                <strong>Units Required:</strong> {unitsRequired || 0}
            </div>
            <div style={detailRowStyle}>
                <strong>District:</strong> {district || 'N/A'}
            </div>
            <div style={detailRowStyle}>
                <strong>Hospital:</strong> {hospital || 'N/A'}
            </div>
            <div style={detailRowStyle}>
                <strong>Status:</strong>{' '}
                <span style={{
                    textTransform: 'capitalize',
                    fontWeight: '500',
                    color: status === 'fulfilled' ? '#28a745' : '#17a2b8'
                }}>
                    {status || 'Pending'}
                </span>
            </div>
            <div style={detailRowStyle}>
                <strong>Contact:</strong> {contactNumber || 'N/A'}
            </div>

            {additionalInformation && (
                <div style={{ ...detailRowStyle, marginTop: '12px', fontStyle: 'italic', color: '#666' }}>
                    <strong>Additional Info:</strong> {additionalInformation}
                </div>
            )}
        </div>
    );
};

export default RequestCard;
