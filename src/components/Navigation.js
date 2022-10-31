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
      <ul className="nav-box">
        {categories && categories.length > 0 && 
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
      </ul>
    </nav>
  );
}

export default Navigation;