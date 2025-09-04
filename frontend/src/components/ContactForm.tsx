import { useEffect, useState, useCallback } from "react";
import api from "../api/api";
import { IContact } from "../types";
import "./ContactForm.css";

interface ContactFormProps {
  fetchContacts: () => Promise<void>;
  editingContact: IContact | null;
  setEditingContact: (contact: IContact | null) => void;
}

const defaultCategories = ["Family", "Friends", "Work", "Other"];

const ContactForm: React.FC<ContactFormProps> = ({
  fetchContacts,
  editingContact,
  setEditingContact,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [category, setCategory] = useState("Other");
  const [customCategory, setCustomCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = useCallback(() => {
    setName("");
    setEmail("");
    setPhone("");
    setCategory("Other");
    setCustomCategory("");
    setEditingContact(null);
    setError(null);
  }, [setEditingContact]);

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name);
      setEmail(editingContact.email);
      setPhone(editingContact.phone);

      if (defaultCategories.includes(editingContact.category)) {
        setCategory(editingContact.category);
        setCustomCategory("");
      } else {
        setCategory("Other");
        setCustomCategory(editingContact.category);
      }
    } else {
      resetForm();
    }
  }, [editingContact, resetForm]);

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits";
    if (category === "Other" && !customCategory.trim())
      return "Custom category is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      const finalCategory = category === "Other" ? customCategory : category;

      if (editingContact) {
        await api.put(`/contacts/${editingContact._id}`, {
          name,
          email,
          phone,
          category: finalCategory,
        });
      } else {
        await api.post("/contacts", {
          name,
          email,
          phone,
          category: finalCategory,
        });
      }

      await fetchContacts();
      resetForm();
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3>{editingContact ? "Edit Contact" : "Add Contact"}</h3>

      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder="Phone (10 digits)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {defaultCategories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {category === "Other" && (
        <input
          type="text"
          placeholder="Enter custom category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
        />
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : editingContact ? "Update" : "Add"}
      </button>

      {editingContact && (
        <button type="button" onClick={resetForm} className="cancel-btn">
          Cancel
        </button>
      )}
    </form>
  );
};

export default ContactForm;
