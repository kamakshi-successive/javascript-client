import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
  TableSortLabel, TablePagination, IconButton,
} from '@material-ui/core';
import { hoc } from '../HOC';

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

function TableComponent(props) {
  const {
    classes, data, column, order, orderBy, onSort, onSelect, count, page, actions,
    rowsPerPage, onChangePage, onChangeRowsPerPage,
  } = props;
  // eslint-disable-next-line no-console
  console.log('Tables', data);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {column.map((Data) => (
              <TableCell
                className={classes.header}
                align={Data.align}
                sortDirection={orderBy === Data.field ? order : false}
              >
                <TableSortLabel
                  active={orderBy === Data.field}
                  direction={orderBy === Data.field ? order : 'asc'}
                  onClick={onSort(Data.field)}
                >
                  {Data.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((element) => (
              <TableRow
                key={element.id}
                className={classes.root}
                onMouseEnter={onSelect(element)}
              >
                {column.map(({ field, align }) => (
                  <TableCell align={align}>
                    {/* {format !== undefined
                      ? format(element[field]) */}
                    {element[field]}
                  </TableCell>
                ))}
                {actions.map(({ icon, handler }) => (
                  <IconButton onClick={handler(element)} className={classes.action}>
                    {icon}
                  </IconButton>
                ))}
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        rowsPerPageOptions={0}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={onChangePage}
        onChangeRowsPerPage={onChangeRowsPerPage}
      />
    </TableContainer>
  );
}
TableComponent.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  column: PropTypes.arrayOf(PropTypes.object).isRequired,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  onSort: PropTypes.func,
  actions: PropTypes.arrayOf(PropTypes.object).isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChangeRowsPerPage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
  order: 'asc',
  orderBy: '',
  onSort: () => {},
};
export default withStyles(useStyles)(hoc(TableComponent));
