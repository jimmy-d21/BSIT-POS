import db from "../config/db.js";

class staffModel {
  // Find a staff member by email
  static async findByEmail(email) {
    const query = "SELECT * FROM staff WHERE email = $1";
    const { rows } = await db.query(query, [email]);
    return rows[0];
  }

  // Find a staff member by staff USN
  static async findByStaffUsn(staffUsn) {
    // FIXED: Changed "WHER" to "WHERE"
    const query = "SELECT * FROM staff WHERE usn = $1";
    const { rows } = await db.query(query, [staffUsn]);
    return rows[0];
  }

  // Create a new staff member
  static async createStaff(staffData) {
    const { name, usn, email, role, status, password } = staffData;
    const query = `
      INSERT INTO staff (name, usn, email, role, status, password) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING *
    `;
    const { rows } = await db.query(query, [
      name,
      usn,
      email,
      role,
      status,
      password,
    ]);
    return rows[0];
  }
}

export default staffModel;
