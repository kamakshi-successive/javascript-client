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
import { CREATED_TRAINEE_SUB, DELETED_TRAINEE_SUB, UPDATED_TRAINEE_SUB } from './Subscription';

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

  onSubmitAdd = async (data1, openSnackBar, createTrainee) => {
    const { data: { refetch } } = this.props;
    console.log('Add this.props', this.props);
    try {
      const { name, email, password } = data1;
      console.log('data in cre :', name, email, password);
      await createTrainee({ variables: { name, email, password } });
      this.setState({
        open: false,
      }, () => {
        refetch({ skip: 0, limit: 5 });
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
    console.log('this.state order', order);
    console.log(event);
    console.log('field', field);
    this.setState({
      orderBy: field,
      order: order === 'asc' ? 'desc' : 'asc',
    });
  };

  handlePageChange = async (event, newPage) => {
    const { page } = this.state;
    console.log('page', page);
    console.log('newPage', newPage);
    const { data: { refetch } } = this.props;
    const limit = 5;
    const skip = limit * newPage;
    await this.setState({ page: newPage }, () => refetch({ skip, limit }));
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

  onSubmitEdit = async (data1, openSnackBar, updateTrainee) => {
    try {
      const { data: { refetch } } = this.props;
      const { name, email, id } = data1;
      console.log('data in upd :', name, email, id);
      await updateTrainee({ variables: { name, email, id } });
      this.setState({
        EditOpen: false,
      }, () => {
        refetch();
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

  onDeleteTrainee = async (data1, deleteTrainee, openSnackBar, refetch) => {
    const { originalId } = data1;
    console.log('data deleted ', originalId);
    const { rowsPerPage, page } = this.state;
    const response = await deleteTrainee({ variables: { originalId } });
    if (response) {
      this.setState({
        RemoveOpen: false,
      }, () => {
        refetch();
        openSnackBar('Trainee Deleted Successfully', 'success');
      });
    }
  }

  getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  componentDidMount = () => {
    const { data: { subscribeToMore } } = this.props;
    subscribeToMore({
      document: CREATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        console.log('Trainee created data', data);
        const { data: { traineeAdded } } = subscriptionData;
        console.log('trainee created data originalID........', traineeAdded.originalId);
        const createdRecords = [...data].map((records) => {
          console.log('Records data original ID....... ', records.originalId);
          if (records.originalId !== traineeAdded.originalId) {
            console.log('found match ');
            return {
              ...records,
              ...traineeAdded,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.traineeCount,
            data: createdRecords,
          },
        };
      },
    });

    subscribeToMore({
      document: UPDATED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        console.log('Trainee updated data', data);
        const { data: { traineeUpdated } } = subscriptionData;
        console.log('Trainee updated data originalId', traineeUpdated.data.originalId);
        const updatedRecords = [...data].map((records) => {
          console.log('Trainee updated records originalId ', records.originalId);
          if (records.originalId === traineeUpdated.data.originalId) {
            console.log('found match ');
            return {
              ...records,
              ...traineeUpdated,
            };
          }
          return records;
        });
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.TraineeCount,
            data: updatedRecords,
          },
        };
      },
    });
    subscribeToMore({
      document: DELETED_TRAINEE_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData) return prev;
        const { getAllTrainees: { data } } = prev;
        console.log('data', data);
        const { data: { traineeDeleted } } = subscriptionData;
        console.log('traineeDeleted', traineeDeleted);
        // eslint-disable-next-line max-len
        const updatedRecords = [...data].filter((records) => records.originalId !== traineeDeleted.originalId);
        console.log('updated Records for delete', updatedRecords);
        return {
          getAllTrainees: {
            ...prev.getAllTrainees,
            ...prev.getAllTrainees.traineeCount - 1,
            data: updatedRecords,
          },
        };
      },
    });
  }

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen,
      RemoveOpen, editData, isLoaded,
      deleteData,
    } = this.state;
    const { classes } = this.props;
    const {
      data: {
        getAllTrainees: {
          data = [], totalCount,
        } = {},
        refetch,
        loading,
      },
    } = this.props;
    console.log('data uis : ', data);
    // console.log('data totalCount : ', totalCount);
    const variables = { skip: page * 5, limit: 5 };
    return (
      <>
        <Mutation
          mutation={DELETE_TRAINEE}
        >
          {(deleteTrainee, deleteLoader = { loading }) => (
            <Mutation
              mutation={CREATE_TRAINEE}
            >
              {(createTrainee, createrLoader = { loading }) => (
                <Mutation
                  mutation={UPDATE_TRAINEE}
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
                                (data1) => this.onDeleteTrainee(data1, deleteTrainee,
                                  openSnackBar, refetch)
                              }
                              open={RemoveOpen}
                              loading={deleteLoader}
                            />
                            <br />
                            <br />
                            <Table1
                              loader={isLoaded}
                              id="originalId"
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
                              onChangePage={(event, newPage) => this.handlePageChange(
                                event, newPage,
                              )}
                              // onChangeRowsPerPage={this.handleChangeRowsPerPage}
                              rowsPerPage={5}
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
    options: {
      variables: { skip: 0, limit: 5 },
      fetchPolicy: 'network-only',
    },
  }),
)(TraineeList);
