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
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M18 19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V7H4V4h4.5l1-1h4l1 1H19v3h-1v12M6 7v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7H6m12-1V5h-4l-1-1h-3L9 5H5v1h13M8 9h1v10H8V9m6 0h1v10h-1V9Z"
                />
              </svg>
            </button>
          </li>
        );
      })}
    </ul>
  );
};
