import express from 'express';
import { getPastes } from './controller';

const router = express.Router();

router.get('/', getPastes);

export default router;
