import React from "react";
import { connect } from "react-redux";
import { toggle_login_modal, toggle_register_modal } from "../Actions";

// this should be a functional component remember to change if you have time
class LoginRegisterBlock extends React.Component {
  render() {
    return (
      <div className="col-lg-6" style={{ margin: "auto", marginTop: "0vh", padding: "2vh" }}>
        <button type="button" className="btn btn-primary " style={{ minWidth: "150px", margin: "15px" }} onClick={this.props.toggle_login_modal}>
          {" "}
          Log in
        </button>
        <button type="button" className="btn btn-primary" style={{ minWidth: "150px" }} onClick={this.props.toggle_register_modal}>
          Register
        </button>
      </div>
    );
  }
}

///////////////connecting LoginRegisterBlock to store
const mapStateToLoginRegisterBlockProps = (state) => {
  return {
    user_account: state.user_account,
    show_login_modal: state.show_login_modal,
  };
};

const mapDispatchToLoginRegisterBlockProps = (dispatch) => ({
  toggle_login_modal: (data) => dispatch(toggle_login_modal(data)),
  toggle_register_modal: (data) => dispatch(toggle_register_modal(data)),
});

let ConnectLoginRegisterBlock = connect(mapStateToLoginRegisterBlockProps, mapDispatchToLoginRegisterBlockProps)(LoginRegisterBlock);

export default ConnectLoginRegisterBlock;
