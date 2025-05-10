import React, { useState } from 'react';
import styles from '../styles/UpdateProfileForm.module.css';
import { FaUser, FaPhone, FaMapMarkerAlt, FaCamera } from 'react-icons/fa';

const UpdateProfileForm = ({ userData, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userData?.name || '',
        number: userData?.number || '',
        address: userData?.address || '',
        imageUrl: userData?.imageUrl || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(formData);
        setIsEditing(false);
    };

    return (
        <div className={styles.profileForm}>
            <div className={styles.header}>
                <h2>Profile Information</h2>
                <button 
                    className={styles.editButton}
                    onClick={() => setIsEditing(!isEditing)}
                >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.imageSection}>
                    <div className={styles.imageContainer}>
                        {formData.imageUrl ? (
                            <img src={formData.imageUrl} alt="Profile" />
                        ) : (
                            <div className={styles.placeholderImage}>
                                <FaUser />
                            </div>
                        )}
                        {isEditing && (
                            <div className={styles.imageOverlay}>
                                <FaCamera />
                                <span>Change Photo</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.inputGroup}>
                    <div className={styles.inputWrapper}>
                        <FaUser className={styles.icon} />
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            disabled={!isEditing}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputWrapper}>
                        <FaPhone className={styles.icon} />
                        <input
                            type="tel"
                            name="number"
                            value={formData.number}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            disabled={!isEditing}
                            className={styles.input}
                        />
                    </div>

                    <div className={styles.inputWrapper}>
                        <FaMapMarkerAlt className={styles.icon} />
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            placeholder="Address"
                            disabled={!isEditing}
                            className={styles.textarea}
                            rows="3"
                        />
                    </div>
                </div>

                {isEditing && (
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.saveButton}>
                            Save Changes
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default UpdateProfileForm; 