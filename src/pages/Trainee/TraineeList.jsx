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
import { Mutation } from '@apollo/react-components';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { Table1 } from '../../components';
import { SnackbarContext } from '../../contexts/SnackBarProvider';
import { GET_TRAINEE_LIST } from './query';
import { UPDATE_TRAINEE, CREATE_TRAINEE, DELETE_TRAINEE } from './mutuation';

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

  handleChangeRowsPerPage = (event) => {
    this.setState({
      rowsPerPage: event.target.value,
      page: 0,
    });
  };

  onSubmitAdd = async (data1, openSnackBar, createTrainee, refetch) => {
    try {
      const { name, email, password } = data1;
      console.log('data in cre :', name, email, password);
      await createTrainee({ variables: { name, email, password } });
      refetch();
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Trainee Created Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Creating', 'error');
      });
    }
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
    // console.log('refetch', refetch({ skip: newPage * (rowsPerPage), limit: rowsPerPage }));
  }

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

  onSubmitEdit = async (data1, openSnackBar, updateTrainee, refetch) => {
    try {
      const { name, email, id } = data1;
      console.log('data in upd :', name, email, id);
      await updateTrainee({ variables: { name, email, id } });
      refetch();
      this.setState({
        EditOpen: false,
      }, () => {
        openSnackBar('Trainee Updated Successfully', 'success');
      });
    } catch (err) {
      console.log('err :', err);
      this.setState({
        open: false,
      }, () => {
        openSnackBar('Error While Updating', 'error');
      });
    }
  };

  onDeleteTrainee = async (data1, deleteTrainee, openSnackBar) => {
    const { originalId } = data1;
    const { rowsPerPage, page } = this.state;
    const {
      data: {
        getAllTrainees: { count = 0 } = {},
        refetch,
      },
    } = this.props;
    const response = await deleteTrainee({ variables: { originalId } });
    if (response) {
      this.setState({
        RemoveOpen: false,
      }, () => {
        openSnackBar('Trainee Deleted Successfully', 'success');
      });
      if (count - page * rowsPerPage === 1 && page > 0) {
        refetch({ skip: (page - 1) * rowsPerPage, limit: rowsPerPage });
      }
    }
  }

  handlePageChange = (refetch) => (event, newPage) => {
    const { rowsPerPage } = this.state;
    this.setState({
      page: newPage,
    }, () => {
      refetch({ skip: newPage * (rowsPerPage.length), limit: rowsPerPage.length });
    });
  }

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
        loading,
      },
    } = this.props;
    const variables = { skip: page * rowsPerPage.length, limit: rowsPerPage.length };
    console.log('get data', data);
    return (
      <>
        <Mutation
          mutation={DELETE_TRAINEE}
          refetchQueries={[{ query: GET_TRAINEE_LIST, variables }]}
        >
          {(deleteTrainee, deleteLoader = { loading }) => (
            <Mutation
              mutation={CREATE_TRAINEE}
              refetchQueries={[{ query: GET_TRAINEE_LIST, variables }]}
            >
              {(createTrainee, createrLoader = { loading }) => (
                <Mutation
                  mutation={UPDATE_TRAINEE}
                  refetchQueries={[{ query: GET_TRAINEE_LIST, variables }]}
                >
                  {(updateTrainee, updateLoader = { loading }) => (

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
                                  (data1) => this.onSubmitAdd(
                                    data1, openSnackBar, createTrainee, refetch,
                                  )
                                }
                                loading={createrLoader}
                              />
                            </div>
                            &nbsp;
                            &nbsp;
                            <EditDialog
                              Editopen={EditOpen}
                              handleEditClose={this.handleEditClose}
                              handleEdit={
                                (data1) => this.onSubmitEdit(
                                  data1, openSnackBar, updateTrainee, refetch,
                                )
                              }
                              data={editData}
                              loading={updateLoader}
                            />
                            <br />
                            <DeleteDialog
                              data={deleteData}
                              onClose={this.handleRemoveClose}
                              onSubmit={
                                (data1) => this.onDeleteTrainee(data1, deleteTrainee, openSnackBar)
                              }
                              open={RemoveOpen}
                              loading={deleteLoader}
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
                  )}
                </Mutation>
              )}
            </Mutation>
          )}
        </Mutation>
      </>
    );
  }
}
TraineeList.contextType = SnackbarContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Compose(
  withStyles(useStyles),
  graphql(GET_TRAINEE_LIST, {
    options: { variables: { option: { skip: 0, limit: 10 } } },
  }),
)(TraineeList);
