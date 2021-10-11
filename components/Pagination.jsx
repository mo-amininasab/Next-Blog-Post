import React, { Fragment } from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, numOfPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numOfPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numOfPages === 1) return <Fragment></Fragment>;

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirst && (
          <Link href={prevPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Previous
            </li>
          </Link>
        )}
        {/* //! not showing */}
        {Array.from({ length: numOfPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              {i + 1}
            </li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage}>
            <li className="relative block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer">
              Next
            </li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
