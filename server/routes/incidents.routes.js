import { Router } from 'express';
import * as IncidentsController from '../controllers/incidents.controller';

const router = new Router();

// Get all incidents
router.route('/incidents').get(IncidentsController.getIncidents);

export default router;
