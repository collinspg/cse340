const maintenanceModel = require('../models/maintenance_records');
const { body, validationResult } = require('express-validator');

/**
 * Display maintenance records for a vehicle.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
async function showMaintenanceRecords(req, res, next) {
    try {
        const { vehicleId } = req.params;
        const records = await maintenanceModel.getRecordsByVehicle(vehicleId);
        res.render('maintenance/record', { records, title: 'Maintenance Records' });
    } catch (error) {
        next(error);
    }
}

/**
 * Add a new maintenance record for a vehicle.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Express next middleware function.
 */
async function addMaintenanceRecord(req, res, next) {
    await body('service_cost').isDecimal().run(req); // Example validation

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).render('maintenance/record', { 
            title: 'Maintenance Records', 
            records: [], // You can pass back existing records here
            errors: errors.array() 
        });
    }

    try {
        const { vehicle_id, service_date, service_description, service_cost } = req.body;
        await maintenanceModel.addMaintenanceRecord(vehicle_id, service_date, service_description, service_cost);
        res.redirect(`/maintenance/${vehicle_id}`);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    showMaintenanceRecords,
    addMaintenanceRecord
};
