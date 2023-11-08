import PropTypes from 'prop-types';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    headersList,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    editDetails,
    page = 0,
    rowsPerPage = 0,
    selected = []
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                {headersList.map((headers, index) => {
                  return  (<TableCell
                    key={index} >
                  {headers.name}
                </TableCell>)
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((customer, index) => {
                // const isSelected = selected.includes();
              //  const createdAt = format(customer.CreateDateTime, 'dd/MM/yyyy');

                return (
                  <TableRow
                    hover
                    key={index}
                    // selected={isSelected}
                  >
                  
                     {headersList.map((headers, index) => {
                      if(headers.property === 'Edit'){
                        return (<TableCell
                          key={index}>
                     <EditIcon style={{ cursor: 'pointer' }} onClick={() => editDetails(customer)} >
                              </EditIcon >
                        </TableCell>);
                      }

                      if(headers.property === 'Delete'){
                        return (<TableCell
                          key={index}>
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteContact(customer)} />

                        </TableCell>);
                      }

                  return  (<TableCell
                    key={index}>
                    
                  {customer[headers.property]}
                </TableCell>);
                })}
                   
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  headersList:PropTypes.array,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array,
  editDepartment:PropTypes.func,
  editRole:PropTypes.func,
  editVisitingPlaces:PropTypes.func,
  editPass:PropTypes.func,
};
