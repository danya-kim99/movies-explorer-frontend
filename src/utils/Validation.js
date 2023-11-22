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

  const resetForm = useCallback(
    (emptyValues = {}, emptyErrors = {}, emptyIsValid = false) => {
      setValues(emptyValues);
      setErrors(emptyErrors);
      setValid(emptyIsValid);
    },
    [setValues, setErrors, setValid]
  );

  return { values, errors, isValid, handleChange, resetForm, setValues };
};

export default Validation;