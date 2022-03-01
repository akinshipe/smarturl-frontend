// mapped out actions for dispatch to the reducer to modify redux store

export const save_user_account_to_store = (data) => ({
  type: "save_user_account_to_store",
  payload: data,
});
export const save_user_urls_to_store = (data) => ({
  type: "save_user_urls_to_store",
  payload: data,
});
export const toggle_loading_user_urls = (data) => ({
  type: "toggle_loading_user_urls",
  payload: data,
});

export const toggle_user_urls_reload = (data) => ({
  type: "toggle_user_urls_reload",
  payload: data,
});
export const toggle_redirect_modal = (data) => ({
  type: "toggle_redirect_modal",
  payload: data,
});

export const toggle_login_modal = (data) => ({
  type: "toggle_login_modal",
  payload: data,
});
export const toggle_register_modal = (data) => ({
  type: "toggle_register_modal",
  payload: data,
});
export const toggle_login_status = (data) => ({
  type: "toggle_login_status",
  payload: data,
});
