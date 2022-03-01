import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import ConnectLoginRegisterBlock from "./LoginRegisterBlock";
import ConnectWelcomeLogoutBlock from "./WelcomeLogoutBlock";

/// UrlStats component displays stats about login user's urls, it auto refreshes every 60 seconds
///it requeries the backend when a new shorturl is generated, in production, this doesnt need to happen as the newly generated url can just be added
// to the url list in the frontend instead of requerying the back end for the whole list.
class UrlStats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    setInterval(this.check_url_history, 500);
  }

  get_analytics_info = () => {
    if (this.props.is_logged_in === true) {
      return (
        <h5>
          Welcome back {this.props.user_account.username}, You have {this.props.user_urls.length} shortened URLs.
        </h5>
      );
    }

    return <h5>Hello Anonymous User, You are currently Logged out. Please Login to view your URLs stats</h5>;
  };

  get_url_list_or_spinner = () => {
    let content = this.get_analytics_info();
    if (this.props.loading_user_urls === true) {
      content = <Spinner animation="border" size="sm" />;
    }
    return content;
  };
  get_user_block = () => {
    let current_block = <ConnectLoginRegisterBlock />;

    if (this.props.is_logged_in === true) {
      current_block = <ConnectWelcomeLogoutBlock />;
    }
    return current_block;
  };
  render() {
    return (
      <section id="services" className="services">
        <div className="container">
          <div className="section-title">
            <h2>Your URL Analytics</h2>

            {this.get_url_list_or_spinner()}
            {this.get_user_block()}
          </div>
          <div className="row">
            {this.props.user_urls.map((item, index) => (
              <div className="col-lg-6 col-md-6 mt-4" key={index}>
                <div className="icon-box">
                  <div className="icon"></div>
                  <h4 className="title">
                    <a href={item.short_url} target="_blank" rel="noreferrer">
                      {item.short_url}
                    </a>
                  </h4>
                  <p className="description">Date Created : {item.created_time}</p>
                  <p className="description">Total visits : {item.visits}</p>
                  <p className="description">Last Visit : {item.last_visit_time}</p>
                  <p className="description">Long URL : {item.long_url}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
}

///////////////   Connecting UrlStats Component to Redux store
const mapStateToUrlStatsProps = (state) => {
  return {
    user_account: state.user_account,
    is_logged_in: state.is_logged_in,
    user_urls: state.user_urls,
    loading_user_urls: state.loading_user_urls,
  };
};

const mapDispatchToUrlStatsProps = (dispatch) => ({});

let ConnectUrlStats = connect(mapStateToUrlStatsProps, mapDispatchToUrlStatsProps)(UrlStats);

export default ConnectUrlStats;
