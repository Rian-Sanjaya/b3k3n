import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination, Input, Spin } from "antd";
import { titleChanged } from "../store/header";
import { getBooks, getLoading, fetchBooks, onUpdateFavourite } from "../store/book";

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
  }, [categorySearch, books])

  const onSearchCategory = (value) => {
    setCategorySearch(value);
  }

  const onPageChange = (page, pageSize) => {
    setCurrentPage(page - 1);
    setCurrentPageSize(pageSize);
  };

  const handleFavClick = (book) => {
    dispatch(onUpdateFavourite(book))
      .then((res) => {
        const myFavourites = JSON.parse(localStorage.getItem('b3k3nFav'));

        const newFavourite = {
          ...book,
          favourite: !book.favourite,
        }

        // if current favorite is true to be made not favorite
        // remove from local storage
        if (book.favourite) {
          if (myFavourites) {
            const newFavs = myFavourites.filter(fav => fav.id !== book.id);
            localStorage.setItem('b3k3nFav', JSON.stringify(newFavs))
          }
        } else {
          // if current not favorite to be made favorite
          // add to local storage
          if (myFavourites) {
            myFavourites.push(newFavourite);
            localStorage.setItem('b3k3nFav', JSON.stringify(myFavourites));
          } else {
            localStorage.setItem('b3k3nFav', JSON.stringify([newFavourite]));
          }
        }
      });
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
                  <div 
                    className="fav" 
                    style={{ position: "absolute", zIndex: 1, right: 16, bottom: 53, cursor: "pointer" }}
                    onClick={() => handleFavClick(book)}
                  >
                    <svg className={`fav-star`} viewBox="0 0 114 110" style={{ width: "1rem", fill: book.favourite ? "#ffac33" : "#dee0e0" }}>
                      <path d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                    </svg>
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