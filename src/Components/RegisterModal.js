import React from "react";
import axios from "axios";
import { backend_base_url } from "../Base";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-modal";
import { toast } from "react-toastify";
import { connect } from "react-redux";

import { toggle_login_modal, toggle_register_modal } from "../Actions";

/// the register Component handles user registration, believe me this component is not production ready as several validation and response case scenarios have not been handled yet.
// the component can also be broken down to several child components to enhance code compactness
class RegisterModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_width: 0,
      modal_style: { overlay: { zIndex: 1000 } },
      form_data: { username: "", password: "", email: "" },
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
        height: "77vh",
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

  handle_register = (event) => {
    this.setState({ button: false });

    this.setState({ button_disable_status: true });
    let url = backend_base_url + "api/register/";
    axios({
      method: "post",
      url: url,
      data: this.state.form_data,
    })
      .then((res) => {
        toast("New account created succesfully. Please Login");
        this.props.toggle_register_modal();
        this.props.toggle_login_modal();
        this.setState({ button_disable_status: false });
      })

      .catch((error) => {
        alert(error.response.data);
        this.setState({ button_disable_status: false });
      });
  };
  get_button_text_or_spinner = () => {
    let button = (
      <button
        type="button"
        className="btn btn-primary btn-lg"
        style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
        onClick={this.handle_register}
        disabled={this.state.button_disable_status}
      >
        Register
      </button>
    );

    if (this.state.button_disable_status === true) {
      button = (
        <>
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            onClick={this.handle_register}
            disabled={this.state.button_disable_status}
          >
            <Spinner animation="border" size="sm" />
          </button>
        </>
      );
    }
    return button;
  };
  take_to_login_modal = () => {
    this.props.toggle_register_modal();
    this.props.toggle_login_modal();
  };

  render() {
    return (
      <Modal style={this.state.modal_style} isOpen={this.props.show_register_modal} ariaHideApp={false}>
        <button
          type="button"
          className="btn btn-danger btn-lg"
          style={{ paddingLeft: "1rem", paddingRight: "1rem", float: "right" }}
          onClick={this.props.toggle_register_modal}
        >
          X
        </button>
        <section>
          <div style={{ margin: "auto" }}></div>
          <div className="container-fluid h-custom">
            <h1 style={{ marginLeft: "7vw" }}>SmartURL</h1>

            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample " />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <h2 style={{ margin: "25px" }}>Register an Account</h2>
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
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="email"
                      className="form-control form-control-lg"
                      placeholder="Enter email"
                      value={this.state.form_data.email}
                      onChange={this.handle_form_change}
                    />
                    <label className="form-label" htmlFor="form3Example3">
                      Email
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
                      Already have an account?{" "}
                      <button onClick={this.take_to_login_modal}>
                        <b>Login</b>
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

///////////////  Connecting Register Modal Component to Redux Store
const mapStateToRegisterModalProps = (state) => {
  return { show_register_modal: state.show_register_modal };
};

const mapDispatchToRegisterModalProps = (dispatch) => ({
  toggle_register_modal: (data) => dispatch(toggle_register_modal(data)),
  toggle_login_modal: (data) => dispatch(toggle_login_modal(data)),
});

let ConnectRegisterModal = connect(mapStateToRegisterModalProps, mapDispatchToRegisterModalProps)(RegisterModal);

export default ConnectRegisterModal;
