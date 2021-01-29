/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { Table1 } from '../../components';
import { SnackbarContext } from '../../contexts/SnackBarProvider';
import { GET_TRAINEE_LIST } from './query';

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
      rowsPerPage: 5,
      isLoaded: false,
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
    openSnackBar('User Data Added Successfully', 'success');
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

  handlePageChange = (refetch) => async (event, newPage) => {
    const { rowsPerPage } = this.state;
    await this.setState({ page: newPage });
    refetch({ skip: newPage * (rowsPerPage), limit: rowsPerPage });
  }

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

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

  handleRemove = () => {
    const { deleteData } = this.state;
    this.setState({
      RemoveOpen: false,
    });
    console.log('Deleted Item ', deleteData);
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

  handleEdit = (name, email) => {
    this.setState({
      EditOpen: false,
    });
    console.log('Edited Item ', { name, email });
  };

  getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen,
      RemoveOpen, editData, isLoaded, count,
      deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: {
          data = [], totalCount = 0,
        } = {},
        refetch,
      },
    } = this.props;
    console.log('get data', data);
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
                    (data1) => this.handleSubmit(openSnackBar, data1)
                  }
                />
              </div>
          &nbsp;
          &nbsp;
              <EditDialog
                Editopen={EditOpen}
                handleEditClose={this.handleEditClose}
                handleEdit={this.handleEdit}
                data={editData}
              />
              <br />
              <DeleteDialog
                data={deleteData}
                onClose={this.handleRemoveClose}
                onSubmit={this.handleRemove}
                open={RemoveOpen}
              />
              <br />
              <br />
              <Table1
                loader={isLoaded}
                id="id"
                data={data}
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
                count={totalCount}
                page={page}
                onChangePage={this.handlePageChange(refetch)}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                rowsPerPage={rowsPerPage}
              />
            </div>
          </>
        )}
      </SnackbarContext.Consumer>
    );
  }
}
TraineeList.contextType = SnackbarContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE_LIST, {
    options: { variables: { option: { skip: 0, limit: 10 } } },
  }),
)(TraineeList);
