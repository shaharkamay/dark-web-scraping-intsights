import express from 'express';
import { getKeywords, addKeyword, deleteKeyword } from './controller';

const router = express.Router();

router.get('/', getKeywords);
router.post('/', addKeyword);
router.delete('/', deleteKeyword);

export default router;
