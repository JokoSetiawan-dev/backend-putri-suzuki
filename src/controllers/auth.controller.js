// src/controllers/auth.controller.js
const supabase = require('../config/db');
const userService = require('../services/user.services');

class AuthController {
  async register(req, res, next) {
    try {
      const { email, password, first_name, last_name, phone_number } = req.body;
      
      // Register user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw new Error(authError.message);
      
      // If registration successful, create user profile
      if (authData.user) {
        const userData = {
          id: authData.user.id,
          email,
          first_name,
          last_name,
          phone_number
        };
        
        // Create user profile in your custom users table
        await userService.createUser(userData);
        
        res.status(201).json({
          status: 'success',
          message: 'Registration successful',
          data: { user: userData }
        });
      }
    } catch (error) {
      next(error);
    }
  }
  
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Login with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw new Error(error.message);
      
      res.status(200).json({
        status: 'success',
        data: {
          user: data.user,
          session: data.session
        }
      });
    } catch (error) {
      next(error);
    }
  }
  
  async logout(req, res, next) {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) throw new Error(error.message);
      
      res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
      });
    } catch (error) {
      next(error);
    }
  }
  
  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      
      if (error) throw new Error(error.message);
      
      res.status(200).json({
        status: 'success',
        message: 'Password reset email sent'
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();