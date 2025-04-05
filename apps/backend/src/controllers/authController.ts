// Controller for handling user authentication (signup, login, logout)

import { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {prisma} from '@ai-job-tracker/db'; // Import Prisma client for database operations

// Define the secret key for JWT, using an environment variable or a default value
const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_key';
const isProd = process.env.NODE_ENV === 'production';

// Signup handler: Registers a new user
export const signup: RequestHandler = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  try {
    // Check if a user with the given email already exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      res.status(400).json({ error: 'Email already in use' }); // Return error if email is taken
      return;
    }

    // Hash the password and create a new user in the database
    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: { email, password: hashed } });

    // Generate a JWT token for the new user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    // Set the token as an HTTP-only cookie and respond with success
    res.status(201)
      .cookie('token', token, {
        httpOnly: true,
        secure: isProd, // Use secure cookies in production
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(res.statusCode || 200)
      res.json({ id: user.id, email: user.email });
  } catch (err) {
    // Handle errors during signup
    res.status(500).json({ error: 'Signup failed' });
  }
};

// Login handler: Authenticates an existing user
export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  try {
    // Find the user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      res.status(401).json({ error: 'Invalid email or password' }); // Return error if user not found
      return;
    }

    // Compare the provided password with the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(401).json({ error: 'Invalid email or password' }); // Return error if passwords don't match
      return;
    }

    // Generate a JWT token for the authenticated user
    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

    // Set the token as an HTTP-only cookie and respond with success
    res
      .cookie('token', token, {
        httpOnly: true,
        secure: isProd, // Use secure cookies in production
        sameSite: isProd ? 'none' : 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(res.statusCode || 200)
      .json({ id: user.id, email: user.email });
  } catch (err) {
    // Handle errors during login
    res.status(500).json({ error: 'Login failed' });
  }
};

// Logout handler: Clears the authentication token
export const logout: RequestHandler = (req, res) => {
  // Clear the token cookie and respond with success
  res.clearCookie('token').json({ message: 'Logged out' });
};
