const userService = require('../services/user.services');

class UserController {
  async getAllUsers(req, res) {
    try {
      const { data, error } = await userService.getAllUsers();
      if (error) return res.status(400).json({ error: error.message });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await userService.getUserById(id);
      if (error) return res.status(404).json({ error: error.message });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async createUser(req, res) {
    try {
      const { id, email, first_name, last_name, phone_number } = req.body;
      const { data, error } = await userService.createUser({
        id,
        email,
        first_name,
        last_name,
        phone_number,
      });
      if (error) return res.status(400).json({ error: error.message });
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { email, first_name, last_name, phone_number } = req.body;
      const { data, error } = await userService.updateUser(id, {
        email,
        first_name,
        last_name,
        phone_number,
      });
      if (error) return res.status(400).json({ error: error.message });
      res.status(200).json({
        status: 'success',
        data: {
          email,
          first_name,
          last_name,
          phone_number,
        }
      });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const { data, error } = await userService.deleteUser(id);
      if (error) return res.status(400).json({ error: error.message });
      res.json({ message: 'User deleted successfully', data });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = new UserController();
