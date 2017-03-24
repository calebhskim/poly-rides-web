import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import post from '../actions/post';
import postStyles from '../styles/components/postRide';

export class PostRide extends Component {
  constructor(props) {
    super(props);
    this.handleArriveInput = this.handleArriveInput.bind(this);
    this.handleDepartInput = this.handleDepartInput.bind(this);
    this.handleDescInput = this.handleDescInput.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.state = {
      arrive: '',
      depart: '',
      desc: '',
      arriveError: false,
      departError: false,
      descError: false,
    };
  }

  handleArriveInput(searchText) {
    this.setState({
      arrive: searchText,
      arriveError: !searchText,
    });
  }

  handleDepartInput(searchText) {
    this.setState({
      depart: searchText,
      departError: !searchText,
    });
  }

  handleDescInput(e, value) {
    this.setState({
      desc: value,
      descError: !value,
    });
  }

  handlePost() {
    const { arrive, depart, desc } = this.state;
    if (!Date.now) {
      Date.now = () => new Date().getTime();
    }

    this.props.post({
      costPerSeat: 4,
      departTimestamp: Date.now() + 1000,
      description: desc,
      driver: 23,
      fromLocation: arrive,
      passengers: {
        billy: true,
        jack: true,
      },
      toLocation: depart,
      totalSeats: 42,
      postTimestamp: Date.now(),
    });
  }

  render() {
    const { arrive, arriveError, depart, departError, desc, descError } = this.state;
    const disable = arriveError || departError || descError || !(arrive && depart && desc);
    // TODO: Do proper sanitization below
    return (
      <Paper style={postStyles.container}>
        <AutoComplete
          dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
          errorText={departError && 'This field is required'}
          hintText='Depart From'
          onUpdateInput={this.handleDepartInput}
        />
        <AutoComplete
          dataSource={['SLO', 'LA', 'SF', 'Seattle', 'NY', 'Chapel Hill', 'Austin']}
          errorText={arriveError && 'This field is required'}
          hintText='Arrive At'
          onUpdateInput={this.handleArriveInput}
        />
        <TextField
          errorText={descError && 'This field is required'}
          hintText='Description'
          onChange={this.handleDescInput}
        />
        <FloatingActionButton
          disabled={disable}
          mini={true}
          onTouchTap={this.handlePost}
          style={postStyles.actionButton}
        >
          <ContentAdd />
        </FloatingActionButton>
      </Paper>
    );
  }
}


PostRide.propTypes = {
  post: PropTypes.func,
};

function mapStateToProps() {
  return {};
}

const mapDispatchToProps = {
  post,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostRide);
