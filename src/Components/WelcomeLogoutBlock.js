import React from "react";
import { connect } from "react-redux";
import { toast } from "react-toastify";

import { save_user_account_to_store, toggle_login_status, save_user_urls_to_store } from "../Actions";

// Welcome Logout is only shown to login users to provide logout functionality

class WelcomeLogoutBlock extends React.Component {
  logout = () => {
    this.props.toggle_login_status();
    this.props.save_user_account_to_store(null);
    localStorage.removeItem("login_token");
    localStorage.removeItem("user_account");
    this.props.save_user_urls_to_store([]);
    toast("You have been logged out");
  };
  render() {
    return (
      <div className="col-lg-6" style={{ margin: "auto", marginTop: "0vh", padding: "2vh" }}>
        <button type="button" className="btn btn-primary " style={{ minWidth: "150px", margin: "15px" }} onClick={this.logout}>
          Log out
        </button>
      </div>
    );
  }
}

/////////////// Connecting WelcomeLogoutBlock to redux Store
const mapStateToWelcomeLogoutBlockProps = (state) => {
  return {
    user_account: state.user_account,
  };
};

const mapDispatchToWelcomeLogoutBlockProps = (dispatch) => ({
  toggle_login_status: (data) => dispatch(toggle_login_status(data)),
  save_user_account_to_store: (data) => dispatch(save_user_account_to_store(data)),
  save_user_urls_to_store: (data) => dispatch(save_user_urls_to_store(data)),
});

let ConnectWelcomeLogoutBlock = connect(mapStateToWelcomeLogoutBlockProps, mapDispatchToWelcomeLogoutBlockProps)(WelcomeLogoutBlock);

export default ConnectWelcomeLogoutBlock;
