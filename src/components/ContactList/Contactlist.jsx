import { useDispatch, useSelector } from 'react-redux';
import css from './ContactList.module.scss';
import { deleteContact, fetchContacts } from '../../redux/contactSlice';
import { selectContacts, selectFilter } from 'redux/selectors';
import { useEffect } from 'react';

export const ContactsList = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);
  const contacts = useSelector(selectContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const getContactFromFilter = () => {
    const filterContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter.toLowerCase())
    );
    return filterContacts;
  };
  const handleDelete = contactId => {
    dispatch(deleteContact(contactId));
  };

  const contactsFilter = getContactFromFilter();
  return (
    <ul className={css.contactsList}>
      {contactsFilter.map(contact => {
        const { id, name, phone } = contact;
        return (
          <li className={css.listItem} key={id}>
            <span>{name}:</span>
            <span>{phone}</span>
            <button
              type="button"
              className={css.contactsListBtn}
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
