import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import { getPosts } from '@/lib/posts';

import React from 'react';
import Layout from '@/components/Layout';
import Post from '@/components/Post';

const HomePage = ({ posts, categoryName }) => {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">
        Posts in {categoryName}
      </h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default HomePage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));
  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontMatter } = matter(markdownWithMeta);

    return frontMatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  const files = fs.readdirSync(path.join('posts'));

  const posts = getPosts();

  // Filter Posts by category
  const categoryPosts = posts.filter(
    (post) => post.frontMatter.category.toLowerCase() === category_name
  );

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
    },
  };
}
