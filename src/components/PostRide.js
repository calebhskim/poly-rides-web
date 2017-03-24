import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import AutoComplete from 'material-ui/AutoComplete';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

import post from '../actions/post';
import postStyles from '../styles/components/postRide';

export class PostRide extends Component {
  constructor(props) {
    super(props);
    this.handleArriveInput = this.handleArriveInput.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDepartInput = this.handleDepartInput.bind(this);
    this.handleDescInput = this.handleDescInput.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handlePost = this.handlePost.bind(this);
    this.state = {
      arrive: '',
      arriveError: false,
      depart: '',
      departError: false,
      desc: '',
      descError: false,
      open: false,
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

  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
    }).then(() => {
      this.handleClose();
    }).catch(() => {
      // TODO: Properly handle errors here
      console.log('POST FAILED');
    });
  }

  render() {
    const { arrive, arriveError, depart, departError, desc, descError } = this.state;
    const disable = arriveError || departError || descError || !(arrive && depart && desc);
    const actions = [
      <FlatButton
        label='Cancel'
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label='Submit'
        primary={true}
        onTouchTap={this.handlePost}
      />,
    ];
    // TODO: Do proper sanitization below
    return (
      <div>
        <Paper className='hidden-md-down' style={postStyles.container}>
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
        <Paper className='hidden-lg-up' style={postStyles.mobilePost}>
          <FloatingActionButton
            mini={true}
            onTouchTap={this.handleOpen}
            style={postStyles.actionButton}
          >
            <ContentAdd />
          </FloatingActionButton>
          <Dialog
            title='Add a ride'
            actions={actions}
            modal={true}
            open={this.state.open}
            autoDetectWindowHeight={false}
            actionsContainerStyle={{ height: '100vh' }}
            contentStyle={{ width: '100%', transform: 'translate(0, 0)' }}
          >
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
          </Dialog>
        </Paper>
      </div>
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
