/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
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
  const classes = useStyles();
  const {
    column, data, onSelect, onSort, order, orderBy,
  } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow hover>
              {
                column.map((
                  { align, label, field },
                ) => (
                  <TableCell className={classes.header} align={align}>
                    <TableSortLabel
                      align={align}
                      active={orderBy === field ? order : 'asc'}
                      onClick={onSort(field)}
                    >
                      {label}
                    </TableSortLabel>
                  </TableCell>
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
                <TableCell align={column[2].align}>{createdAt}</TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
Table1.propTypes = {
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.oneOf(['asc', 'desc']),
  onSelect: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

Table1.defaultProps = {
  order: 'asc',
};

export default withStyles(useStyles)(Table1);
