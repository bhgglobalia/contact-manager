import { useEffect, useState } from "react";
import api from "../api/api";
import { IContact } from "../types";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import Navbar from "../components/Navbar";
import "../components/Dashboard.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [editingContact, setEditingContact] = useState<IContact | null>(null);
  const [search, setSearch] = useState("");

  const fetchContacts = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await api.get("/contacts", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h2>My Contacts</h2>
        <input
          type="text"
          placeholder="Search by name or category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <ContactForm fetchContacts={fetchContacts} editingContact={editingContact} setEditingContact={setEditingContact} />
        <ContactList contacts={filteredContacts} setEditingContact={setEditingContact} fetchContacts={fetchContacts} />
      </div>
    </>
  );
};

export default Dashboard;

