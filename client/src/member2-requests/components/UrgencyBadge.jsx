import React from 'react';

const UrgencyBadge = ({ urgency }) => {
    let backgroundColor = '#e0e0e0';
    let color = '#333';

    switch (urgency) {
        case 'Low':
            backgroundColor = '#d4edda'; // light green
            color = '#155724';
            break;
        case 'Medium':
            backgroundColor = '#fff3cd'; // light yellow
            color = '#856404';
            break;
        case 'High':
            backgroundColor = '#f8d7da'; // light red
            color = '#721c24';
            break;
        case 'Critical':
            backgroundColor = '#dc3545'; // bold solid red
            color = '#ffffff';
            break;
        default:
            backgroundColor = '#e0e0e0';
            color = '#333';
    }

    const badgeStyle = {
        display: 'inline-block',
        padding: '4px 10px',
        borderRadius: '12px',
        fontSize: '0.8rem',
        fontWeight: urgency === 'Critical' ? 'bold' : '500',
        textTransform: 'uppercase',
        backgroundColor,
        color,
        boxShadow: urgency === 'Critical' ? '0 0 8px rgba(220, 53, 69, 0.6)' : 'none',
        border: urgency === 'Critical' ? '1px solid #c82333' : '1px solid transparent'
    };

    return (
        <span style={badgeStyle} className="urgency-badge">
            {urgency || 'Unknown'}
        </span>
    );
};

export default UrgencyBadge;
