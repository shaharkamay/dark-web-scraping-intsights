import axios from 'axios';
import { JSDOM } from 'jsdom';
import { PrismaClient } from '@prisma/client';
import { DefaultAuthor } from './@types';

const prisma = new PrismaClient();

const start = async () => {
  const res = await axios.get(
    'http://strongerw2ise74v3duebgsvug4mehyhlpa7f6kfwnas7zofs3kov7yd.onion/all',
    {
      proxy: {
        host: 'localhost',
        port: 8118,
      },
    }
  );
  const dom = new JSDOM(res.data);
  const document = dom.window.document as Document;
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

    console.log(content);
    const url = (
      container.querySelectorAll(
        '.col-sm-7.text-right a'
      )[0] as HTMLAnchorElement
    ).href;

    const id = url.substring(url.lastIndexOf('/') + 1);
    await prisma.pastes.upsert({
      where: {
        id,
      },
      update: {
        author: isDefaultAuthor(author) ? DefaultAuthor.Anonymous : author,
        title,
        content,
        date,
      },
      create: {
        id,
        author,
        title,
        content,
        date,
      },
    });
  }
};

const cropAuthorAndDate = (
  str: string | null | undefined
): { author: string; date: Date } => {
  if (str == null) return { author: '', date: new Date('Jan 01 1999') };
  const startAuthor = str.trim().replace('Posted by ', '');
  return {
    author: startAuthor.split(' at ')[0],
    date: new Date(startAuthor.split(' at ')[1]),
  };
};

const isDefaultAuthor = (author: string): boolean => {
  if (
    author === DefaultAuthor.Anonymous ||
    author === DefaultAuthor.Guest ||
    author === DefaultAuthor.Unknown
  )
    return true;

  return false;
};

setInterval(() => {
  start();
  console.log(`scraped at: ${new Date()}`);
}, 5000);
