import React from 'react';
import './FormLabel.css';

const FormLabel = ({ title, name, values, handleChange, errors, minLength, maxLength, pattern, isLoading }) => {
  return (
    <label className='form-label'>
      <span className='form-label__input-name'>{title}</span>
        <input
          type={name}
          name={name}
          minLength={minLength}
          maxLength={maxLength}
          placeholder={title}
          className='form-label__input'
          onChange={handleChange}
          value={values}
          pattern={pattern}
          required
          disabled={isLoading}
        />
      <span className='form-label__span-error'>{errors[`${name}`]}</span>
    </label>
  )
}

export default FormLabel