import { useState, useCallback } from 'react';

const Validation = (initialValues = {}, initialErrors = {}, initialValid = false) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);
  const [isValid, setValid] = useState(initialValid);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setValid(evt.target.closest('form').checkValidity());
  };

  return { values, errors, isValid, handleChange, setValues };
};

export default Validation;