import { IContact } from "../types";
import api from "../api/api";
import "./ContactList.css";

interface Props {
  contacts: IContact[];
  setEditingContact: (contact: IContact) => void;
  fetchContacts: () => void;
}

const ContactList = ({ contacts, setEditingContact, fetchContacts }: Props) => {
  const handleDelete = async (id: string) => {
    if (window.confirm("Delete contact?")) {
      try {
        await api.delete(`/contacts/${id}`);
        fetchContacts();
      } catch (err) {
        console.error("Error deleting contact:", err);
      }
    }
  };

  return (
    <div className="contact-list">
      {contacts.map((c) => (
        <div key={c._id} className="contact-card">
          <h3>{c.name}</h3>
          <p>{c.email}</p>
          <p>{c.phone}</p>
          <p>{c.category}</p>
          <button onClick={() => setEditingContact(c)}>Edit</button>
          <button onClick={() => handleDelete(c._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
