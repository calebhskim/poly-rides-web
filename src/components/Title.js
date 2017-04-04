import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import lifecycles from '../constants/lifecycles';
import Profile from '../components/Profile';
import titleStyle from '../styles/components/title';

const {
  titleContainer,
  titleSearch,
  titleSearchBar,
  titleSearchButton,
  titleText,
} = titleStyle;

class Title extends Component {
  render() {
    const { isFetching, lifecycle, title } = this.props;
    const loggedIn = lifecycle === lifecycles.AUTH_LOGGEDIN;

    return (
      <div style={titleContainer}>
        <h2 style={titleText}>
          {title}
        </h2>
        { title === 'Feed' && <div style={titleSearch}>
          <div style={titleSearchBar}>
            <AutoComplete
              hintText='Search'
              // Eventually connect this to live city data source. typeahead.js and bloodhound?
              dataSource={['San Francisco', 'San Luis Obispo', 'Los Angeles', 'Seattle']}
              onUpdateInput={this.handleUpdateInput}
              fullWidth={true}
            />
          </div>
          <IconButton style={titleSearchButton}>
            <Search />
          </IconButton>
        </div> }
        { !isFetching && loggedIn && <div style={titleContainer}>
          <Profile />
        </div> }
      </div>
    );
  }
}

Title.propTypes = {
  isFetching: PropTypes.bool,
  lifecycle: PropTypes.string,
  title: PropTypes.string,
};

function mapStateToProps(state) {
  const { auth: { isFetching, lifecycle }, config: { title } } = state;
  return {
    isFetching,
    lifecycle,
    title,
  };
}

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Title);
