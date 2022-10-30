import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Input } from "antd";
import { titleChanged } from "../store/header";
import { getBooks, fetchBooks } from "../store/book";

function Category() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [categorySearch, setCategorySearch] = useState("");
  const dispatch = useDispatch();
  const books = useSelector(getBooks);
  const {state: {categooryId, name}} = useLocation();
  const { Search } = Input;
  
  useEffect(() => {
    dispatch(titleChanged(name));
  }, [dispatch, name])

  useEffect(() => {
    dispatch(fetchBooks(categooryId, currentPage, currentPageSize))
      .then((res) => {
        console.log(res)
      })
  }, [dispatch, categooryId, currentPage, currentPageSize])

  const onSearchCategory = (value) => {
    console.log(value)
    setCategorySearch(value);
  }

  const onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    setCurrentPage(page - 1);
    setCurrentPageSize(pageSize);
  };

  return (
    <div>
      <div>
        <Search placeholder="Search this category" onSearch={onSearchCategory} allowClear style={{ width: 200 }} />
      </div>
      <ul>
        {books && books.length > 0 &&
          books.map(book => (
            <li key={book.id}>
              { book.title }
            </li>
          ))
        }
      </ul>
      <Pagination
        showSizeChanger
        pageSizeOptions={[10, 20, 30]}
        total={100}
        responsive
        onChange={onPageChange}
      />
    </div>
  );
}

export default Category;