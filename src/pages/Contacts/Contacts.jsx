import React from 'react';
import { ContactForm } from '../../components/ContactForm/ContactForm';
import { ContactsList } from '../../components/ContactList/Contactlist';
import { Filter } from '../../components/Filter/Filter';
import css from './Contacts.module.scss';

const Contacts = () => {
  return (
    <div className="animate__animated animate__fadeInDown">
      <div className={css.contacts}>
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactForm />
          <h2>Contacts</h2>
          <Filter />
          <ContactsList />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
