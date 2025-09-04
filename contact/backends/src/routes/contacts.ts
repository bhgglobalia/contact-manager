import express from "express";
import {
  getContacts,
  createContact,
  updateContact,
  deleteContact } from "../controllers/contacts";
import { protect } from "../middleware/auth";

const router = express.Router();

router.get("/", protect, getContacts);
router.post("/", protect, createContact);
router.put("/:id", protect, updateContact);
router.delete("/:id", protect, deleteContact);

export default router;
