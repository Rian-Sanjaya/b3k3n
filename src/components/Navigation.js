import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCategories, fetchCategories } from "../store/category";

function Navigation() {
  const dispatch = useDispatch();
  const categories = useSelector(getCategories);
  
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch])

  return (
    <nav>
      {categories && categories.length > 0 && 
        categories.map(cat => (
          <NavLink 
            key={cat.id} 
            to="/category"
            state={{ categooryId: cat.id, name: cat.name }}
            style={{ marginRight: 8 }}
          >
            { cat.name }
          </NavLink>
        ))
      }
    </nav>
  );
}

export default Navigation;