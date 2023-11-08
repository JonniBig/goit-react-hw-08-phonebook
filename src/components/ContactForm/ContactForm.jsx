import css from './ContactForm.module.scss';
import React, { useState } from 'react';
import { addContact } from '../../redux/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from 'redux/selectors';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const handleAddContact = userContacts => {
    const hasDuplicateContacts = contacts.some(
      contact =>
        contact.name.toLowerCase() === userContacts.name.toLowerCase() ||
        contact.phone === userContacts.phone
    );

    if (hasDuplicateContacts) {
      alert(
        `${userContacts.name} or ${userContacts.phone} is already in contacts`
      );
      return;
    }
    dispatch(addContact(userContacts));
  };

  const [data, setData] = useState({ name: '', phone: '' });
  const { name, phone } = data;

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const userContacts = {
      name: name,
      phone: phone,
    };

    handleAddContact(userContacts);
    setData({ name: '', phone: '' });
  };

  return (
    <form className={css.formContainer} onSubmit={handleSubmit}>
      <label>
        <input
          className={css.formInput}
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
          className={css.formInput}
          type="tel"
          value={phone}
          onChange={handleInputChange}
          name="phone"
          placeholder="phone"
          required
        />
      </label>
      <button className={css.formButton}>Add contact</button>
    </form>
  );
};
