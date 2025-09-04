import { useEffect, useState } from "react";
import api from "../api/api";
import { IContact } from "../types";
import ContactForm from "../components/ContactForm";
import ContactList from "../components/ContactList";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";

const Dashboard = () => {
  const [contacts, setContacts] = useState<IContact[]>([]);
  const [editingContact, setEditingContact] = useState<IContact | null>(null);
  const [search, setSearch] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchContacts = async () => {
    try {
      const { data } = await api.get("/contacts");
      setContacts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleLogout = () => {
    logout();            
    navigate("/login");   
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>My Contacts</h2>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name or category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <ContactForm
        fetchContacts={fetchContacts}
        editingContact={editingContact}
        setEditingContact={setEditingContact}
      />

      <ContactList
        contacts={filteredContacts}
        setEditingContact={setEditingContact}
        fetchContacts={fetchContacts}
      />
    </div>
  );
};

export default Dashboard;
