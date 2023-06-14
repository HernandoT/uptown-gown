import "./PaginatedItems.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PaginationItems from "./PaginationItems";

const PaginatedItems = ({ itemsPerPage, data }) => {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, data]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      <PaginationItems currentItems={currentItems} />
      <ReactPaginate
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
