import { baseGet } from '../utils/baseRequest';

const url = 'https://pax-category.herokuapp.com/category';

export async function getGeneralCategories(req, res) {
  res.json(await baseGet(`${url}/general`));
}

export async function getProviderCategories(req, res) {
  res.json(await baseGet(`${url}/provider`));
}

export async function getProviderCategoriesFromGeneral(req, res) {
  const { general_category_id } = req.params;
  res.json(await baseGet(`${url}/provider/${general_category_id}`));
}
