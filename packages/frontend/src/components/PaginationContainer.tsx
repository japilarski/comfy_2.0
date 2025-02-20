import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { loaderResponse } from '../types';

export const PaginationContainer = () => {
  const { metadata } = useLoaderData() as loaderResponse;
  const { pageCount, page } = metadata.pagination;
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);

  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const handlePageChange = (pageNumber: number) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set('page', pageNumber.toString());

    navigate(`${pathname}?${searchParams.toString()}`, {
      state: { from: 'navbar' },
    });
  };

  const handlePrevPage = () => {
    let prevPage = page - 1;
    if (prevPage < 1) prevPage = pageCount;
    handlePageChange(prevPage);
  };
  const handleNextPage = () => {
    let nextPage = page + 1;
    if (nextPage > pageCount) nextPage = 1;
    handlePageChange(nextPage);
  };

  if (pageCount <= 1) return null;

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={handlePrevPage}
        >
          &larr;
        </button>
        {pages.map((pageNumber) => {
          return (
            <button
              className={`btn btn-xs sm:btn-md border-none join-item ${
                pageNumber === page ? 'bg-base-300 border-base-300' : ''
              }`}
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          className="btn btn-xs sm:btn-md join-item"
          onClick={handleNextPage}
        >
          &rarr;
        </button>
      </div>
    </div>
  );
};
