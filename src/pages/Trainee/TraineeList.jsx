/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import moment from 'moment';
import { AddDialog, EditDialog, DeleteDialog } from './components/index';
import { Table1 } from '../../components';
import callApi from '../../libs/utils/api';
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
      items: [],
      count: 0,
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

  handleChangePage = (event, newPage) => {
    this.componentDidMount(newPage);
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

  componentDidMount = () => {
    this.setState({ isLoaded: true });
    const value = this.context;
    console.log('val :', value);
    // eslint-disable-next-line consistent-return
    callApi({}, 'get', `/user?skip=${0}&limit=${20}`).then((response) => {
      console.log('response compo', response);
      if (response.data === undefined) {
        this.setState({
          isLoaded: false,
        }, () => {
        });
      } else {
        console.log('res inside traineelist :', response);
        const record = response.data[0];
        console.log('records aa :', record);
        this.setState({ items: record, isLoaded: false, count: 100 });
        return response;
      }
    });
  }

  getDateFormatted = (date) => moment(date).format('dddd, MMMM Do YYYY, h:mm:ss a');

  render() {
    const {
      open, order, orderBy, page, rowsPerPage, EditOpen,
      RemoveOpen, editData, items, isLoaded, count,
      deleteData,
    } = this.state;
    const { classes } = this.props;
    console.log('itemms', items);
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
                data={items}
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
                count={count}
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
TraineeList.contextType = SnackbarContext;
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(useStyles)(TraineeList);
