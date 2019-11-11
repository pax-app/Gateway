import axios from 'axios';
import { baseGet, basePost, baseDelete } from '../utils/baseRequest';

const url = 'https://pax-user.herokuapp.com/';

export async function getUsersByReview(req, res) {
  const { provider_category_id } = req.params;
  res.json(
    await baseGet(`${url}provider_by_category/review/${provider_category_id}`)
  );
}

export async function getUsersByMinimumPrice(req, res) {
  const { provider_category_id } = req.params;
  res.json(
    await baseGet(
      `${url}provider_by_category/min_price/${provider_category_id}`
    )
  );
}

export async function getSingleAddress(req, res) {
  const { address_id } = req.params;
  res.json(await baseGet(`${url}get_address/${address_id}`));
}

export async function getAllUserAddresses(req, res) {
  const { user_id } = req.params;
  res.json(await baseGet(`${url}get_addresses/${user_id}`));
}

export async function deleteProviderCategoryRelationship(req, res) {
  const { provider_id } = req.params;
  const { provider_category_id } = req.params;
  res.json(
    await baseDelete(
      `${url}${provider_id}/category_provider/${provider_category_id}`
    )
  );
}

export async function createAddress(req, res) {
  const postData = req.body;
  res.json(await basePost(`${url}add_address`, postData));
}

export async function loginUser(req, res) {
  const postData = req.body;
  res.json(await basePost(`${url}auth/login`, postData));
}

export async function createUser(req, res) {
  const postData = req.body;
  res.json(await basePost(`${url}auth/registration`, postData));
}

export async function logoutUser(req, res) {
  const { authorization } = req.headers;
  try {
    const response = await axios.get(`${url}auth/logout`, {
      headers: { Authorization: authorization },
    });
    return response.data;
  } catch (error) {
    return {
      status: 'error',
    };
  }
}
