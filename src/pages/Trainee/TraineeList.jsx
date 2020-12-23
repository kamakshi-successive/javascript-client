import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, withStyles } from '@material-ui/core';
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
      open: false,
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
    this.setState({
      open: false,
    }, () => {
      // eslint-disable-next-line no-console
      console.log(data);
    });
  }

  render() {
    const { open } = this.state;
    const { match: { url }, classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
            ADD TRAINEELIST
          </Button>
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
              },
              {
                field: 'createdAt',
                label: 'Date',
                align: 'right',
                format: this.getDateFormatted,
              },

            ]}
            // orderBy={orderBy}
            // order={order}
            // onSort={this.handleSort}
            // onSelect={this.handleSelect}
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
