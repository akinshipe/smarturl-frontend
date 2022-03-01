import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import { backend_base_url } from "../Base";
import { connect } from "react-redux";

import { toggle_user_urls_reload } from "../Actions";

// The content component is responsible for validating url input and sending it to the backend for shortening

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: "",
      short_url: "",
      button_disabled: false,
      inner_width: 0,
    };
  }

  componentDidMount() {
    // needed to monitor device dimension change so as to render custom made css styling for different dimensions. this technique is implemented in multiple components
    // for production app, its better to implement it in one place and have the components listen to it.
    setInterval(this.check_dimension, 200);
  }
  urlPatternValidation = () => {
    var r = /^(ftp|http|https):\/\/[^ "]+$/;
    let validation = r.test(this.state.form_data);
    if (validation === false) {
      alert("Wrong URL format. URL must start with either ' http:// ' or ' https:// ' or ' ftp:// '");
    }
    return validation;
  };

  handle_form_change = (event) => {
    this.setState({ form_data: event.target.value });
  };

  handle_click = (event) => {
    event.preventDefault();
    if (this.urlPatternValidation() === false) {
      return;
    }
    this.setState({ button_disabled: true });

    const url = backend_base_url + "api/shorten/";

    let data = { long_url: this.state.form_data };

    let token_header = null;
    if (localStorage.login_token !== undefined) {
      token_header = { Authorization: localStorage.login_token };
    }

    axios({
      method: "post",
      url: url,
      data: data,
      headers: token_header,
    })
      .then((response) => {
        toast("URL shortening completed");

        this.setState({ short_url: response.data.short_url });
        if (this.props.is_logged_in === true) {
          this.props.toggle_user_urls_reload();
        }
        this.setState({ button_disabled: false });
      })

      .catch((error) => {
        console.log(error.response.data);
        this.setState({ button_disabled: false });
      });
  };

  check_dimension = () => {
    if (window.innerWidth !== this.state.inner_width) {
      this.setState({ innner_width: window.innerWidth });
    }
  };
  get_display_info = () => {
    if (this.state.short_url === "") {
      return <p style={{ fontSize: "20px" }}>Please input the URL you want to shorten above </p>;
    } else
      return (
        <>
          <p style={{ fontSize: "20px" }}>
            Shortened URL : <b>{this.state.short_url}</b>
          </p>
          <button type="button" className="btn btn-danger " style={{ margin: "15px" }} onClick={this.copy_text_to_clipbaord}>
            Copy Url
          </button>
          <a href={this.state.short_url} target="_blank" rel="noopener noreferrer">
            <button type="button" className="btn btn-danger" onClick={this.props.toggle_register_modal}>
              Test Url
            </button>
          </a>
        </>
      );
  };
  get_style = () => {
    let style = { marginTop: "17vh" };
    if (window.innerHeight < 750) {
      style.marginTop = "8vh";
    }
    if (window.innerHeight < 450) {
      style.marginTop = "-3vh";
    }
    return style;
  };

  get_button_text_or_spinner = () => {
    let button = <input type="submit" value="Shorten Url" onClick={this.handle_click} disabled={this.state.button_disabled} />;
    if (this.state.button_disabled === true) {
      button = (
        <>
          return <input type="submit" value="             " onClick={this.handle_click} disabled={this.state.button_disabled} />
          <Spinner animation="border" size="sm" />
        </>
      );
    }

    return button;
  };
  copy_text_to_clipbaord = () => {
    window.navigator.clipboard.writeText(this.state.short_url);
    toast("Shortened Url copied to the clipboard");
  };

  text_url = () => {};

  render() {
    return (
      <div id="footer" style={{ height: "82vh" }}>
        <div className="footer-top">
          <div className="container" style={this.get_style()}>
            <div className="row  justify-content-center">
              <div className="col-lg-6">
                <h3>Shorten Your URL</h3>
              </div>
            </div>

            <div className="row footer-newsletter justify-content-center">
              <div className="col-lg-6">
                <form action="" method="post">
                  <input type="email" name="email" placeholder="Enter your URL" value={this.state.form_data} onChange={this.handle_form_change} />
                  {this.get_button_text_or_spinner()}
                </form>
              </div>
            </div>
            {this.get_display_info()}
          </div>
        </div>
      </div>
    );
  }
}

///////////////  Connecting Content Component to Redux store
const mapStateToContentProps = (state) => {
  return {
    is_logged_in: state.is_logged_in,
  };
};

const mapDispatchToContentProps = (dispatch) => ({
  toggle_user_urls_reload: (data) => dispatch(toggle_user_urls_reload(data)),
});

let ConnectContent = connect(mapStateToContentProps, mapDispatchToContentProps)(Content);

export default ConnectContent;
