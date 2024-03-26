import React from 'react';
import './SmileAdd.css';
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from 'react-hook-form';
import smileValidationSchema from '../../utils/smileValidationSchema';
import FormInput from '../FormInput/FormInput';

function SmileAdd() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(smileValidationSchema()),
  });

  const onSubmitForm = async (formData) => {
    const newData = {
      name: formData.smilePic,
      pic: formData.smileText
    }

    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newData),
    })
      .then((r) => console.log(r.json()));
    console.log(errors)
  };

  return (
    <div className='form-wrap'>
      <form className='form-adder' onSubmit={handleSubmit(onSubmitForm)}>
        <FormInput type={"text"} error={errors.smilePic} register={register('smilePic')} naming={'smiley display'}/>
        <FormInput type={"text"} error={errors.smileText} register={register('smileText')} naming={'smiley text'}/>
        <button>Add new smile</button>
      </form>
    </div>
  )
}

export default SmileAdd;
