import axios from 'axios';
import { baseGet } from '../utils/baseRequest';

const url = 'http://172.28.0.1:5003/pax';

export async function getPaxExistance(req, res) {
  const { chat_id } = req.params;
  res.json(await baseGet(`${url}/consult_pax/${chat_id}`));
}

export async function getFinalizedPax(req, res) {
  const { id } = req.params;
  const { user_kind } = req.params;
  res.json(await baseGet(`${url}/finalized_pax/${user_kind}/${id}`));
}

export async function getInitiatedPax(req, res) {
  const { id } = req.params;
  const { user_kind } = req.params;
  res.json(await baseGet(`${url}/pax/initiated_pax/${user_kind}/${id}`));
}

export async function getCanceledPax(req, res) {
  const { id } = req.params;
  const { user_kind } = req.params;
  res.json(await baseGet(`${url}/canceled_pax/${user_kind}/${id}`));
}

export async function getPendentPax(req, res) {
  const { id } = req.params;
  const { user_kind } = req.params;
  res.json(await baseGet(`${url}/pendent_pax/${user_kind}/${id}`));
}
