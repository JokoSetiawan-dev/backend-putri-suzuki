const productService = require('../services/product.services');

class ProductController {
  getAllProducts = async (req, res) => {
    try {
      const { data, error } = await productService.getAllProducts();
      if (error) return res.status(400).json({ error: error.message });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await productService.getProductById(id);
      if (error) return res.status(404).json({ error: error.message });
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  createProduct = async (req, res) => {
    try {
      const { name, description, price, dp, image_url } = req.body;
      const { data, error } = await productService.createProduct({
        name,
        description,
        price,
        dp,
        image_url
      });
      if (error) return res.status(400).json({ error: error.message });
      res.status(201).json({message: "Succesfully add new product",data});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, price, dp, image_url } = req.body;
      const { data, error } = await productService.updateProduct(id, {
        name,
        description,
        price,
        dp,
        image_url,
      });
      if (error) return res.status(400).json({ error: error.message });
      res.status(200).json({message:"Data succesfully updated",data});
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const { data, error } = await productService.deleteProduct(id);
      if (error) return res.status(400).json({ error: error.message });
      res.status(200).json({ message: 'Product deleted successfully', data });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

module.exports = new ProductController();
