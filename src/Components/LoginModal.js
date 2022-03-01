import React from "react";
import axios from "axios";
import { backend_base_url } from "../Base";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { save_user_account_to_store, toggle_login_modal, toggle_login_status, toggle_user_urls_reload, toggle_register_modal } from "../Actions";

// this is the component responsible for login, a well written version of the login component should have several child component to avoid clumping several functionalities together

class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_width: 0,
      modal_style: { overlay: { zIndex: 1000 } },
      form_data: { username: "", password: "" },
      button_disable_status: false,
    };
  }
  componentDidMount() {
    setInterval(this.modal_style, 100);
  }

  modal_style = () => {
    let styles = {
      content: {
        width: "70vw",
        height: "70vh",
        top: "10%",
        left: "10%",
      },
      overlay: { zIndex: 1000 },
    };

    if (window.innerHeight < 700 || window.innerWidth < 1050) {
      styles = {
        content: {
          width: "100vw",
          height: "100vh",
          top: "0%",
          left: "0%",
        },
        overlay: { zIndex: 1000 },
      };
    }
    this.setState({ screen_width: window.innerWidth, modal_style: styles });
  };

  handle_form_change = (event) => {
    let new_form_data = this.state.form_data;

    let key;
    for (key in new_form_data) {
      if (key === event.target.id) {
        //alert(event.target.id);
        new_form_data[key] = event.target.value;
        this.setState({ form_data: new_form_data });
      }
    }
  };

  handle_login = (event) => {
    this.setState({ button_disable_status: true });
    let url = backend_base_url + "api/login/";
    axios({
      method: "post",
      url: url,
      data: this.state.form_data,
    })
      .then((res) => {
        let token = "Token " + res.data.token;

        this.props.save_user_account_to_store({ username: res.data.username, email: res.data.email, user_id: res.data.user_id });
        localStorage.setItem("login_token", token);
        localStorage.setItem("user_account", JSON.stringify(res.data));
        this.props.toggle_login_status();
        this.props.toggle_user_urls_reload();
        this.props.toggle_login_modal();
        toast("Login is succesful");
        this.setState({ button_disable_status: false });
      })

      .catch((error) => {
        console.log(error.response.data);
        this.setState({ button_disable_status: false });
      });
  };

  get_button_text_or_spinner = () => {
    let button = (
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        onClick={this.handle_login}
        disabled={this.state.button_disable_status}
      >
        Login
      </button>
    );

    if (this.state.button_disable_status === true) {
      button = (
        <>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            onClick={this.handle_login}
            disabled={this.state.button_disable_status}
          >
            <Spinner animation="border" size="sm" />
          </button>
        </>
      );
    }
    return button;
  };

  take_to_register_modal = () => {
    this.props.toggle_login_modal();
    this.props.toggle_register_modal();
  };
  render() {
    return (
      <Modal style={this.state.modal_style} isOpen={this.props.show_login_modal} ariaHideApp={false}>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          style={{ paddingLeft: "1rem", paddingRight: "1rem", float: "right" }}
          onClick={this.props.toggle_login_modal}
        >
          X
        </button>
        <section>
          <div style={{ margin: "auto" }}></div>
          <div className="container-fluid h-custom">
            <h1 style={{ marginLeft: "7vw" }}>SmartURL</h1>

            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <h2 style={{ margin: "25px" }}>Please Login</h2>
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="username"
                      className="form-control form-control-lg"
                      placeholder="Enter username"
                      value={this.state.form_data.username}
                      onChange={this.handle_form_change}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Username
                    </label>
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="password"
                      className="form-control form-control-lg"
                      placeholder="Enter password"
                      value={this.state.form_data.password}
                      onChange={this.handle_form_change}
                    />
                    <label className="form-label" htmlFor="form3Example4">
                      Password
                    </label>
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    {this.get_button_text_or_spinner()}
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <button onClick={this.take_to_register_modal}>
                        <b>Register</b>
                      </button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    );
  }
}

///////////////   Connecting LoginModal Component to Redux Store to store
const mapStateToLoginModalProps = (state) => {
  return {
    user_account: state.user_account,
    show_login_modal: state.show_login_modal,
    is_logged_in: state.is_logged_in,
  };
};

const mapDispatchToLoginModalProps = (dispatch) => ({
  toggle_login_modal: (data) => dispatch(toggle_login_modal(data)),
  toggle_register_modal: (data) => dispatch(toggle_register_modal(data)),
  toggle_login_status: (data) => dispatch(toggle_login_status(data)),
  save_user_account_to_store: (data) => dispatch(save_user_account_to_store(data)),
  toggle_user_urls_reload: (data) => dispatch(toggle_user_urls_reload(data)),
});

let ConnectLoginModal = connect(mapStateToLoginModalProps, mapDispatchToLoginModalProps)(LoginModal);

export default ConnectLoginModal;
