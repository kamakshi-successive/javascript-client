/* eslint-disable no-console */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

const useStyles = (theme) => ({
  table: {
    minWidth: 650,
  },
  header: {
    color: 'grey',
  },
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'rgb(200,200,200)',
      cursor: 'pointer',
    },
  },
});

function Table1(props) {
  const {
    // eslint-disable-next-line react/prop-types
    classes, data, column, onSelect, onSort, order, orderBy,
  } = props;
  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {
                column.map((Data) => (
                  <TableCell
                    className={classes.header}
                    align={Data.align}
                    sortDirection={orderBy === Data.label ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === Data.label}
                      direction={orderBy === Data.label ? order : 'asc'}
                      onClick={onSort(Data.label)}
                    >
                      {Data.label}
                    </TableSortLabel>
                  </TableCell>
                ))
              }

            </TableRow>
          </TableHead>
          <TableBody>
            {data.trainees.map((element) => (
              <TableRow
                key={element.id}
                className={classes.root}
                onMouseEnter={onSelect(element)}
              >
                {column.map(({ field, align, format }) => (
                  <TableCell align={align}>
                    {format !== undefined
                      ? format(element[field])
                      : element[field]}
                  </TableCell>
                ))}
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
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func,
};

Table1.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: () => {},
};

export default withStyles(useStyles)(Table1);
