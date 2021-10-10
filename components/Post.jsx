import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Post = ({ post }) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
      <Image
        src={post.frontMatter.cover_image}
        alt=""
        width={600}
        height={420}
        className="mb-4 rounded"
      />

      <div className="flex justify-between items-center">
        <span className="font-light text-gray-600">
          {post.frontMatter.date}
        </span>
        <div>{post.frontMatter.category}</div>
      </div>

      <div className="mt-2">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-2xl text-gray-700 font-bold hover:underline">
            {post.frontMatter.title}
          </a>
        </Link>

        <p className="mt-2 text-gray-600">{post.frontMatter.excerpt}</p>
      </div>

      <div className="flex justify-between items-center mt-6">
        <Link href={`/blog/${post.slug}`}>
          <a className="text-gray-900 hover:text-blue-600">Read More</a>
        </Link>

        <div className="flex items-center space-x-4 justify-center">
          <span className="h-10 hidden sm:block my-auto">
            <Image
              src={post.frontMatter.author_image}
              alt=""
              width={40}
              height={40}
              className="mx-4 object-cover rounded-full "
            />
          </span>
          <h3 className="text-gray-700 font-bold">{post.frontMatter.author}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
