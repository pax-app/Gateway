import axios from 'axios';
import { baseGet, basePost } from '../utils/baseRequest';

const url = 'http://172.22.0.1:5004/';

export async function getServiceReviewAverage(req, res) {
  const { evaluated_id } = req.params;
  res.json(await baseGet(`${url}service_reviews/average/${evaluated_id}`));
}

export async function getCharismaReviewAverage(req, res) {
  const { evaluated_id } = req.params;
  res.json(await baseGet(`${url}reviews/average/${evaluated_id}`));
}

export async function createReview(req, res) {
  const postData = req.body;
  res.json(await basePost(`${url}reviews/create_review`, postData));
}
