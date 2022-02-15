import axios from 'axios';
import { JSDOM } from 'jsdom';
import { DefaultAuthor, Entities, PasteWithEntities } from './@types';
import config from './utils/config';
import {
  withTimeoutPromise,
  cropAuthorAndDate,
  isDefaultAuthor,
} from './utils/helpers';

const fetchDom = async (page = 1) => {
  const res = await axios.get(`${config.scrape.url}?page=${page}`, {
    proxy: config.tor.proxy,
  });
  return res.data;
};

const formatPastes = async (data: string) => {
  const pastes: PasteWithEntities[] = [];

  const document = new JSDOM(data).window.document;
  const containers = document.querySelectorAll(
    '#list .row:not(:first-child):not(:last-child) .col-sm-12'
  );
  for (const container of containers) {
    const { author, date } = cropAuthorAndDate(
      container.querySelector('.col-sm-6')?.textContent
    );
    const title =
      container.querySelector('h4')?.textContent?.replace(/\s+/g, ' ').trim() ||
      '';

    const content =
      container
        .querySelector('.text')
        ?.textContent?.replace(/[ \t\r]\s+/g, '')
        .trim() || '';

    const url = (
      container.querySelectorAll(
        '.col-sm-7.text-right a'
      )[0] as HTMLAnchorElement
    ).href;
    const id = url.substring(url.lastIndexOf('/') + 1);
    const paste: PasteWithEntities = {
      id,
      author: isDefaultAuthor(author) ? DefaultAuthor.Anonymous : author,
      title,
      content,
      date,
    };

    try {
      const entities = await withTimeoutPromise(fetchEntities(content), 3000);
      paste.entities = entities;
    } catch (error) {
      paste.entities = {};
      console.log(error);
    }
    pastes.push(paste);
  }

  return pastes;
};

const getNumberOfPages = (data: string) => {
  const document = new JSDOM(data).window.document;
  return document.querySelectorAll(
    '.pagination li:not(:first-child):not(:last-child)'
  ).length;
};

const getAllPastes = async () => {
  const pastes: PasteWithEntities[] = [];

  let data = await fetchDom();
  const numberOfPages = getNumberOfPages(data);
  const datasPromises = [];

  for (let i = 1; i <= numberOfPages; i++) {
    datasPromises.push(fetchDom(i));
  }
  const datas = await Promise.all(datasPromises);

  for (data of datas) pastes.push(...(await formatPastes(data)));

  return pastes;
};

const fetchEntities = async (content: string): Promise<Entities> => {
  const res = await axios.post<Entities>(
    `http://${config.ner.host}:${config.ner.port}/api/ner`,
    { text: content }
  );
  return res.data as Entities;
};

export default { fetchDom, formatPastes, getAllPastes };
