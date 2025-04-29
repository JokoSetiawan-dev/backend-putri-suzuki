const supabase = require('../config/db');

class ProductService {
    async getAllProducts() {
      return await supabase.from('products').select('*');
    }
  
    async getProductById(id) {
      return await supabase.from('products').select('*').eq('id', id).single();
    }
  
    async createProduct(productData) {
      return await supabase.from('products').insert([productData]);
    }
  
    async updateProduct(id, productData) {
      return await supabase
        .from('products')
        .update({ ...productData, updated_at: new Date().toISOString() })
        .eq('id', id);
    }
  
    async deleteProduct(id) {
      return await supabase.from('products').delete().eq('id', id);
    }
  }
  
  module.exports = new ProductService();