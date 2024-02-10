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
import VisitingPassesService from "../service/VisitingPassService";
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
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import dayjs from 'dayjs';
import {userPermissions} from '../layouts/dashboard/config';
import { useRouter } from 'next/router'
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
            name: 'Department Name',
            property: 'DepartmentName'
        },
        {
            name: 'Designation Name',
            property: 'Designation'
        },
        {
            name: 'FullName ',
            property: 'FullName'
        },
        
        {
            name: 'From Date',
            property: 'FromDate'
        },
        {
            name: 'To Date',
            property: 'ToDate'
        },
       
        {
            name: 'Visiting Places Name ',
            property: 'VisitingPlace'
        },
        {
        name:'Status',
        property:'VisitingStatus'
        },
        
        {
            name: 'Approval Status',
            property: 'ApprovalStatus'
        }

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
    const [visitingPlacesList, setVisitingPlacesList] = useState([]);
    const [visitingPasses, setVisitingPasses] = useState({
        //UserId: '',
        DepId: '',
        VisitingPassesId: '',
        VisitingPlacesId: '',
        DesignationId: '',
        FullName: '',
        MobileNumber: '',
        // VisitorPhotoPath: '',
        FromDate: '',
        ToDate: '',
        PurposeVisting: '',
        // VisitingStatus: true,
        // Remarks: '',
    });
    const [validToDate, setValidToDate] = useState('');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const router = useRouter();
    const currentDate = dayjs();
    var [designationId, setDesignationId] = useState("");
    const tomorrow = dayjs().add(3, 'day');
    const validationSchema = Yup.object().shape({
        //UserId: Yup.string().required('User Id is required'),
        DepId: Yup.string().required('Department Id is required'),
        DesignationId: Yup.string().required('Designation Id is required'),
        VisitingPlacesId: Yup.string().required('VisitingPlacesId  is required'),

        FullName: Yup.string().required('Full Name is required'),
        MobileNumber: Yup.string().required()
            .matches(/^[0-9]+$/, "Must be only digits")
            .min(10, 'Must be exactly 10 digits')
            .max(10, 'Must be exactly 10 digits'),

        // VisitorPhotoPath: Yup.string().required('Visitor Photo Path is required'),
        FromDate: Yup.string(),
        ToDate: Yup.string(),
        PurposeVisting: Yup.string().required('Purpose Visting is required'),
        // VisitingStatus: Yup.string(true).required('Visiting Status is required'),
        // Remarks: Yup.string().required('Remarks Status is required'),

    });
    
    useEffect(() => {
        if(!userPermissions(router.asPath)){
            router.push('/unauthorized');
          }
       
       getDepartmentList();
        getVisitingPassesList();
        // getUsersList();
        // getVisitingPlacesList();
        // getDesignationList();
        return () => {
            setVisitingPassesList([]);
            // setUsersList([]);
            setDepartmentList([]);
            // setVisitingPlacesList([]);
            // setDesignationList([]);
        }
    }, []);
    const getDesignationList = () => {
        DesignationsService.getAllDesignations().then((res) => {
            const result = res.map((response) => {
                return {
                    ...response,
                    "status": response.DesignationStatus ? 'Active' : 'Inactive',
                }
            })
            setDesignationList(result);
        }).catch((err) => {
            // setError(err.message);
        });
    }
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
    const editVisitingPasses = (visitingPasses) => {
        setToDate(dayjs(visitingPasses.ToDate))
        setFromDate(dayjs(visitingPasses.FromDate))

        setVisitingPasses(visitingPasses);
        setOpen(true);
    }
    // const deleteVisitingPasses = (visitingPassesdelete) => {
    //     if (visitingPassesdelete) {
    //         VisitingPassesService.deleteVisitingPasses(visitingPassesdelete).then((res) => {
    //             getVisitingPassesList();
    //         }).catch((err) => {
    //         });
    //     }
    // };

   
    const getDepartmentList = () => {
        DepartmentService.getAllDepartment().then((res) => {
            setDepartmentList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getVisitingPassesList = () => {
        
        const filter= {
         "Types":"SelectList",
         "VisitingStatus":"ALL",
        //   "FromDate":dayjs().format("YYYY-MM-DD"),
        //   "ToDate": dayjs().add(3, 'day').format("YYYY-MM-DD"),
           DeptId: (userDetails && userDetails.RoleName !== 'Admin') ? userDetails.Depid : 0,
          
          
          }
        VisitingPassesService.getAllVisitingPassesByDate(filter).then((res) => {
            const result = res.map((response) => {
                return {
                    ...response,
                    "status": response.VisitingPassesStatus ? 'Active' : 'Inactive',
                }
            })
            setVisitingPassesList(result);
        }).catch((err) => {
            // setError(err.message);
        });
    }

    const getQrCodeList = (data) => {
        
        if (data && data.QRCodeNumber) {
            router.push('/qrcode/' + data.QRCodeNumber);
        }
    }
    const formReset = () => {
        setVisitingPasses({
            DepId: userDetails ? userDetails.Depid : '',
            VisitingPassesId: '',
            VisitingPlacesId: '',
            DesignationId: '',
            FullName: '',
            MobileNumber: '',
            //  VisitorAddress: '',
            // VisitorPhotoPath: '',
            FromDate: "",
            ToDate: '',
            PurposeVisting: '',
            // VisitingStatus: true,
            // Remarks: '',
        })
    }

    const accepect =(customer)=>{
        
        updateVisitingPass(customer,'Approved');
    }
    const reject =(customer)=>{
        updateVisitingPass(customer,'Rejected')
    }
    
    const updateVisitingPass =(values,status)=>{
        values.VisitingStatus = status;
        VisitingPassesService.upadeVisitingPasses(values).then((res) => {
           // handleClose();
            getVisitingPassesList();
            alert(" VisitingPasses Updated Successfully.");
            if(res && res.QRCodeNumber && status=="Approved"){
                    router.push('/qrcode/' + res.QRCodeNumber);
            }
        }).catch((err) => {
        });
    }
    const formik = useFormik({
        initialValues: visitingPasses,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            values.UserId = userDetails ? userDetails.UserId : '';
            values.FromDate = fromDate;
            values.ToDate = toDate;
            values.VisitingStatus = status;

            if (!fromDate || !toDate) {
                alert("Please select start date and end date");
                return;
            }
            if (visitingPasses.VisitingPassesId) {
                VisitingPassesService.upadeVisitingPasses(values).then((res) => {
                    handleClose();
                    getVisitingPassesList();
                    resetForm();
                    formReset();
                    alert(" VisitingPasses Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                delete values.VisitingPassesId;
                VisitingPassesService.creteVisitingPasses(values).then((res) => {
                    const data = res.length > 0 ? res[res.length - 1] : null
                    // if (data) {
                    //     getQrCodeList(data);
                    // }
                    getVisitingPassesList();
                    resetForm();
                    formReset();
                    handleClose();
                    alert(" VisitingPasses Added Successfully.");
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
                    Customers | Telangana Assembly
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
                      
                           
                                <Typography variant="h4">
                                DEPT Pass Approval
                                </Typography>
                               
                                    {/* <Grid container spacing={2} columns={12} style={{ margin: 10 }}  >
                                    <Grid item xs={12} sm={6} md={2}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                        <DatePicker 
                                                            id="FromDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="FromDate"
                                                            label="From Date"
                                                            
                                                            onChange={(value) => {

                                                                formik.setFieldValue("date", value, true);
                                                                const dayDifference = value.diff(currentDate, 'day');
                                                                setFromDate(value.format('YYYY-MM-DD'));
                                                                setValidToDate(dayjs().add(dayDifference , 'day'));
                                                            }}
                                                            sx={{ width: 200 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={fromDate}
                                                            />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker 
                                                            
                                                            onChange={(value) => {
                                                                formik.setFieldValue("date", value, true)
                                                                setToDate(value.format('YYYY-MM-DD'));
                                                            }}
                                                            minDate={validToDate}
                                                            id="ToDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="ToDate"
                                                            label="ToDate"
                                                            type="date"
                                                            sx={{ width: 200 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={toDate}
                                                        />

                                                    </LocalizationProvider>


                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                <FormControl variant="standard" style={{width:"200px"}}>
                                                        <InputLabel id="studentName">Department Name</InputLabel>
                                                        <Select
                                                            labelId="Depid"
                                                            id="Depid"
                                                            label="Department Name"
                                                            name="DepId"
                                                            disabled={userDetails?.RoleName === 'Admin' ? false : true}
                                                            value={formik.values.DepId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {departmentList.map(({ index, Depid, DepartmentName }) => (
                                                                <MenuItem key={index} value={Depid}>{DepartmentName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} sm={6} md={3}>
                                                <FormControl variant="standard" style={{width:"200px"}}>
                                                        <InputLabel id="demo-simple-select-standard-label"> Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            label=" Status"
                                                            name="VisitingPassesStatus"
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="Approved">Approved</MenuItem>
                                                            <MenuItem value="Rejected">Rejected</MenuItem>
                                                            <MenuItem value="Pending">Pending</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12}  sm={6} md={1}>
                                    <Button style={{ backgroundColor: 'rgb(48 135 91)', color: 'white' }}
                                        type="button"
                                        onClick={() => onSubmit()} variant="contained"
                                    >
                                        Search</Button>
                                </Grid>
                                                </Grid> */}
                                
                           
                            <div>

                              
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Request Pass</DialogTitle>
                                    <form onSubmit={formik.handleSubmit}  >
                                        <DialogContent style={{ width: 530 }}>
                                            <DialogContentText>

                                            </DialogContentText>

                                            <Grid container spacing={2}>
                                                {/* <Grid xs={6} md={6} >
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">User Id</InputLabel>
                                                        <Select
                                                        autoFocus
                                                            labelId="UserId"
                                                            id="UserId"
                                                            label="User Name"
                                                            name="UserId"
                                                            value={formik.values.UserId}
                                                            // value={roleId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {usersList.map(({ index, UserId, FullName }) => (
                                                                <MenuItem key={index} value={UserId}>{FullName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid> */}
                                                <Grid xs={6} md={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Department Name</InputLabel>
                                                        <Select
                                                            labelId="Depid"
                                                            id="Depid"
                                                            label="Department Name"
                                                            name="DepId"
                                                            disabled={userDetails?.RoleName === 'Admin' ? false : true}
                                                            value={formik.values.DepId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        // onChange={e => { setDepartmentId(e.target.value) }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {departmentList.map(({ index, Depid, DepartmentName }) => (
                                                                <MenuItem key={index} value={Depid}>{DepartmentName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid xs={6} md={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">VisitingPlaces Name</InputLabel>
                                                        <Select
                                                            labelId="VisitingPlacesId"
                                                            id="VisitingPlacesId"
                                                            label="VisitingPlaces Name"
                                                            name="VisitingPlacesId"
                                                            value={formik.values.VisitingPlacesId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        // onChange={e => { setDepartmentId(e.target.value) }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {visitingPlacesList.map(({ index, VisitingPlacesId, VisitingPlace }) => (
                                                                <MenuItem key={index} value={VisitingPlacesId}>{VisitingPlace}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>

                                                <Grid xs={6} md={6}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="FullName"
                                                        name="FullName"
                                                        label="Full Name"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.FullName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.FullName && Boolean(formik.errors.FullName)}
                                                        helperText={formik.touched.FullName && formik.errors.FullName}
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Designation Name</InputLabel>
                                                        <Select
                                                            labelId="DesignationId"
                                                            id="DesignationId"
                                                            label="Designation Name"
                                                            name="DesignationId"
                                                            value={formik.values.DesignationId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        // onChange={e => { setDepartmentId(e.target.value) }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {designationsList.map(({ index, DesignationId, Designation }) => (
                                                                <MenuItem key={index} value={DesignationId}>{Designation}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="MobileNumber"
                                                        name="MobileNumber"
                                                        label="Mobile Number"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.MobileNumber}
                                                        onChange={(e) => {
                                                            formik.handleChange(e);
                                                        }}
                                                        error={formik.touched.MobileNumber && Boolean(formik.errors.MobileNumber)}
                                                        helperText={formik.touched.MobileNumber && formik.errors.MobileNumber}
                                                    />
                                                </Grid>
                                                {/* <Grid xs={6} md={6}>
                                                <TextField
                                                        InputProps={{ style: { width: 245 } }}
                                                        
                                                        margin="dense"
                                                        id="VisitorPhotoPath"
                                                        name="VisitorPhotoPath"
                                                        label="VisitorPhotoPath"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.VisitorPhotoPath}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.VisitorPhotoPath && Boolean(formik.errors.VisitorPhotoPath)}
                                                        helperText={formik.touched.VisitorPhotoPath && formik.errors.VisitorPhotoPath}
                                                    />
                                                </Grid> */}

                                                <Grid xs={6} md={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker InputProps={{ style: { width: 245 } }}
                                                            id="FromDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="FromDate"
                                                            label="From Date"
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
                                                            error={formik.touched.FromDate && Boolean(formik.errors.FromDate)}
                                                            helperText={formik.touched.FromDate && formik.errors.FromDate} />
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DatePicker InputProps={{ style: { width: 245 } }}
                                                            disablePast
                                                            onChange={(value) => {
                                                                formik.setFieldValue("date", value, true)
                                                                setToDate(value.format('YYYY-MM-DD'));
                                                            }}
                                                            minDate={validToDate}
                                                            id="ToDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="ToDate"
                                                            label="ToDate"
                                                            type="date"
                                                            sx={{ width: 250 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={toDate}
                                                            error={formik.touched.ToDate && Boolean(formik.errors.ToDate)}
                                                            helperText={formik.touched.ToDate && formik.errors.ToDate}
                                                        />

                                                    </LocalizationProvider>


                                                </Grid>

                                                <Grid xs={6} md={6}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="PurposeVisting"
                                                        name="PurposeVisting"
                                                        label="PurposeVisting"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.PurposeVisting}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.PurposeVisting && Boolean(formik.errors.PurposeVisting)}
                                                        helperText={formik.touched.PurposeVisting && formik.errors.PurposeVisting}
                                                    />
                                                </Grid>
                                                {/* {!visitingPasses?.VisitingPassesId ? <>
                                                    <Grid xs={4} md={4}>
                                                        <Button variant={status == "Accepted" ? "contained" : "outlined"} type="submit" color='success' onClick={() => setStatus("Accepted")} >Accepted</Button>
                                                    </Grid>
                                                    <Grid xs={4} md={4}>
                                                        <Button variant={status == "Rejected" ? "contained" : "outlined"} type="submit" color='error' onClick={() => setStatus("Rejected")}>Rejected</Button>
                                                    </Grid>
                                                </> : ''} */}

                                                {/* <Grid xs={4} md={4}>
                                                    <Button variant={status == "Cancel" ? "contained" : "outlined"} color='info' onClick={() => { setStatus("Cancel"); handleClose() }}
                                                    >Cancel</Button>
                                                </Grid> */}
                                                {/* <Grid xs={6} md={6}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            label="Visiting Status"
                                                            name="VisitingStatus"
                                                            value={formik.values.VisitingStatus}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.VisitingStatus && Boolean(formik.errors.VisitingStatus)}
                                                            helperText={formik.touched.VisitingStatus && formik.errors.VisitingStatus}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="Approved">Approved</MenuItem>
                                                            <MenuItem value="Rejected">Rejected</MenuItem>
                                                            <MenuItem value="Pending">Pending</MenuItem>

                                                        </Select>
                                                    </FormControl>
                                                </Grid> */}
                                                {/* <Grid xs={6} md={6}>
                                                    <TextField
                                                        InputProps={{ style: { width: 500 } }}
                                                        
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
                                                </Grid> */}




                                                <Grid xs={12} md={12}>

                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit">{visitingPasses.VisitingPassesId ? 'Update' : 'Add'}</Button>

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
                       
                        {/* <CustomersSearch /> */}
                        <CustomersTable
                            headersList={headersList}
                            count={visitingPassesList.length}
                            items={visitingPassesList}
                            editDetails={editVisitingPasses}
                             qrCode={getQrCodeList}
                            onDeselectAll={customersSelection.handleDeselectAll}
                            onDeselectOne={customersSelection.handleDeselectOne}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                            onSelectAll={customersSelection.handleSelectAll}
                            onSelectOne={customersSelection.handleSelectOne}
                            page={page}
                            rowsPerPage={rowsPerPage}
                            selected={customersSelection.selected}
                            reject={reject}
                            accepect={accepect}
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
