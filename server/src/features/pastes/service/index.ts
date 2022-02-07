import db from './db';
import fetch from './fetch';

const insertPastes = async () => {
  const pastes = await fetch.getAllPastes();
  const newPastesCount = (await db.upsertManyPastes(pastes)).count;
  return newPastesCount;
};

export default { db, fetch, insertPastes };
