// Redux Store reducers

let reducers = (state, action) => {
  if (action.type === "save_user_account_to_store") {
    let new_state = Object.assign({}, state);
    new_state.user_account = action.payload;

    return new_state;
  }

  if (action.type === "save_user_urls_to_store") {
    let new_state = Object.assign({}, state);
    new_state.user_urls = action.payload;

    return new_state;
  }
  if (action.type === "toggle_loading_user_urls") {
    let new_state = Object.assign({}, state);

    new_state.loading_user_urls = !new_state.loading_user_urls;

    return new_state;
  }

  if (action.type === "toggle_redirect_modal") {
    let new_state = Object.assign({}, state);

    new_state.show_redirect_modal = !new_state.show_redirect_modal;

    return new_state;
  }

  if (action.type === "toggle_login_status") {
    let new_state = Object.assign({}, state);
    new_state.is_logged_in = !new_state.is_logged_in;

    return new_state;
  }
  if (action.type === "toggle_user_urls_reload") {
    let new_state = Object.assign({}, state);
    new_state.reload_user_urls = !new_state.reload_user_urls;

    return new_state;
  }

  if (action.type === "toggle_login_modal") {
    let new_state = Object.assign({}, state);
    new_state.show_login_modal = !new_state.show_login_modal;

    return new_state;
  }

  if (action.type === "toggle_register_modal") {
    let new_state = Object.assign({}, state);
    new_state.show_register_modal = !new_state.show_register_modal;

    return new_state;
  } else {
    return state;
  }
};

export default reducers;
