import express from 'express';
import { addKeyword } from './controller';

const router = express.Router();

router.post('/', addKeyword);

export default router;
