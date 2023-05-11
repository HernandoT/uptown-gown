import "./PaginatedItems.css";
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import PaginationItems from "./PaginationItems";

const PaginatedItems = ({ itemsPerPage }) => {
  const items = [...Array(100).keys()];

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
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
