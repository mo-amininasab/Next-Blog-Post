import fs from 'fs';
import path from 'path';

import { POSTS_PER_PAGE } from '@/config/index';
import { getPosts } from '@/lib/posts';

import React from 'react';
import Layout from '@/components/Layout';
import Post from '@/components/Post';
import Pagination from '@/components/Pagination';
import CategoryList from '@/components/CategoryList'

const BlogPage = ({ posts, numOfPages, currentPage, setOfCategories }) => {
  return (
    <Layout>
      <div className='flex justify-between flex-col md:flex-row'>
        <div className='w-3/4 mr-10'>
          <h1 className='text-5xl border-b-4 p-5 font-bold'>Blog</h1>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>

          <Pagination currentPage={currentPage} numPages={numOfPages} />
        </div>

        <div className='w-1/4'>
          <CategoryList categories={setOfCategories} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const numOfPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numOfPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const page = +((params && params.page_index) || 1);

  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  // Get categories for sidebar
  const categories = posts.map((post) => post.frontMatter.category);
  const setOfCategories = [...new Set(categories)];

  const numOfPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );
  return {
    props: {
      posts: orderedPosts,
      numOnPages: numOfPages,
      currentPage: page,
      setOfCategories: setOfCategories,
    },
  };
}
