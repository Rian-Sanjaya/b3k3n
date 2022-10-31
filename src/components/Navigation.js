import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, fetchCategories } from "../store/category";

function Navigation() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  return (
    <nav className="nav-container">
      {categories && categories.length > 0 && 
        <>
          <div style={{ color: "rgb(76, 79, 84)", fontSize: "1.1rem", fontWeight: 900, paddingLeft: 12, marginBottom: 12 }}>Explore Categories</div>
          <ul className="nav-box">
            {
              categories.map(cat => (
                <li key={cat.id} className="nav-content">
                  <Link 
                    to="/category"
                    state={{ categooryId: cat.id, name: cat.name }}
                    className="nav-link"
                  >
                    { cat.name }
                  </Link>
                </li>
              ))
            }
            <li className="nav-content">
              <Link to="/favourite" className="nav-link">Favourite</Link>
            </li>
          </ul>
        </>
      }
    </nav>
  );
}

export default Navigation;