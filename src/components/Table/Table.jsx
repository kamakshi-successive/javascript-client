import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
});

function Table1(props) {
  const {
    classes, column, data,
  } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                column.map((
                  { align, label },
                ) => (
                  <TableCell className={classes.header} align={align}>{label}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(({ name, email, createdAt }) => (
              <TableRow>
                <TableCell align={column[0].align}>
                  {' '}
                  {name}
                </TableCell>
                <TableCell>{email}</TableCell>
                <TableCell>{createdAt}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Table1.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default withStyles(useStyles)(Table1);
