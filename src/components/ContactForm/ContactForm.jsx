import css from './ContactForm.module.scss';
import React, { useState } from 'react';
import { addContact } from '../../redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';
import toast from 'react-hot-toast';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleAddContact = userContacts => {
    const hasDuplicateContacts = contacts.some(
      contact =>
        contact.name.toLowerCase() === userContacts.name.toLowerCase() ||
        contact.number === userContacts.number
    );

    if (hasDuplicateContacts) {
      toast.error(
        `${userContacts.name} or ${userContacts.number} is already in contacts`
      );
      return;
    }
    dispatch(addContact(userContacts));
    toast.success('Contact added successfully!');
  };

  const [data, setData] = useState({ name: '', number: '' });
  const { name, number } = data;

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const userContacts = {
      name: name,
      number: number,
    };

    handleAddContact(userContacts);
    setData({ name: '', number: '' });
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit}>
      <label>
        <input
          type="text"
          value={name}
          onChange={handleInputChange}
          name="name"
          placeholder="Name"
          required
        />
      </label>
      <label>
        <input
          type="tel"
          value={number}
          onChange={handleInputChange}
          name="number"
          placeholder="Number"
          required
        />
      </label>
      <button className={css.formButton}>Add contact</button>
    </form>
  );
};
