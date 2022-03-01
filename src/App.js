import React from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import { backend_base_url, frontend_base_url } from "./Base";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ConnectContent from "./Components/Content";
import ConnectRedirectionModal from "./Components/RedirectionModal";
import ConnectRegisterModal from "./Components/RegisterModal";
import ConnectLoginModal from "./Components/LoginModal";
import ConnectUrlStats from "./Components/UrlStats";

// these are redux actions
import {
  save_user_account_to_store,
  toggle_login_status,
  toggle_user_urls_reload,
  save_user_urls_to_store,
  toggle_loading_user_urls,
  toggle_redirect_modal,
} from "./Actions";

//// The App component is the entry point of the application, it is being imported by index.js,
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.initialise_required_data();
  }
  // intialises all needed running process and data for application to work
  initialise_required_data = () => {
    //// the order in which this functions are arranged is extremmely important

    setInterval(this.get_user_data_from_local_storage_and_save_to_store, 100);
    setInterval(this.get_logged_in_user_urls_from_backend, 1000);
    setInterval(this.props.toggle_user_urls_reload, 60000);
    this.redirect_url_to_final_destination();
    // toast notification config
    toast.configure({ autoClose: 3000, draggable: false });
  };

  get_logged_in_user_urls_from_backend = () => {
    if (this.props.reload_user_urls === false || this.props.is_logged_in === false) {
      return;
    }

    /// turn off auto get url stats to avoid multiple queries
    this.props.toggle_user_urls_reload();

    this.props.toggle_loading_user_urls();

    const url = backend_base_url + "api/user/urls/";

    let data = { long_url: this.state.form_data };

    let token_header = null;
    if (localStorage.login_token !== undefined) {
      token_header = { Authorization: localStorage.login_token };
    }

    axios({
      method: "get",
      url: url,
      data: data,
      headers: token_header,
    })
      .then((response) => {
        this.props.save_user_urls_to_store(response.data);
        this.props.toggle_loading_user_urls();
      })

      .catch((error) => {
        console.log(error.response.data);
        this.props.toggle_loading_user_urls();
      });
  };

  get_user_data_from_local_storage_and_save_to_store = () => {
    if (this.props.is_logged_in === true) {
      return;
    }
    if (localStorage.login_token !== undefined && localStorage.user_account !== undefined) {
      let user_account = JSON.parse(localStorage.user_account);
      this.props.save_user_account_to_store({ username: user_account.username, email: user_account.email, user_id: user_account.user_id });
      this.props.toggle_login_status();
      this.props.toggle_user_urls_reload();
    }
  };

  // this function activates the RedirectionModal Compnent for passing Traffic
  redirect_url_to_final_destination = () => {
    if (window.location.href !== frontend_base_url) {
      this.props.toggle_redirect_modal();
    }
  };

  render() {
    return (
      <div>
        <Header />
        <ConnectContent />
        <ConnectUrlStats />
        <Footer />
        <ConnectLoginModal />
        <ConnectRegisterModal />
        <ConnectRedirectionModal />
      </div>
    );
  }
}

/////////////// Connecting App componemt to Redux Store
const mapStateToAppProps = (state) => {
  return {
    user_account: state.user_account,
    reload_user_urls: state.reload_user_urls,
    is_logged_in: state.is_logged_in,
  };
};

const mapDispatchToAppProps = (dispatch) => ({
  save_user_account_to_store: (data) => dispatch(save_user_account_to_store(data)),
  save_user_urls_to_store: (data) => dispatch(save_user_urls_to_store(data)),
  toggle_login_status: (data) => dispatch(toggle_login_status(data)),

  toggle_user_urls_reload: (data) => dispatch(toggle_user_urls_reload(data)),
  toggle_loading_user_urls: (data) => dispatch(toggle_loading_user_urls(data)),
  toggle_redirect_modal: (data) => dispatch(toggle_redirect_modal(data)),
});

export default connect(mapStateToAppProps, mapDispatchToAppProps)(App);
