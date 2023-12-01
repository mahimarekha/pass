import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import * as React from 'react';
import * as Yup from 'yup';
import { subDays, subHours } from 'date-fns';
import ArrowDownOnSquareIcon from '@heroicons/react/24/solid/ArrowDownOnSquareIcon';
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon';
import PlusIcon from '@heroicons/react/24/solid/PlusIcon';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import VisitingPlacesService from "../service/VsitingPlaces";
import DesignationsService from "../service/DesignationsService";
import DepartmentService from "../service/DepartmentService";
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import UsersService from "../service/UsersService";
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import SessionService from "../service/SessionService";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useRouter } from 'next/navigation';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import dayjs from 'dayjs';

const now = new Date();
const data = [
    {
        id: '5e887ac47eed253091be10cb',
        address: {
            city: 'Cleveland',
            country: 'USA',
            state: 'Ohio',
            street: '2849 Fulton Street'
        },
        avatar: '/assets/avatars/avatar-carson-darrin.png',
        createdAt: subDays(subHours(now, 7), 1).getTime(),
        email: 'carson.darrin@devias.io',
        name: 'Carson Darrin',
        phone: '304-428-3097'
    },
    {
        id: '5e887b209c28ac3dd97f6db5',
        address: {
            city: 'Atlanta',
            country: 'USA',
            state: 'Georgia',
            street: '1865  Pleasant Hill Road'
        },
        avatar: '/assets/avatars/avatar-fran-perez.png',
        createdAt: subDays(subHours(now, 1), 2).getTime(),
        email: 'fran.perez@devias.io',
        name: 'Fran Perez',
        phone: '712-351-5711'
    },
    {
        id: '5e887b7602bdbc4dbb234b27',
        address: {
            city: 'North Canton',
            country: 'USA',
            state: 'Ohio',
            street: '4894  Lakeland Park Drive'
        },
        avatar: '/assets/avatars/avatar-jie-yan-song.png',
        createdAt: subDays(subHours(now, 4), 2).getTime(),
        email: 'jie.yan.song@devias.io',
        name: 'Jie Yan Song',
        phone: '770-635-2682'
    },
    {
        id: '5e86809283e28b96d2d38537',
        address: {
            city: 'Madrid',
            country: 'Spain',
            name: 'Anika Visser',
            street: '4158  Hedge Street'
        },
        avatar: '/assets/avatars/avatar-anika-visser.png',
        createdAt: subDays(subHours(now, 11), 2).getTime(),
        email: 'anika.visser@devias.io',
        name: 'Anika Visser',
        phone: '908-691-3242'
    },
    {
        id: '5e86805e2bafd54f66cc95c3',
        address: {
            city: 'San Diego',
            country: 'USA',
            state: 'California',
            street: '75247'
        },
        avatar: '/assets/avatars/avatar-miron-vitold.png',
        createdAt: subDays(subHours(now, 7), 3).getTime(),
        email: 'miron.vitold@devias.io',
        name: 'Miron Vitold',
        phone: '972-333-4106'
    },
    {
        id: '5e887a1fbefd7938eea9c981',
        address: {
            city: 'Berkeley',
            country: 'USA',
            state: 'California',
            street: '317 Angus Road'
        },
        avatar: '/assets/avatars/avatar-penjani-inyene.png',
        createdAt: subDays(subHours(now, 5), 4).getTime(),
        email: 'penjani.inyene@devias.io',
        name: 'Penjani Inyene',
        phone: '858-602-3409'
    },
    {
        id: '5e887d0b3d090c1b8f162003',
        address: {
            city: 'Carson City',
            country: 'USA',
            state: 'Nevada',
            street: '2188  Armbrester Drive'
        },
        avatar: '/assets/avatars/avatar-omar-darboe.png',
        createdAt: subDays(subHours(now, 15), 4).getTime(),
        email: 'omar.darobe@devias.io',
        name: 'Omar Darobe',
        phone: '415-907-2647'
    },
    {
        id: '5e88792be2d4cfb4bf0971d9',
        address: {
            city: 'Los Angeles',
            country: 'USA',
            state: 'California',
            street: '1798  Hickory Ridge Drive'
        },
        avatar: '/assets/avatars/avatar-siegbert-gottfried.png',
        createdAt: subDays(subHours(now, 2), 5).getTime(),
        email: 'siegbert.gottfried@devias.io',
        name: 'Siegbert Gottfried',
        phone: '702-661-1654'
    },
    {
        id: '5e8877da9a65442b11551975',
        address: {
            city: 'Murray',
            country: 'USA',
            state: 'Utah',
            street: '3934  Wildrose Lane'
        },
        avatar: '/assets/avatars/avatar-iulia-albu.png',
        createdAt: subDays(subHours(now, 8), 6).getTime(),
        email: 'iulia.albu@devias.io',
        name: 'Iulia Albu',
        phone: '313-812-8947'
    },
    {
        id: '5e8680e60cba5019c5ca6fda',
        address: {
            city: 'Salt Lake City',
            country: 'USA',
            state: 'Utah',
            street: '368 Lamberts Branch Road'
        },
        avatar: '/assets/avatars/avatar-nasimiyu-danai.png',
        createdAt: subDays(subHours(now, 1), 9).getTime(),
        email: 'nasimiyu.danai@devias.io',
        name: 'Nasimiyu Danai',
        phone: '801-301-7894'
    }
];
const useCustomers = (page, rowsPerPage) => {
    return useMemo(
        () => {
            return applyPagination(data, page, rowsPerPage);
        },
        [page, rowsPerPage]
    );
};
const useCustomerIds = (customers) => {
    return useMemo(
        () => {
            return customers.map((customer) => customer.id);
        },
        [customers]
    );
};
const Page = (props) => {
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);
    const [getQR, setQR] = React.useState('');
    const headersList = [
        
        {
            name: 'Session StartDate',
            property: 'SessionStartDate'
        },
        {
            name: 'Remarks',
            property: 'Remarks'
        },
        {
            name: 'Edit',
            property: 'Edit'
        },

    ];
    const userDetails = JSON.parse(window.sessionStorage.getItem('userDetails'));
    const [designationsList, setDesignationList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const [usersList, setUsersList] = useState([]);
    var [departmentId, setDepartmentId] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [visitingPassesList, setVisitingPassesList] = useState([]);
    const [qrCodeList, setQrCodeList] = useState([]);
    const [status, setStatus] = useState([]);
    const [sessionList, setSessionList] = useState([]);
    const [session, setSession] = useState({
        SessionID: '',
        SessionStartDate:'',
        Remarks: '',
    });
    const [fromDate, setFromDate] = useState('');
    const [validToDate, setValidToDate] = useState('');
    const [toDate, setToDate] = useState('');
    const router = useRouter();
    const currentDate = dayjs();
    var [designationId, setDesignationId] = useState("");
    const tomorrow = dayjs().add(3, 'day');
    const validationSchema = Yup.object().shape({
        //UserId: Yup.string().required('User Id is required'),
        SessionStartDate: Yup.string(),
        Remarks: Yup.string().required('Remarks is required'),
    });
    useEffect(() => {
        getSessionList();
        return () => {
            setSessionList([]);
        }
    }, []);
  
    const handleClickOpen = () => {
        setOpen(true);
        formReset();
        setStatus("");
        setFromDate("");
        setToDate("");
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseQR = () => {
        setOpenQR(false);
    };
    const customersSelection = useSelection(customersIds);
    const handlePageChange = useCallback(
        (event, value) => {
            setPage(value);
        },
        []
    );
    const handleRowsPerPageChange = useCallback(
        (event) => {
            setRowsPerPage(event.target.value);
        },
        []
    );
    const editSession = (session) => {
        setFromDate(dayjs(session.SessionStartDate))
        setSession(session);
        setOpen(true);
    }
    const getSessionList = () => {
        SessionService.getAllSession().then((res) => {
            setSessionList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const formReset = () => {
        setSession({
            SessionID: '',
            SessionStartDate:'',
            Remarks: '',
        })
    }
    const formik = useFormik({
        initialValues: session,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            // values.UserId = userDetails ? userDetails.UserId : '';
            values.SessionStartDate = fromDate;
            // values.ToDate = toDate;
            // values.VisitingStatus = status;

            if (!fromDate) {
                alert("Please select session start date ");
                return;
            }
            if (session.SessionID) {
                SessionService.upadeSession(values).then((res) => {
                    handleClose();
                    getSessionList();
                    resetForm();
                    formReset();
                    alert(" Session Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                delete values.SessionID;
                SessionService.creteSession(values).then((res) => {
                    const data = res.length > 0 ? res[res.length - 1] : null
                    // if (data) {
                    //     getQrCodeList(data);
                    // }
                    getSessionList();
                    resetForm();
                    formReset();
                    handleClose();
                    alert(" Session Added Successfully.");
                    // props.history.push('/app/vendor');
                })
                    .catch((err) => {

                        alert(err)
                    })
            }
        },
    });

    return (
        <>
            <Head>
                <title>
                    Customers | Devias Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Sessions
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowUpOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Import
                                    </Button>
                                    <Button
                                        color="inherit"
                                        startIcon={(
                                            <SvgIcon fontSize="small">
                                                <ArrowDownOnSquareIcon />
                                            </SvgIcon>
                                        )}
                                    >
                                        Export
                                    </Button>
                                </Stack>
                            </Stack>
                            <div>

                                <Button
                                    startIcon={(
                                        <SvgIcon fontSize="small">
                                            <PlusIcon />
                                        </SvgIcon>
                                    )}
                                    variant="contained" onClick={handleClickOpen}
                                >
                                   Add

                                </Button>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Add</DialogTitle>
                                    <form onSubmit={formik.handleSubmit}  >
                                        <DialogContent style={{ width: 400 }}>
                                            <DialogContentText>

                                            </DialogContentText>

                                            <Grid container spacing={2}>
                                               
                                               
                                               

                                                <Grid xs={12} md={12}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker InputProps={{ style: { width: 245 } }}
                                                            id="SessionStartDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="SessionStartDate"
                                                            label="Session StartDate"
                                                            disablePast
                                                            onChange={(value) => {

                                                                formik.setFieldValue("date", value, true);
                                                                const dayDifference = value.diff(currentDate, 'day');
                                                                setFromDate(value.format('YYYY-MM-DD'));
                                                                setValidToDate(dayjs().add(dayDifference + 1, 'day'));
                                                            }}
                                                            sx={{ width: 250 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={fromDate}
                                                            error={formik.touched.SessionStartDate && Boolean(formik.errors.SessionStartDate)}
                                                            helperText={formik.touched.SessionStartDate && formik.errors.SessionStartDate} />
                                                    </LocalizationProvider>
                                                </Grid>
                                                

                                                <Grid xs={12} md={12}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="Remarks"
                                                        name="Remarks"
                                                        label="Remarks"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.Remarks}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.Remarks && Boolean(formik.errors.Remarks)}
                                                        helperText={formik.touched.Remarks && formik.errors.Remarks}
                                                    />
                                                </Grid>
                                               
                                                <Grid xs={12} md={12}>

                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit">{session.SessionID ? 'Update' : 'Add'}</Button>

                                                </Grid>

                                            </Grid>


                                        </DialogContent>
                                    </form>
                                </Dialog>

                                <Dialog open={openQR} onClose={handleCloseQR}>
                                    <DialogTitle>Scan QR code</DialogTitle>
                                    <DialogContent >
                                        <DialogContentText>

                                        </DialogContentText>

                                        <Grid container spacing={2}>
                                            <img src={getQR} alt='qrcode' />

                                            visitingPassesList.FullName

                                            <Grid xs={12} md={12}>

                                                <Button onClick={handleCloseQR}>Close</Button>

                                            </Grid>

                                        </Grid>


                                    </DialogContent>


                                </Dialog>
                            </div>
                        </Stack>
                        {/* <CustomersSearch /> */}
                        <CustomersTable
                            headersList={headersList}
                            count={sessionList.length}
                            items={sessionList}
                            editDetails={editSession}
                            // qrCode={getQrCodeList}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                        />
                    </Stack>
                </Container>
            </Box>
        </>
    );
};


Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
