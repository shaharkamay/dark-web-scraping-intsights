import db from './db';
import fetch from './fetch';

const insertPastes = async () => {
  try {
    const pastes = await fetch.getAllPastes();
    const newPastesCount = (await db.upsertManyPastes(pastes)) ? 1 : 0;
    return newPastesCount;
  } catch (error) {
    console.log(error);
  }
};

export default { db, fetch, insertPastes };
