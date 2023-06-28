import "./PaginatedItems.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PaginationItems from "./PaginationItems";

const PaginatedItems = ({ itemsPerPage, data, isFilter, setIsFilter }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (isFilter) {
      setItemOffset(0);
      setPage(0);
      setIsFilter(false);
    }
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data, page]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setPage(event.selected);
  };

  return (
    <div>
      <PaginationItems currentItems={currentItems} />
      <ReactPaginate
        forcePage={page}
        nextLabel=">"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        previousLabel="<"
        pageClassName="pageItem"
        pageLinkClassName="pageLink"
        previousClassName="pageItem"
        previousLinkClassName="pageLink"
        nextClassName="pageItem"
        nextLinkClassName="pageLink"
        breakLabel="..."
        breakClassName="pageItemBreak"
        breakLinkClassName="pageLinkBreak"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default PaginatedItems;
