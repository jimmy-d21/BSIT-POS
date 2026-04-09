import bcrypt from "bcryptjs";
import staffModel from "../models/staffModel.js";
import generateStaffUsn from "../utils/generateStaffUsn.js";

const staffService = {
  // Register a new staff member
  registerStaff: async (staffData) => {
    const { name, email, role, status } = staffData;

    // Check if a staff member with the same email already exists
    const existingStaff = await staffModel.findByEmail(email);
    if (existingStaff) {
      throw new Error("Staff member with this email already exists");
    }

    // STF-207-021
    let staffusn = null;
    let isUnique = false;

    // Generate a unique staff USN
    while (!isUnique) {
      staffusn = generateStaffUsn();
      const existingUsn = await staffModel.findByStaffUsn(staffusn);
      if (!existingUsn) {
        isUnique = true;
      }
    }

    // Hash the staff USN to use as the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(staffusn, salt);

    // Create the new staff member in the database
    return await staffModel.createStaff({
      name,
      usn: staffusn,
      email,
      role,
      status,
      password: hashedPassword,
    });
  },

  // Login a staff member
  loginStaff: async (email, password) => {
    // Find the staff member by email
    const staff = await staffModel.findByEmail(email);
    if (!staff) {
      throw new Error("Invalid email or password");
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, staff.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }
    return staff;
  },
};

export default staffService;
