import { useState } from 'react';

const nameRegex = /^[a-zA-Zა-ჰ]+$/;

const useEmpValidation = () => {
  const [errors, setErrors] = useState({
    name: '',
    lastName: '',
    avatar: '',
    department: '',
  });

  const [labelColors, setLabelColors] = useState({
    name: '#6C757D', 
    lastName: '#6C757D', 
    avatar: '#6C757D', 
    department: '#6C757D', 
    nameMinLength: '#6C757D',
    nameMaxLength: '#6C757D',
    lastNameMinLength: '#6C757D',
    lastNameMaxLength: '#6C757D',
  });

  const validate = (fieldName, value) => {
    switch (fieldName) {
      case 'name':
        // Name Length Validation
        if (value.length < 2) {
          setErrors((prev) => ({ ...prev, name: 'Name must be at least 2 characters.' }));
          setLabelColors((prev) => ({ ...prev, nameMinLength: 'red' }));
        } else {
          setLabelColors((prev) => ({ ...prev, nameMinLength: 'green' }));
        }
        
        if (value.length > 255) {
          setErrors((prev) => ({ ...prev, name: 'Name cannot exceed 255 characters.' }));
          setLabelColors((prev) => ({ ...prev, nameMaxLength: 'red' }));
        } else {
          setLabelColors((prev) => ({ ...prev, nameMaxLength: 'green' }));
        }

        if (!nameRegex.test(value)) {
          setErrors((prev) => ({ ...prev, name: 'Name must contain only Georgian or English letters.' }));
          setLabelColors((prev) => ({ ...prev, name: 'red' }));
        } else {
          setErrors((prev) => ({ ...prev, name: '' }));
          setLabelColors((prev) => ({ ...prev, name: 'green' }));
        }
        break;

      case 'lastName':
        // Similar logic for last name
        if (value.length < 2) {
          setErrors((prev) => ({ ...prev, lastName: 'Last name must be at least 2 characters.' }));
          setLabelColors((prev) => ({ ...prev, lastNameMinLength: 'red' }));
        } else {
          setLabelColors((prev) => ({ ...prev, lastNameMinLength: 'green' }));
        }

        if (value.length > 255) {
          setErrors((prev) => ({ ...prev, lastName: 'Last name cannot exceed 255 characters.' }));
          setLabelColors((prev) => ({ ...prev, lastNameMaxLength: 'red' }));
        } else {
          setLabelColors((prev) => ({ ...prev, lastNameMaxLength: 'green' }));
        }

        if (!nameRegex.test(value)) {
          setErrors((prev) => ({ ...prev, lastName: 'Last name must contain only Georgian or English letters.' }));
          setLabelColors((prev) => ({ ...prev, lastName: 'red' }));
        } else {
          setErrors((prev) => ({ ...prev, lastName: '' }));
          setLabelColors((prev) => ({ ...prev, lastName: 'green' }));
        }
        break;

      case 'avatar':
        // Avatar validation logic...
        break;

      case 'department':
        if (!value) {
          setErrors((prev) => ({ ...prev, department: 'Department is required.' }));
          setLabelColors((prev) => ({ ...prev, department: 'red' }));
        } else {
          setErrors((prev) => ({ ...prev, department: '' }));
          setLabelColors((prev) => ({ ...prev, department: 'green' }));
        }
        break;

      default:
        break;
    }
  };

  return {
    errors,
    labelColors,
    validate,
  };
};

export default useEmpValidation;
