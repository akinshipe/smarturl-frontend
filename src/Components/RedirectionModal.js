import React from "react";
import axios from "axios";
import { backend_base_url } from "../Base";
import Spinner from "react-bootstrap/Spinner";
import Modal from "react-modal";
import { connect } from "react-redux";

import { toggle_redirect_modal } from "../Actions";

// The redirection Modal is where the magic of mapping incoming request to the needed destination, 5 seconds latency was knowing created before redirection so as to enable you inspect the component.
// the component can also be broken down to several child components to eneable code compactness

class RedirectionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      screen_width: 0,
      modal_style: { overlay: { zIndex: 1000 } },
      connecting_to_db: true,
    };
  }

  componentDidMount() {
    setInterval(this.modal_style, 100);
    setTimeout(this.get_destination_url_from_db, 500);
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

  get_destination_url_from_db = () => {
    if (this.props.show_redirect_modal === false) {
      return;
    }

    const url = backend_base_url + "api/destination/";

    let data = { short_url: window.location.href };

    axios({
      method: "post",
      url: url,
      data: data,
    })
      .then((response) => {
        window.location.href = response.data;
      })

      .catch((error) => {
        this.setState({ connecting_to_db: false });
      });
  };

  content_info = () => {
    let big_info = "Redirecting you to your final destination ....";
    let small_info = "This world is not my home. I am just passing through. My treasures are laid up, somewhere beyond the blue.   -  J.R. Baxter";
    let text_color = "blue";
    let button = <Spinner animation="border" />;
    let close_button = null;
    if (this.state.connecting_to_db === false) {
      big_info = "Ohh No !!! Destination could not be found";
      small_info = "It seems your url is wrong. Please confirm you have the right url and try again.";
      text_color = "red";

      close_button = (
        <button
          type="button"
          className="btn btn-danger btn-lg"
          style={{ paddingLeft: "1rem", paddingRight: "1rem", float: "right" }}
          onClick={this.props.toggle_redirect_modal}
        >
          X
        </button>
      );
    }

    return [big_info, small_info, text_color, button, close_button];
  };

  get_modal_content = () => {};
  render() {
    let content = this.content_info();
    return (
      <Modal style={this.state.modal_style} isOpen={this.props.show_redirect_modal} ariaHideApp={false}>
        {content[4]}
        <section>
          <div style={{ margin: "auto" }}></div>
          <div className="container-fluid h-custom">
            <h1 style={{ marginLeft: "7vw" }}>SmartURL</h1>

            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample" />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1" style={{ textAlign: "center" }}>
                <h2 style={{ margin: "25px", color: content[2] }}>{content[0]}</h2>
                {content[3]}
                <p style={{ margin: "25px", color: content[2] }}>{content[1]}</p>
              </div>
            </div>
          </div>
        </section>
      </Modal>
    );
  }
}

///////////////    Connecting RedirectionModal to Redux Store
const mapStateToRedirectionModalProps = (state) => {
  return {
    show_redirect_modal: state.show_redirect_modal,
  };
};

const mapDispatchToRedirectionModalProps = (dispatch) => ({
  toggle_redirect_modal: (data) => dispatch(toggle_redirect_modal(data)),
});

let ConnectRedirectionModal = connect(mapStateToRedirectionModalProps, mapDispatchToRedirectionModalProps)(RedirectionModal);

export default ConnectRedirectionModal;
