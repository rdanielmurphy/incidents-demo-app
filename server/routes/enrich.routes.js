import { Router } from 'express';
import * as EnrichController from '../controllers/enrich.controller';

const router = new Router();

// Get weather
router.route('/weather/:param').get(EnrichController.getWeather);

export default router;
