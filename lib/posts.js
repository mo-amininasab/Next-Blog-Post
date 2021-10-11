import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { sortByData } from '@/utils/index';

const files = fs.readdirSync(path.join('posts'));

export const getPosts = () => {
  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return {
      slug,
      frontMatter,
    };
  });

  return posts.sort(sortByData);
};
