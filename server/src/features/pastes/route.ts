import express from 'express';
import { getPastes, countPages } from './controller';

const router = express.Router();

router.get('/', getPastes);
router.get('/count-pages', countPages);

export default router;
