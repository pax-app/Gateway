import axios from 'axios';
import { baseGet } from '../utils/baseRequest';

const url = 'http://172.25.0.1:5002/category';

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
