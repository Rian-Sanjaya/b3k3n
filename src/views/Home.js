import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Spin } from "antd";
import { titleChanged } from "../store/header";
import Navigation from "../components/Navigation";
import { getCategories } from "../store/category";

function Home() {
  const [book1, setBook1] = useState(null);
  const [book2, setBook2] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  
  useEffect(() => {
    dispatch(titleChanged("Home"));
  }, [dispatch])

  useEffect(() => {
    if (categories && categories.length > 1) {
      const cors_api_url = 'https://riansjcorsproxy.herokuapp.com/';
      const BASE = process.env.REACT_APP_API_BASE_URL;
      const bookRequest1 = axios.get(`${cors_api_url}${BASE}/fee-assessment-books?categoryId=${categories[0].id}&page=${0}&size=${5}`);
      const bookRequest2 = axios.get(`${cors_api_url}${BASE}/fee-assessment-books?categoryId=${categories[1].id}&page=${0}&size=${5}`);
      setLoading(true);
      axios.all([bookRequest1, bookRequest2])
        .then(axios.spread((book1, book2) => {
          // add state books data with favorite
          const favourite = JSON.parse(localStorage.getItem("b3k3nFav"));
          let booksWithFavourite;
          let books2WithFavourite;

          if (favourite) {
            // if the book is already in favorite local storage
            // set the favorite to true else set to false
            booksWithFavourite = book1.data.map(book => {
              const found = favourite.find(fav => fav.id === book.id);
              if (found) return { ...book, favourite: true };
              else return { ...book, favourite: false };
            });

            books2WithFavourite = book2.data.map(book => {
              const found = favourite.find(fav => fav.id === book.id);
              if (found) return { ...book, favourite: true };
              else return { ...book, favourite: false };
            });
          } else {
            // if no local storage set all favorite to false
            booksWithFavourite = book1.data.map(book => (
              { ...book, favourite: false }
            ))

            books2WithFavourite = book2.data.map(book => (
              { ...book, favourite: false }
            ))
          }

          setBook1(booksWithFavourite);
          setBook2(books2WithFavourite);
          setLoading(false);
        }))
        .catch(err => {
          console.error("Error: ", err);
          setLoading(false);
        })
    }
  }, [categories])

  const handleBook1FavClick = (curBook) => {
    // update book state
    const updbooks = book1.map(book => {
      if (book.id === curBook.id) {
        return { ...book, favourite: !curBook.favourite }
      }

      return book;
    });

    setBook1(updbooks);

    // update local storage book
    const myFavourites = JSON.parse(localStorage.getItem('b3k3nFav'));

    const newFavourite = {
      ...curBook,
      favourite: !curBook.favourite,
    }

    // if current favorite is true to be made not favorite
    // remove from local storage
    if (curBook.favourite) {
      if (myFavourites) {
        const newFavs = myFavourites.filter(fav => fav.id !== curBook.id);
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
  };

  const handleBook2FavClick = (curBook) => {
    // update book state
    const updbooks = book2.map(book => {
      if (book.id === curBook.id) {
        return { ...book, favourite: !curBook.favourite }
      }

      return book;
    });

    setBook2(updbooks);

    // update local storage book
    const myFavourites = JSON.parse(localStorage.getItem('b3k3nFav'));

    const newFavourite = {
      ...curBook,
      favourite: !curBook.favourite,
    }

    // if current favorite is true to be made not favorite
    // remove from local storage
    if (curBook.favourite) {
      if (myFavourites) {
        const newFavs = myFavourites.filter(fav => fav.id !== curBook.id);
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
  };

  return (
    <>
      <Navigation />
      <div className="content-layout-container">
        {loading && 
          <Spin style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50% -50%)" }} />
        }
        {!loading && 
          <>
            <div className={`main-content ${loading ? 'loading' : ''}`}>
              {categories && categories.length > 1 && 
                <>
                  <div style={{ color: "#4c4f54", fontSize: "1.3rem", fontWeight: 900, paddingLeft: 16 }}>{ categories[0].name }</div>
                  <ul className="card-container" style={{ flexWrap: "nowrap" }}>
                    {book1 && book1.length > 0 && 
                      book1.map(book => (
                        <li key={book.id} className="card">
                          <div className="card-content">
                            <div className="image-box">
                              <img src={book.cover_url} alt="cover img" />
                            </div>
                            <div className="book-title">{ book.title }</div>
                            <div className="book-author">{ book.authors?.join(" & ") }</div>
                            <div className="book-category">{ categories[0].name }</div>
                            <div 
                              className="fav" 
                              style={{ position: "absolute", zIndex: 1, right: 2, bottom: 34, cursor: "pointer" }} 
                              onClick={() => handleBook1FavClick(book)}
                            >
                              <svg className={`fav-star`} viewBox="0 0 114 110" style={{ width: "1rem", fill: book.favourite ? "#ffac33" : "#dee0e0" }}>
                                <path d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                              </svg>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </>
              }
            </div>
            <div className={`main-content ${loading ? 'loading' : ''}`}>
              {categories && categories.length > 1 && 
                <>
                  <div style={{ color: "#4c4f54", fontSize: "1.3rem", fontWeight: 900, paddingLeft: 16 }}>{ categories[1].name }</div>
                  <ul className="card-container" style={{ flexWrap: "nowrap" }}>
                    {book2 && book2.length > 0 && 
                      book2.map(book => (
                        <li key={book.id} className="card">
                          <div className="card-content">
                            <div className="image-box">
                              <img src={book.cover_url} alt="cover img" />
                            </div>
                            <div className="book-title">{ book.title }</div>
                            <div className="book-author">{ book.authors?.join(" & ") }</div>
                            <div className="book-category">{ categories[1].name }</div>
                            <div 
                              className="fav" 
                              style={{ position: "absolute", zIndex: 1, right: 2, bottom: 34, cursor: "pointer" }}
                              onClick={() => handleBook2FavClick(book)}
                            >
                              <svg className={`fav-star`} viewBox="0 0 114 110" style={{ width: "1rem", fill: book.favourite ? "#ffac33" : "#dee0e0" }}>
                                <path d="M48.7899002,5.95077319 L39.3051518,35.1460145 L8.60511866,35.1460145 C4.87617094,35.1519931 1.57402643,37.5554646 0.422104463,41.1020351 C-0.7298175,44.6486057 0.529798011,48.5337314 3.54354617,50.7297298 L28.3840111,68.7758317 L18.8992627,97.971073 C17.7496089,101.520283 19.0141379,105.406227 22.0323508,107.599168 C25.0505637,109.792109 29.1370771,109.794067 32.1573906,107.604021 L56.9864557,89.5693186 L81.8269206,107.615421 C84.8472342,109.805467 88.9337475,109.803509 91.9519605,107.610568 C94.9701734,105.417627 96.2347024,101.531683 95.0850486,97.9824729 L85.6003001,68.7986315 L110.440765,50.7525296 C113.466376,48.5582894 114.732852,44.663975 113.576698,41.1097771 C112.420545,37.5555791 109.105303,35.1516627 105.367793,35.1574144 L74.6677595,35.1574144 L65.1830111,5.96217312 C64.0286485,2.41064527 60.7208743,0.00457304502 56.9864557,5.53367114e-06 C53.2527571,-0.00420898295 49.9421526,2.39931752 48.7899002,5.95077319 Z"></path>
                              </svg>
                            </div>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </>
              }
            </div>
          </>
        }
      </div>
    </>
  );
}

export default Home;