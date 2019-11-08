import request from 'request';

class Category {
  async getGeneralCategories(req, res) {
    const url = 'http://172.25.0.1:5002/category';
    await request(
      { url: `${url}/general`, method: 'GET' },
      (error, response, body) => {
        if (error) {
          return res.send({
            error: 'cu',
          });
        }
        return res.send(body);
      }
    );
  }
}
export default new Category();
