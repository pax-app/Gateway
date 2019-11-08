import axios from 'axios';

class Category {
  async getGeneralCategories(req, res) {
    const url = 'http://172.25.0.1:5002/category';
    try {
      const response = await axios.get(`${url}/general`);
      return res.json(response.data);
    } catch (error) {
      return res.json({
        status: 'error',
      });
    }
  }
}
export default new Category();
