import axios from 'axios';
import { JSDOM } from 'jsdom';
import { DefaultAuthor, Paste } from '../../../@types';
import {
  cropAuthorAndDate,
  isDefaultAuthor,
} from '../../../utils/helpers/pastes';

const fetchDom = async (page = 1) => {
  const res = await axios.get(
    `http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all?page=${page}`,
    {
      proxy: {
        host: 'localhost',
        port: 8118,
      },
    }
  );
  return res.data;
};

const formatPastes = (data: string) => {
  const pastes: Paste[] = [];

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
    pastes.push({
      id,
      author: isDefaultAuthor(author) ? DefaultAuthor.Anonymous : author,
      title,
      content,
      date,
    });
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
  const pastes: Paste[] = [];

  let data = await fetchDom();
  const numberOfPages = getNumberOfPages(data);

  for (let i = 1; i <= numberOfPages; i++) {
    data = await fetchDom(i);
    pastes.push(...formatPastes(data));
  }
  return pastes;
};

export default { fetchDom, formatPastes, getAllPastes };