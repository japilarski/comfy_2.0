import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { loaderResponse } from '../types';

export type addPageButton = { pageNumber: number; activeClass: boolean };

export const ComplexPaginationContainer = () => {
  const { metadata } = useLoaderData() as loaderResponse;
  const { pageCount, page } = metadata.pagination;
  const { search, pathname } = useLocation();
  const navigate = useNavigate();

  const addPageButton = (props: addPageButton) => {
    return (
      <button
        className={`btn btn-xs sm:btn-md border-none join-item ${
          props.activeClass ? 'bg-base-300 border-base-300' : ''
        }`}
        key={props.pageNumber}
        onClick={() => handlePageChange(props.pageNumber)}
      >
        {props.pageNumber}
      </button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];
    // firs button
    pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

    // start dots
    if (page > 2)
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-1"
        >
          ...
        </button>
      );

    // active page
    if (page !== 1 && page !== pageCount)
      pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));

    // end dots
    if (page < pageCount - 1)
      pageButtons.push(
        <button
          className="btn btn-xs sm:btn-md border-none join-item"
          key="dots-2"
        >
          ...
        </button>
      );

    // last button
    pageButtons.push(
      addPageButton({ pageNumber: pageCount, activeClass: page === pageCount })
    );
    return pageButtons;
  };

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
        {renderPageButtons()}
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
