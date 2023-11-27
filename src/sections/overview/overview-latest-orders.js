import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { useEffect } from 'react';
import {  useState } from 'react';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';
import VisitingPassesService from "../../service/VisitingPassService";
const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const OverviewLatestOrders = (props) => {
  // const { orders = [], sx } = props;
  const [orders, setOrders] = useState([]);
  const [visitingPassesList, setVisitingPassesList] = useState([]);
  useEffect(() => {
    getVisitingPassesList();
    return () => {
        setVisitingPassesList([]);
        setOrders([]);
    }
}, []);

  const getVisitingPassesList = () => {
    VisitingPassesService.getAllVisitingPasses().then((res) => {
     
        setVisitingPassesList(res);
    }).catch((err) => {
        // setError(err.message);
    });
}
  return (
    <Card >
      <CardHeader title="Visiting Passes" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                VISITING PASSESID
                </TableCell>
                <TableCell>
                FULLNAME
                </TableCell>
                
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {visitingPassesList.map((order) => {
                return (
                  <TableRow
                    hover
                    key={order._id}
                  >
                    <TableCell>
                      {order.VisitingPassesId}
                    </TableCell>
                    <TableCell>
                      {order.FullName}
                    </TableCell>
                   
                    <TableCell>
                      <SeverityPill color={statusMap[order.VisitingStatus]}>
                        {order.VisitingStatus}
                      </SeverityPill>
                    </TableCell>
                  </TableRow>
                );
                
              })}
               
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <Divider />
      {/* <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions> */}
    </Card>
  );
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
