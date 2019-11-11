import axios from 'axios';
import { baseGet, basePost, basePatch } from '../utils/baseRequest';

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
