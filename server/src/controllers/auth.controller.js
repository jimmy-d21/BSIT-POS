import staffService from "../services/staff.service.js";

export const register = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // Validate input
    if (!name || !email || !role || !status) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Register the staff member
    const newStaff = await staffService.registerStaff({
      name,
      email,
      role,
      status,
    });

    // Return the registered staff member's details (excluding password)
    res.status(201).json({
      message: "Staff member registered successfully",
      staff: {
        id: newStaff.id,
        name: newStaff.name,
        email: newStaff.email,
        role: newStaff.role,
        status: newStaff.status,
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Register Error: " + error.message });
    console.error(`Register Controller Error: ${error.message}`);
  }
};
