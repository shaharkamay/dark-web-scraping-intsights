import express from 'express';
import { sseHandler } from './controller';

const router = express.Router();

router.get('/', sseHandler);

export default router;
