import staffService from "../services/staff.service.js";

export const register = async (req, res) => {
  try {
    // Extract staff details from the request body
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
    res.status(401).json({ message: error.message });
    console.error(`Register Controller Error: ${error.message}`);
  }
};

export const login = async (req, res) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Login the staff member
    const staff = await staffService.loginStaff(email, password);

    // Return the logged-in staff member's details (excluding password)
    res.status(200).json({
      message: "Login successful",
      staff: {
        id: staff.id,
        name: staff.name,
        email: staff.email,
        role: staff.role,
        status: staff.status,
      },
    });
  } catch (error) {
    res.status(401).json({ message: error.message });
    console.error(`Login Controller Error: ${error.message}`);
  }
};
