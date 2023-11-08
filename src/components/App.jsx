import { ContactForm } from './ContactForm/ContactForm';
import { ContactsList } from './ContactList/Contactlist';
import { Filter } from './Filter/Filter';
import css from './App.module.scss';

export const App = () => {
  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactsList />
    </div>
  );
};
