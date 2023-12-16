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
  Typography,
  TableContainer
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = (props) => {
  const userDetails = JSON.parse(window.sessionStorage.getItem('userDetails'));

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
    deleteContact,
    qrCode,
    qrcode,
    page = 0,
    rowsPerPage = 0,
    selected = [],
    accepect,
    reject,
    maxheight = 400
  } = props;

  const selectedSome = (selected.length > 0) && (selected.length < items.length);
  const selectedAll = (items.length > 0) && (selected.length === items.length);
  return (
    <Card>
      <Scrollbar>
        <TableContainer style={{maxHeight:maxheight}}>
        <Box sx={{ minWidth: 800 }}>
          <Table stickyHeader>
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
                    <DeleteIcon style={{ cursor: 'pointer' }} onClick={() => deleteContact(customer)}>
                    </DeleteIcon>
                        </TableCell>);
                      }
                      if(headers.property === 'QrCode'){
                        return (<TableCell
                          key={index}>
                            <DownloadIcon style={{ cursor: 'pointer' }} onClick={() => qrCode(customer)} />
                    {customer.VisitingStatus==='Approved'?<DownloadIcon style={{ cursor: 'pointer' }} onClick={() => qrCode(customer)} />:'Not Avilable'}

                        </TableCell>);
                      }
                      if(headers.property === 'ApprovalStatus'){

                        if(customer.VisitingStatus === 'Pending' && userDetails && (userDetails.RoleName ==='Admin' || userDetails.RoleName ==='Approver')){
                          return (<TableCell
                            key={index}>
                            <><CheckIcon style={{ cursor: 'pointer',color:'green' }} onClick={() => accepect(customer)} />  <CloseIcon style={{ cursor: 'pointer',color:'red' }} onClick={() => reject(customer)} /></> 
  
                          </TableCell>);
                        }
                        if(customer.VisitingStatus === 'Approved'){

                        return (<TableCell
                          key={index}>
                           <DownloadIcon style={{ cursor: 'pointer' }} onClick={() => qrCode(customer)} />
                        </TableCell>);
                        }
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
        </TableContainer>
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
  editMinister:PropTypes.func,
  deleteMinister:PropTypes.func,
  editVisitingPlaces:PropTypes.func,
  editPass:PropTypes.func,
  editDesignations:PropTypes.func,
  editUsers:PropTypes.func,
  editVisitingPasses:PropTypes.func,
  editSession:PropTypes.func,
  getQrCodeList:PropTypes.func,
};
