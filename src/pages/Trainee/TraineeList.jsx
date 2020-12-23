/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Grid, Button, withStyles } from '@material-ui/core';
import moment from 'moment';
import { AddDialog } from './components/AddDialog';
import trainees from './data/trainee';
import { Table1 } from '../../components';

const useStyles = (theme) => ({
  root: {
    margin: theme.spacing(2),
  },
  dialog: {
    textAlign: 'right',
  },
});

class TraineeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: '',
      open: false,
      orderBy: '',
      order: '',
    };
  }

  getDateFormatted = (date) => {
    moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleSubmit = (data) => {
    this.settate({
      open: false,
    }, () => console.log(data));
  }

  handleSort = (field) => {
    const { order } = this.state;
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  }

  handleSelect = (event, data) => {
    this.setState({ selected: event.target.value }, () => console.log(data));
  }

  render() {
    const { open, orderBy, order } = this.state;
    const { match: { url }, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Grid container direction="row" justify="flex-end" alignItems="flex-end">
            <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
              ADD TRAINEELIST
            </Button>
          </Grid>
          <Table1
            id="id"
            data={trainees}
            column={[
              {
                field: 'name',
                label: 'Name',
                align: 'center',
              },
              {
                field: 'email',
                label: 'Email Address',
                format: (value) => value && value.toUpperCase(),
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: this.getDateFormatted,
              },

            ]}
            orderBy={orderBy}
            order={order}
            onSort={this.handleSort}
            onSelect={this.handleSelect}
          />
          <AddDialog open={open} onClose={this.handleClose} onSubmit={() => this.handleSubmit} />
          <ul>
            {trainees.map(({ name, id }) => (
              <li key={id}>
                <Link to={`${url}/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  }
}
TraineeList.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);
