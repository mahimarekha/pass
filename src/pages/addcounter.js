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
import SessionService from "../service/SessionService";
import MinisterService from "../service/ministerService";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { useRouter } from 'next/navigation';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2

import { userPermissions } from '../layouts/dashboard/config';
import { useRouter } from 'next/router'
import Webcam from "react-webcam";
import { useRef } from "react";
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
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
    const [open1, setOpen1] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);
    const [getQR, setQR] = React.useState('');
    const [multipleRequest, setMultipleRequest] = useState([]);

    const dataAddheadersList = [


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
    const [visitingPlacesList, setVisitingPlacesList] = useState([]);
    const [ministerList, setMinisterList] = useState([]);
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);

    const [docSrc, setDocSrc] = useState(null);
    const [mirrored, setMirrored] = useState(false);
    const [visitingPasses, setVisitingPasses] = useState({
        //UserId: '',
        // DepId: '',
        VisitingPassesId: '',
        VisitingPlacesId: '',
        // DesignationId: '',
        FullName: '',
        MobileNumber: '',
        // VisitorPhotoPath: '',
        FromDate: '',
        ToDate: '',
        PurposeVisting: '',
        // VisitingStatus: true,
        // Remarks: '',
        SessionId: '',
    });
    const [validToDate, setValidToDate] = useState('');
    // const [fromDate, setFromDate] = useState('');
    const current = dayjs().format('YYYY-MM-DDTHH:mm:ss');

    const [fromDate, setFromDate] = useState(dayjs(current));
    const [toDate, setToDate] = useState(dayjs(current));
    const [isShowMinister, setIsShowMinister] = useState(false);
    const router = useRouter();
    const currentDate = dayjs();
    const tomorrow = dayjs().add(3, 'day');
    const validationSchema = Yup.object().shape({
        //UserId: Yup.string().required('User Id is required'),
        // DepId: Yup.string().required('Department Id is required'),
        // DesignationId: Yup.string().required('Designation Id is required'),
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
        SessionId: Yup.string(),
    });

    useEffect(() => {
        // if (!userPermissions(router.asPath)) {
        //     router.push('/unauthorized');
        // }
        getDepartmentList();
        getSessionList();
        getVisitingPassesList();
        getUsersList();
        getVisitingPlacesList();
        getDesignationList();
        getMinisterList();
        return () => {
            setVisitingPassesList([]);
            setUsersList([]);
            setDepartmentList([]);
            setMinisterList([]);
            setVisitingPlacesList([]);
            setDesignationList([]);
            setSessionList([]);
        }
    }, []);
    const handleRedirect = () => {

        props.history.push("/addcounter")
    };
    const capture = useCallback(() => {
        retake();
        //setImgSrc(null);
        const imageSrc = webcamRef.current.getScreenshot();
        console.log(imageSrc);
        setOpen1(false);
        setImgSrc(imageSrc);
    }, [webcamRef]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the base64 image in the state
                setImgSrc(reader.result);
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };

    const handleDocumentUpload = (e) => {
        const file = e.target.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                // Set the base64 image in the state
                setDocSrc(reader.result);
            };

            // Read the file as a data URL
            reader.readAsDataURL(file);
        }
    };
    const retake = () => {
        setImgSrc(null);
    };
    const getSessionList = () => {
        SessionService.GetLatestSessionFrom().then((res) => {
            if (res) {
                setSessionList([res]);
                visitingPasses.SessionId = res.Sno;
                setVisitingPasses(visitingPasses);
                // setMultipleRequest(prvvisitingPasses => [...prvArray, values]);

            }

        }).catch((err) => {
            // setError(err.message);
        });
    }
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
        setFromDate('');
        setToDate('');
    };
    const handleClickOpen1 = () => {
        setOpen1(true);
    };
    const handleClickclose1 = () => {
        setOpen1(false);
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

    const getUsersList = () => {
        UsersService.getAllUsers().then((res) => {
            setUsersList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getDepartmentList = () => {
        DepartmentService.getAllDepartment().then((res) => {
            setDepartmentList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getVisitingPlacesList = () => {
        VisitingPlacesService.getAllVisitingPlaces().then((res) => {
            setVisitingPlacesList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getMinisterList = () => {
        MinisterService.getAllMinister().then((res) => {
            setMinisterList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getVisitingPassesList = () => {
        VisitingPassesService.getAllVisitingPasses().then((res) => {
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

    const getQrCodeList = (id) => {
        if (id) {
            router.push('/photoqrcode/' + id);
        }
    }
    const formReset = () => {
        setVisitingPasses({
            // DepId: userDetails ? userDetails.Depid : '',
            VisitingPassesId: '',
            VisitingPlacesId: '',
            // DesignationId: '',
            FullName: '',
            MobileNumber: '',
            //  VisitorAddress: '',
            // VisitorPhotoPath: '',
            FromDate: "",
            ToDate: '',
            PurposeVisting: '',
            // VisitingStatus: true,
            // Remarks: '',
            SessionId: '',
        })
    }
    const formik = useFormik({
        initialValues: visitingPasses,
        enableReinitialize: true,
        validationSchema: validationSchema,

        onSubmit: (values, { resetForm }) => {
            const result = departmentList.find(({ DepartmentName }) => DepartmentName === "Counter Pass");
            values.UserId = userDetails ? userDetails.UserId : '';
            

            values.FromDate = typeof fromDate === 'string' ? fromDate:dayjs(fromDate).format('YYYY-MM-DDTHH:mm:ss');
            values.ToDate = typeof toDate === 'string' ? toDate:dayjs(toDate).format('YYYY-MM-DDTHH:mm:ss'); ;
            // values.VisitingStatus = status;
            values.CreatedBy = userDetails ? userDetails.UserId : '';
            values.DepId = result.Depid;
            values.VisitorPhotoPath = imgSrc ? imgSrc : '';
            values.UploadPath = docSrc ? docSrc : '';
            if (!fromDate) {
                alert("Please select  date ");
                return;
            }
            if (visitingPasses.VisitingPassesId) {
                VisitingPassesService.upadeVisitingPasses(values).then((res) => {
                    handleClose();
                    getVisitingPassesList();
                    resetForm();
                    formReset();
                    alert(" Counter Pass Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                delete values.VisitingPassesId;
                setMultipleRequest(prvArray => [...prvArray, values]);
            }
        },
    });
    const multiple = () => {
        if (!multipleRequest.length) {
            alert("Please Enter Required Details");
            return;
        }
        const currentTimeInMilliseconds = new Date().getTime();
        const updatedRequests = multipleRequest.map(result => ({
            ...result,
            BatchId: currentTimeInMilliseconds.toString()
        }));

        VisitingPassesService.cretePostVisitingPasses(updatedRequests).then((res) => {
            const data = res.length > 0 ? res[res.length - 1] : null
            setMultipleRequest([]);
            getVisitingPassesList();
            formik.resetForm()
            formReset();
            handleClose();
            setImgSrc('');
            getQrCodeList(currentTimeInMilliseconds);
            // getQrCodeList(res.QRCodeNumber);
            alert("Counter Pass Added Successfully.");

        })
            .catch((err) => {

                alert(err)
            })
    };
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
                    py: 1
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={2}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h5">
                                    Add Counter Pass
                                </Typography>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={1}
                                >
                                    <form onSubmit={formik.handleSubmit}  >
                                        <DialogContent >


                                            <Grid container spacing={2}>
                                                <Grid xs={6} md={3}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">VisitingPlaces Id</InputLabel>
                                                        <Select
                                                            labelId="VisitingPlacesId"
                                                            id="VisitingPlacesId"
                                                            label="VisitingPlaces Id"
                                                            name="VisitingPlacesId"

                                                            value={formik.values.VisitingPlacesId}
                                                            onChange={e => 
                                                                
                                                                { 
                                                                    const minister=e.target.value===1007  ? true : false;         
                                                                    formik.handleChange(e); setIsShowMinister(minister) }}
                                                            
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
                                                {isShowMinister ?
                                                 <Grid xs={6} md={3}>
                                                 <FormControl variant="standard" fullWidth>
                                                     <InputLabel id="studentName">Minister Name</InputLabel>
                                                     <Select
                                                         labelId="ministerId"
                                                         id="ministerId"
                                                         label="Minister Name"
                                                         name="ministerId"
                                                         value={formik.values.ministerId}
                                                         onChange={e => 
                                                             {
                                                                 formik.handleChange(e); }}
                                                         //  onChange={e => { formik.setMinister(e); }}
                                                     // onChange={e => { setDepartmentId(e.target.value) }}
                                                     >
                                                         <MenuItem value="">
                                                             <em>None</em>
                                                         </MenuItem>
                                                         {ministerList.map(({ index, MinID, MinisterName }) => (
                                                             <MenuItem key={index} value={MinID}>{MinisterName}
                                                             </MenuItem>
                                                         ))}
                                                     </Select>
                                                 </FormControl>
                                             </Grid>
                                             :"" }
                                               
                                                <Grid xs={6} md={3}>
                                                    <TextField
                                                        InputProps={{ style: { width: 235 } }}

                                                        margin="dense"
                                                        id="FullName"
                                                        name="FullName"
                                                        label="Visitor Name"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.FullName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.FullName && Boolean(formik.errors.FullName)}
                                                        helperText={formik.touched.FullName && formik.errors.FullName}
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={3}>
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
                                                <Grid xs={6} md={3}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Session Name</InputLabel>
                                                        <Select
                                                            labelId="SessionId"
                                                            id="SessionId"
                                                            label="Session Name"
                                                            name="SessionId" 
                                                            value={formik.values.SessionId}
                                                            onChange={e => { formik.handleChange(e); }}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {sessionList.map(({ index, Remarks, Sno ,SessionID}) => (
                                                                <MenuItem key={index} value={Sno}>{Remarks}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={6} md={3} style={{marginTop:"30px"}}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs} >
                                                        <DateTimePicker  InputProps={{ style: { width: 230 } }}
                                                            id="FromDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="FromDate"
                                                            label="From Date"
                                                            disablePast
                                                            onChange={(value) => {
                                                               formik.setFieldValue("date", value, true);
                                                                const dayDifference = value.diff(currentDate, 'day');
                                                                setFromDate(value.format('YYYY-MM-DDTHH:mm:ss'));
                                                                setValidToDate(dayjs().add(dayDifference, 'day'));
                                                            }}
                                                            sx={{ width: 230 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={fromDate}
                                                            //   value={value}
                                                            //   onChange={handleChange}
                                                            renderInput={(params) => <TextField {...params} />}
                                                        />
                                                        {/* <DatePicker defaultValue={dayjs(new Date())} /> */}
                                                        {/* <DatePicker InputProps={{ style: { width: 245 } }}
                                                            id="FromDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="FromDate"
                                                            label="From Date"
                                                            disablePast
                                                            onChange={(value) => {

                                                                formik.setFieldValue("date", value, true);
                                                                const dayDifference = value.diff(currentDate, 'day');
                                                                setFromDate(value.format('YYYY-MM-DD'));
                                                                setValidToDate(dayjs().add(dayDifference, 'day'));
                                                            }}
                                                            sx={{ width: 250 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={fromDate}
                                                            error={formik.touched.FromDate && Boolean(formik.errors.FromDate)}
                                                            helperText={formik.touched.FromDate && formik.errors.FromDate} /> */}
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid xs={6} md={3} style={{marginTop:"30px"}}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DateTimePicker InputProps={{ style: { width: 230 } }}
                                                            disablePast
                                                            onChange={(value) => {
                                                                formik.setFieldValue("date", value, true)
                                                                setToDate(value.format('YYYY-MM-DDTHH:mm:ss'));
                                                            }}
                                                            minDate={validToDate}
                                                            id="ToDate"
                                                            slotProps={{ textField: { size: "small", error: false } }}
                                                            name="ToDate"
                                                            label="ToDate"
                                                            type="date"
                                                            sx={{ width: 230 }}
                                                            InputLabelProps={{
                                                                shrink: true,
                                                            }}
                                                            value={toDate}
                                                            error={formik.touched.ToDate && Boolean(formik.errors.ToDate)}
                                                            helperText={formik.touched.ToDate && formik.errors.ToDate}
                                                        />

                                                    </LocalizationProvider>


                                                </Grid>
                                                <Grid xs={6} md={3} style={{marginTop:"30px"}}>
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
                                                <Grid item xs={12} style={{ marginTop: '10px' }}>
                                                    <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Referenced By :</span>
                                                </Grid>
                                                <Grid xs={6} md={4}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="FirstName"
                                                        name="FirstName"
                                                        label="Name"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.FirstName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.FirstName && Boolean(formik.errors.FirstName)}
                                                        helperText={formik.touched.FirstName && formik.errors.FirstName}
                                                    />
                                                </Grid>
                                                {/* <Grid xs={6} md={4}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="MiddleName"
                                                        name="MiddleName"
                                                        label="Designation"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.MiddleName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.MiddleName && Boolean(formik.errors.MiddleName)}
                                                        helperText={formik.touched.MiddleName && formik.errors.MiddleName}
                                                    />
                                                </Grid>
                                                <Grid xs={6} md={4}>
                                                    <TextField
                                                        InputProps={{ style: { width: 245 } }}

                                                        margin="dense"
                                                        id="LastName"
                                                        name="LastName"
                                                        label="Department"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.LastName}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.LastName && Boolean(formik.errors.LastName)}
                                                        helperText={formik.touched.LastName && formik.errors.LastName}
                                                    />
                                                </Grid> */}
                                                <Grid item xs={12} style={{ marginTop: '10px' }}>
                                                    <span style={{ fontSize: '17px', color: 'rgb(16 182 128)' }} >Doc Upload :</span>
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <label style={{ fontSize: '15px', color: 'black' }} >Upload Photo</label>
                                                    <div>
                                                        {imgSrc ? (
                                                            <img src={imgSrc} alt="webcam" height={100} width={100} />
                                                        ) : ''
                                                        }
                                                    </div>
                                                    <Button variant="contained" onClick={handleClickOpen1}>Capture From WebCam</Button>  OR
                                                  
                                                    <input type="file" style={{ "display": "inline-block", "padding": "10px 20px", "backgroundColor": "#6366F1", "color": "#fff", "border": "none", "borderRadius": "12px", "cursor": "pointer","width":"230px" }} onChange={handleImageUpload} />
                                                   
                                                </Grid>
                                                <Grid xs={6} md={6}>
                                                    <label style={{ fontSize: '15px', color: 'black' }} >Upload Document</label>
                                                    <div>
                                                        <input type="file" name="name" style={{ "display": "inline-block", "width": "245px", "padding": "10px 20px", "backgroundColor": "#6366F1", "color": "#fff", "border": "none", "borderRadius": "12px", "cursor": "pointer" }} onChange={handleDocumentUpload} />

                                                    </div>
                                                </Grid>

                                                <Dialog open={open1} onClose={handleClose} PaperProps={{
                                                    sx: {
                                                        height: '400'
                                                    }
                                                }} maxWidth="500">
                                                    <div className="container">
                                                        {imgSrc ? (
                                                            <img src={imgSrc} height={400} width={500} alt="webcam" />
                                                        ) : (
                                                            <Webcam height={400} width={500} ref={webcamRef} mirrored={mirrored} screenshotFormat="image/jpeg"
                                                                screenshotQuality={0.8} />
                                                        )}
                                                        {/* <div className="controls">
                                                            <div>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={mirrored}
                                                                    onChange={(e) => setMirrored(e.target.checked)}
                                                                />
                                                                <label>Mirror</label>
                                                            </div>
                                                        </div> */}
                                                        <div className="btn-container" style={{ marginTop: '10px', textAlign: 'center', 'marginBottom': '10px' }}>
                                                            <Button variant="contained" color='error' onClick={handleClickclose1} style={{ marginRight: '5px' }}>Cancel</Button>

                                                            {imgSrc ? (
                                                                <Button variant="contained" onClick={retake}>Retake photo</Button>
                                                            ) : (
                                                                <Button variant="contained" onClick={capture}>Capture photo</Button>
                                                            )}

                                                        </div>
                                                    </div>

                                                </Dialog>

                                               
                                                {/* <Grid xs={12} md={12}>
                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit">{visitingPasses.VisitingPassesId ? 'Update' : 'Add'}</Button>
                                                </Grid> */}
                                                <Grid xs={12} md={12} style={{ textAlign: 'end' }}>
                                                    {visitingPasses.VisitingPassesId ? <Button onClick={handleClose} style={{ marginRight: '10px' }} variant="contained" color="error">Cancel</Button> : ''}


                                                    <Button variant="contained" type="submit">{visitingPasses.VisitingPassesId ? 'Update' : 'Add More'}</Button>

                                                </Grid>
                                            </Grid>
                                            {visitingPasses.VisitingPassesId ? '' : <div>
                                                <CustomersTable
                                                    headersList={dataAddheadersList}
                                                    count={multipleRequest.length}
                                                    items={multipleRequest}
                                                    editDetails={editVisitingPasses}
                                                    // qrCode={getQrCodeList}
                                                    onDeselectAll={customersSelection.handleDeselectAll}
                                                    onDeselectOne={customersSelection.handleDeselectOne}
                                                    onPageChange={handlePageChange}
                                                    onRowsPerPageChange={handleRowsPerPageChange}
                                                    onSelectAll={customersSelection.handleSelectAll}
                                                    onSelectOne={customersSelection.handleSelectOne}
                                                    page={page}
                                                    maxheight={150}
                                                    rowsPerPage={rowsPerPage}
                                                    selected={customersSelection.selected}
                                                />  <DialogActions >

                                                    <Button onClick={handleClose} variant="contained" color="error">Cancel</Button>
                                                    <Button onClick={multiple} variant="contained" color="success">Save</Button>


                                                </DialogActions>
                                            </div>}
                                        </DialogContent>
                                    </form>
                                </Stack>
                            </Stack>
                            <div>



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
