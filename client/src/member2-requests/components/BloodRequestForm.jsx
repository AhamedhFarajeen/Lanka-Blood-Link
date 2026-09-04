import React, { useState } from 'react';

const BloodRequestForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        requestType: 'Normal',
        bloodGroup: '',
        unitsRequired: '',
        district: '',
        hospital: '',
        urgency: 'Medium',
        contactNumber: '',
        additionalInformation: ''
    });

    const [errors, setErrors] = useState({});

    const bloodGroups = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];
    const urgencies = ['Low', 'Medium', 'High', 'Critical'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: null }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.requestType) newErrors.requestType = 'Please select a request type.';
        if (!formData.bloodGroup) newErrors.bloodGroup = 'Please select a blood group.';
        if (!formData.urgency) newErrors.urgency = 'Please select an urgency level.';

        const units = Number(formData.unitsRequired);
        if (!formData.unitsRequired || !Number.isInteger(units) || units <= 0) {
            newErrors.unitsRequired = 'Please enter a valid positive whole number of units.';
        }

        if (!formData.district.trim()) newErrors.district = 'Please provide a district.';
        if (!formData.hospital.trim()) newErrors.hospital = 'Please provide a hospital name.';

        const phoneRegex = /^(?:0|0094|\+94)[0-9]{9}$/;
        if (!formData.contactNumber.trim()) {
            newErrors.contactNumber = 'Please provide a contact number.';
        } else if (!phoneRegex.test(formData.contactNumber.replace(/\s/g, ''))) {
            newErrors.contactNumber = 'Please enter a valid Sri Lankan phone number.';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            setErrors({});
            if (onSubmit) {
                onSubmit(formData);
            }
        }
    };

    const inputStyle = {
        display: 'block',
        width: '100%',
        padding: '8px',
        marginTop: '4px',
        marginBottom: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc'
    };

    const labelStyle = {
        fontWeight: 'bold',
        display: 'block',
        marginTop: '12px'
    };

    const errorStyle = {
        color: '#d9534f',
        fontSize: '0.85rem',
        marginTop: '-4px',
        marginBottom: '8px',
        display: 'block'
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Blood Request Form</h2>
            <form onSubmit={handleSubmit}>

                {/* Request Type */}
                <label style={labelStyle}>Request Type</label>
                <div style={{ display: 'flex', gap: '10px', marginTop: '4px', marginBottom: '8px' }}>
                    <label>
                        <input
                            type="radio"
                            name="requestType"
                            value="Normal"
                            checked={formData.requestType === 'Normal'}
                            onChange={handleChange}
                        /> Normal
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="requestType"
                            value="Emergency"
                            checked={formData.requestType === 'Emergency'}
                            onChange={handleChange}
                        /> Emergency
                    </label>
                </div>
                {errors.requestType && <span style={errorStyle}>{errors.requestType}</span>}

                {/* Blood Group */}
                <label style={labelStyle}>Blood Group</label>
                <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} style={inputStyle}>
                    <option value="">-- Select Blood Group --</option>
                    {bloodGroups.map((bg) => (
                        <option key={bg} value={bg}>{bg}</option>
                    ))}
                </select>
                {errors.bloodGroup && <span style={errorStyle}>{errors.bloodGroup}</span>}

                {/* Units Required */}
                <label style={labelStyle}>Units Required</label>
                <input
                    type="number"
                    name="unitsRequired"
                    value={formData.unitsRequired}
                    onChange={handleChange}
                    min="1"
                    step="1"
                    style={inputStyle}
                    placeholder="e.g., 2"
                />
                {errors.unitsRequired && <span style={errorStyle}>{errors.unitsRequired}</span>}

                {/* District */}
                <label style={labelStyle}>District</label>
                <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="e.g., Colombo"
                />
                {errors.district && <span style={errorStyle}>{errors.district}</span>}

                {/* Hospital */}
                <label style={labelStyle}>Hospital</label>
                <input
                    type="text"
                    name="hospital"
                    value={formData.hospital}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="Enter Hospital Name"
                />
                {errors.hospital && <span style={errorStyle}>{errors.hospital}</span>}

                {/* Urgency */}
                <label style={labelStyle}>Urgency</label>
                <select name="urgency" value={formData.urgency} onChange={handleChange} style={inputStyle}>
                    <option value="">-- Select Urgency --</option>
                    {urgencies.map((u) => (
                        <option key={u} value={u}>{u}</option>
                    ))}
                </select>
                {errors.urgency && <span style={errorStyle}>{errors.urgency}</span>}

                {/* Contact Number */}
                <label style={labelStyle}>Contact Number</label>
                <input
                    type="text"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    style={inputStyle}
                    placeholder="e.g., 0712345678"
                />
                {errors.contactNumber && <span style={errorStyle}>{errors.contactNumber}</span>}

                {/* Additional Information */}
                <label style={labelStyle}>Additional Information (Optional)</label>
                <textarea
                    name="additionalInformation"
                    value={formData.additionalInformation}
                    onChange={handleChange}
                    style={{ ...inputStyle, minHeight: '80px' }}
                    placeholder="Any other details..."
                ></textarea>

                {/* Submit */}
                <button
                    type="submit"
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#d9534f',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '1rem',
                        marginTop: '20px',
                        cursor: 'pointer'
                    }}>
                    Submit Request
                </button>
            </form>
        </div>
    );
};

export default BloodRequestForm;
