/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { Table1 } from '../../components';
import trainees from './data/trainee';
import { SnackbarContext } from '../../contexts/SnackBarProvider';

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
      orderBy: '',
      order: 'asc',
      EditOpen: false,
      RemoveOpen: false,
      editData: {},
      deleteData: {},
      page: 0,
      rowsPerPage: 10,
    };
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    const { open } = this.state;
    this.setState({ open: false });
    return open;
  };

  handleSubmit = (openSnackBar, data) => {
    openSnackBar('User Data Edit Successfully', 'success');
    this.setState({
      open: false,
    }, () => {
      console.log('Data :', data);
    });
  }

  handleSelect = () => {
    // console.log(event);
  };

  handleSort = (field) => (event) => {
    const { order } = this.state;
    console.log(event);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({
      page: newPage,
    });
  };

  // eslint-disable-next-line no-unused-vars
  handleRemoveDialogOpen = (element) => (event) => {
    this.setState({
      RemoveOpen: true,
      deleteData: element,
    });
  };

  handleRemoveClose = () => {
    this.setState({
      RemoveOpen: false,
    });
  };

  handleRemove = (openSnackBar) => {
    const { deleteData } = this.state;
    if (deleteData.createdAt >= '2019-02-14') {
      openSnackBar('User Data Deleted Successfully', 'success');
      console.log('Deleted Item ', deleteData);
    } else {
      openSnackBar('Cannot Delete User Data Successfully', 'error');
    }
    this.setState({
      RemoveOpen: false,
    });
  };

  handleEditDialogOpen = (element) => () => {
    this.setState({
      EditOpen: true,
      editData: element,
    });
  };

  handleEditClose = () => {
    this.setState({
      EditOpen: false,
    });
  };

  handleEdit = (openSnackBar, name, email) => {
    openSnackBar('User Data Updated Successfully', 'success');
    this.setState({
      EditOpen: false,
    });
    console.log('Edited Item ', { name, email });
  };

  getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, editData,
    } = this.state;
    const { classes } = this.props;
    return (
      <SnackbarContext.Consumer>
        {({ openSnackBar }) => (
          <>
            <div className={classes.root}>
              <div className={classes.dialog}>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                  ADD TRAINEELIST
                </Button>
                <AddDialog
                  open={open}
                  onClose={this.handleClose}
                  onSubmit={
                    (data) => this.handleSubmit(openSnackBar, data)
                  }
                />
              </div>
          &nbsp;
          &nbsp;
              <EditDialog
                Editopen={EditOpen}
                handleEditClose={this.handleEditClose}
                handleEdit={(name, email) => this.handleEdit(openSnackBar, name, email)}
                data={editData}
              />
              <br />
              <DeleteDialog
                openRemove={RemoveOpen}
                onClose={this.handleRemoveClose}
                remove={(deleteData) => this.handleRemove(openSnackBar, deleteData)}
              />
              <br />
              <br />
              <Table1
                id="id"
                data={trainees}
                column={
                  [
                    {
                      field: 'name',
                      label: 'Name',
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
                  ]
                }
                actions={[
                  {
                    icon: <EditIcon />,
                    handler: this.handleEditDialogOpen,

                  },
                  {
                    icon: <DeleteIcon />,
                    handler: this.handleRemoveDialogOpen,
                  },
                ]}
                onSort={this.handleSort}
                orderBy={orderBy}
                order={order}
                onSelect={this.handleSelect}
                count={100}
                page={page}
                onChangePage={this.handleChangePage}
                rowsPerPage={rowsPerPage}
              />
            </div>
          </>
        )}
      </SnackbarContext.Consumer>
    );
  }
}

TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(TraineeList);
