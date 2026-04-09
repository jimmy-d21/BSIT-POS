import staffService from "../services/staff.service.js";
import generateTokenAndSetCookie from "../utils/generateTokenAndSetCookie.js";

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

    // Generate JWT token and set it in the cookie
    generateTokenAndSetCookie(res, newStaff.id);

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

    // Generate JWT token and set it in the cookie
    generateTokenAndSetCookie(res, staff.id);

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

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    res.status(500).json({ message: "Logout failed" });
    console.error(`Logout Controller Error: ${error.message}`);
  }
};

export const getCurrentUser = (req, res) => {
  try {
    // The authentication middleware has already verified the token and attached the user to the request object
    const user = req.user;

    // Exclude the password from the user details before sending the response
    const { password, ...safeUser } = user;

    // Return the current user's details
    res.status(200).json({
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(`Get Current User Controller Error: ${error.message}`);
  }
};
