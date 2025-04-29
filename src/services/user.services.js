const supabase = require('../config/db');

class UserService {
    async getAllUsers() {
      return await supabase.from('users').select('*');
    }
  
    async getUserById(id) {
      return await supabase.from('users').select('*').eq('id', id).single();
    }
  
    async createUser(userData) {
      return await supabase.from('users').insert([userData]);
    }
  
    async updateUser(id, userData) {
      return await supabase
        .from('users')
        .update({ ...userData, updated_at: new Date().toISOString() })
        .eq('id', id);
    }
  
    async deleteUser(id) {
      return await supabase.from('users').delete().eq('id', id);
    }
  }
  
  module.exports = new UserService();