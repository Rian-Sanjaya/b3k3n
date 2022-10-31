import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Input, Spin } from "antd";
import { titleChanged } from "../store/header";
import { getBooks, getLoading, fetchBooks } from "../store/book";

function Category() {
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [categorySearch, setCategorySearch] = useState("");
  const [booksFiltered, setBooksFiltered] = useState(null);
  const dispatch = useDispatch();
  const books = useSelector(getBooks);
  const loading = useSelector(getLoading);
  const {state: {categooryId, name}} = useLocation();
  const { Search } = Input;
  
  useEffect(() => {
    dispatch(titleChanged(name));
  }, [dispatch, name])

  useEffect(() => {
    const filteredBooks = (res) => {
      let filtered = [];
      if (categorySearch) {
        filtered = res.filter(book => (
          book.title.trim().toLowerCase().includes(categorySearch.trim().toLowerCase()) || 
          book.authors.join(" ").trim().toLowerCase().includes(categorySearch.trim().toLowerCase())
        ));
      } else {
        filtered = res;
      }
      setBooksFiltered(filtered);
    }

    dispatch(fetchBooks(categooryId, currentPage, currentPageSize))
      .then((res) => {
        filteredBooks(res);
      })
  }, [dispatch, categooryId, currentPage, currentPageSize])

  useEffect(() => {
    const filteredBooks = () => {
      let filtered = [];
      if (categorySearch) {
        filtered = books.filter(book => (
          book.title.trim().toLowerCase().includes(categorySearch.trim().toLowerCase()) || 
          book.authors.join(" ").trim().toLowerCase().includes(categorySearch.trim().toLocaleLowerCase())
        ));
      } else {
        filtered = books;
      }
      setBooksFiltered(filtered);
    }

    filteredBooks();
  }, [categorySearch])

  const onSearchCategory = (value) => {
    setCategorySearch(value);
  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page - 1);
    setCurrentPageSize(pageSize);
  };

  return (
    <div className={`main-content ${loading ? 'loading' : ''}`}>
      {loading && 
        <Spin style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50% -50%)" }} />
      }
      {!loading && 
        <>
          <div className="search-box">
            <Search placeholder="Search by title or author" onSearch={onSearchCategory} allowClear style={{ width: 230 }} />
          </div>
          <ul className="card-container">
            {booksFiltered && booksFiltered.length > 0 &&
              booksFiltered.map(book => (
                <li key={book.id} className="card">
                  <div className="card-content">
                    <div className="image-box">
                      <img src={book.cover_url} alt="cover img" />
                    </div>
                    <div className="book-title">{ book.title }</div>
                    <div className="book-author">{ book.authors.join(" & ") }</div>
                    <div className="book-category">{ name }</div>
                </div>
                </li>
              ))
            }
          </ul>
          <Pagination
            showSizeChanger
            pageSizeOptions={[10, 20, 30]}
            current={currentPage + 1}
            pageSize={currentPageSize}
            total={100}
            responsive
            onChange={onPageChange}
          />
        </>
      }
    </div>
  );
}

export default Category;