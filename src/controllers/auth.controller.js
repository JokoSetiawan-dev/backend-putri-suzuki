// src/controllers/auth.controller.js
const supabase = require("../config/db");
const userService = require("../services/user.services");

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
          phone_number,
        };

        // Create user profile in your custom users table
        await userService.createUser(userData);

        res.status(201).json({
          status: "success",
          message: "Registration successful",
          data: { user: userData },
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
        password,
      });

      if (error) throw new Error(error.message);

      res.status(200).json({
        status: "success",
        data: {
          user: data.user,
          session: data.session,
        },
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
        status: "success",
        message: "Logged out successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { email } = req.body;

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          "http://localhost:3001/admin/auth/reset-password/update?flow_type=recovery",
      });

      if (error) throw new Error(error.message);

      res.status(200).json({
        status: "success",
        message: "Password reset email sent",
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req, res) {
    try {
      const { access_token, new_password } = req.body;

      if (!access_token || !new_password) {
        return res
          .status(400)
          .json({
            error: "Missing access_token, refresh_token, or new_password",
          });
      }

      // Set session dulu di supabase
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
      });

      if (sessionError) {
        return res.status(400).json({ error: sessionError.message });
      }

      // Sekarang user sudah authenticated, kita update password-nya
      const { error: updateError } = await supabase.auth.updateUser({
        password: new_password,
      });

      if (updateError) {
        return res.status(400).json({ error: updateError.message });
      }

      return res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
module.exports = new AuthController();
