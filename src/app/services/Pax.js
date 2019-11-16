import { baseGet, basePost, basePatch } from '../utils/baseRequest';

const url = 'http://localhost:5003/pax';

export async function getPaxExistence(req, res) {
  const { chat_id } = req.params;
  res.json(await baseGet(`${url}/consult_pax/${chat_id}`));
}

export async function getFinalizedPax(req, res) {
  const { id, user_kind } = req.params;
  res.json(await baseGet(`${url}/finalized_pax/${user_kind}/${id}`));
}

export async function getInitiatedPax(req, res) {
  const { id, user_kind } = req.params;
  res.json(await baseGet(`${url}/initiated_pax/${user_kind}/${id}`));
}

export async function getCanceledPax(req, res) {
  const { id, user_kind } = req.params;
  res.json(await baseGet(`${url}/canceled_pax/${user_kind}/${id}`));
}

export async function getPendentPax(req, res) {
  const { id, user_kind } = req.params;
  res.json(await baseGet(`${url}/pendent_pax/${user_kind}/${id}`));
}

export async function createPax(req, res) {
  const postData = req.body;
  res.json(await basePost(`${url}/upCreate`, postData));
}

export async function updatePaxStatus(req, res) {
  const postData = req.body;
  res.json(await basePatch(`${url}/update_status`, postData));
}

<<<<<<< HEAD
export async function updatePaxMotive(req, res) {
  const postData = req.body;
  res.json(await basePatch(`${url}/update_motive`, postData));
=======
export async function updateMotive(req, res) {
  const { id } = req.params;
  const postData = req.body;
  res.json(await basePatch(`${url}/update_motive/${id}`, postData));
>>>>>>> d19f41ff0a7289e181d8a35bc418a7565ca2556c
}
