const db = require('../database'); // Assuming a db connection file exists

/**
 * Add a maintenance record to the database.
 * @param {number} vehicle_id - ID of the vehicle.
 * @param {string} service_date - Date of the service.
 * @param {string} service_description - Description of the service performed.
 * @param {number} service_cost - Cost of the service.
 * @returns {Promise} - Query result.
 */
async function addMaintenanceRecord(vehicle_id, service_date, service_description, service_cost) {
    const sql = `
        INSERT INTO maintenance_records (vehicle_id, service_date, service_description, service_cost)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
    const values = [vehicle_id, service_date, service_description, service_cost];
    
    try {
        return await db.query(sql, values);
    } catch (error) {
        throw new Error('Error adding maintenance record: ' + error.message);
    }
}

/**
 * Get all maintenance records for a specific vehicle.
 * @param {number} vehicle_id - ID of the vehicle.
 * @returns {Promise} - Query result.
 */
async function getRecordsByVehicle(vehicle_id) {
    const sql = `
        SELECT * FROM maintenance_records WHERE vehicle_id = $1;
    `;
    
    try {
        return await db.query(sql, [vehicle_id]);
    } catch (error) {
        throw new Error('Error retrieving maintenance records: ' + error.message);
    }
}

module.exports = {
    addMaintenanceRecord,
    getRecordsByVehicle
};
