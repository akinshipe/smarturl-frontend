import { createStore } from "redux";
import rotateReducer from "./Reducers";
import { composeWithDevTools } from "redux-devtools-extension";

// redux central state , I wonder why I did not rename it store/ the composewithDevtools allows me to be able to track my actions using the chrome extension
let state = {
  user_account: null,
  user_urls: [],
  loading_user_urls: false,
  reload_user_urls: false,
  show_login_modal: false,

  is_logged_in: false,
  show_register_modal: false,
  show_user_url: false,
  show_redirect_modal: false,
};

function configureStore() {
  return createStore(rotateReducer, state, composeWithDevTools());
}

export default configureStore;
