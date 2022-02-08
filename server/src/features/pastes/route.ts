import express from 'express';
import { getPastes, getPastesSse } from './controller';

const router = express.Router();

router.get('/', getPastes);
router.get('/sse', getPastesSse);

export default router;
