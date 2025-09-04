import { Response } from "express";
import Contact from "../models/Contact";
import { AuthRequest } from "../middleware/auth";

export const getContacts = async (req: AuthRequest, res: Response) => {
  try {
    const contacts = await Contact.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const createContact = async (req: AuthRequest, res: Response) => {
  try {
    const { name, email, phone, category } = req.body;

    if (!name || !email || !phone || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newContact = await Contact.create({
      name,
      email,
      phone,
      category,
      user: req.user.id,
    });

    res.status(201).json(newContact);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const updateContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "Contact not found" });
    if (!contact.user || contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) return res.status(404).json({ message: "Contact not found" });
    if (!contact.user || contact.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err: any) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
