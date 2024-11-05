import express from 'express';
import { authenticate } from '../middleware/auth';
import { searchQueryController } from '../controllers/searchController';

const router = express.Router();

router.use(authenticate);

router.get('/q=:query', searchQueryController);

export default router;