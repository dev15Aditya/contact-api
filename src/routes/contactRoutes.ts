import express from 'express';
import { authenticate } from '../middleware/auth';
import { validateContact } from '../middleware/validate';
import { createContactController, getContactByIdController, getContactsController } from '../controllers/contactController';

const router = express.Router();

router.use(authenticate);

router.post('/', validateContact, createContactController);
router.get('/', getContactsController);
router.get('/:id', getContactByIdController);

export default router;