import React, { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux'
import { PageItemAction} from 'store/actions/index'
import { useDispatch } from 'react-redux';


function Pagination() {
  let items = useSelector((state) => state?.rootReducer?.itemArray);
  let itemsPerPage = useSelector((state) => state?.rootReducer?.perpage);
  const dispatch = useDispatch()
  // We start with an empty list of items.
  // const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    // setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage,items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    console.log(
      `handlePageClick page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
    dispatch(PageItemAction(newOffset))
  };

  return (
    <>
    {console.log("items.length", items, "itemsPerPage", itemsPerPage)}
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={8}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Pagination