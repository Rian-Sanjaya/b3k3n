import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { headerReducer } from "./header";
import { categoryReducer } from "./category";
import { bookReducer} from "./book";

const composeEnhancers = 
(process.env.NODE_ENV !== 'production' && 
    typeof window !== 'undefined' && 
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  header: headerReducer,
  category: categoryReducer,
  book: bookReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);