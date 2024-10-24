const express = require('express');
const router = express.Router();
const maintenanceController = require('../controllers/maintenanceController');

/**
 * GET route to show maintenance records for a specific vehicle.
 * @route GET /maintenance/:vehicleId
 */
router.get('/:vehicleId', maintenanceController.showMaintenanceRecords);

/**
 * POST route to add a new maintenance record.
 * @route POST /maintenance/add
 */
router.post('/add', maintenanceController.addMaintenanceRecord);

module.exports = router;
