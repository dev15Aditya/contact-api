import express from 'express';
import { authenticate } from '../middleware/auth';
import { spamController } from '../controllers/spamController';

const router = express.Router();

router.use(authenticate);
router.post('/', spamController);

export default router;