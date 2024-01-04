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
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { CustomersTable } from 'src/sections/customer/customers-table';
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import UsersService from "../service/UsersService";
import RoleService from "../service/RoleService";
import DepartmentService from "../service/DepartmentService";
import DesignationsService from "../service/DesignationsService";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { useRouter } from 'next/router'
import {userPermissions} from '../layouts/dashboard/config';
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

const Page = () => {
    const userDetails = JSON.parse(window.sessionStorage.getItem('userDetails'));
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const headersList = [{
        name: 'Full Name',
        property: 'FullName'
    },
    {

        name: 'Mobile No.',
        property: 'MobileNo'
    },
    {
        name: 'Email Id',
        property: 'EmailId'
    },
    {
        name: 'Role',
        property: 'RoleName'
    },
    {
        name: 'Dep',
        property: 'DepartmentName'
    },
    {
        name: 'Designation',
        property: 'Designation'
    },
    {
        name: 'User Status',
        property: 'status'
    },
    {
        name: 'Edit',
        property: 'Edit'
    },
    {
        name: 'Delete',
        property: 'Delete'
    },
    ];
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const [usersList, setUsersList] = useState([]);
    const [users, setUsers] = useState({
        FullName: '',
        MobileNo: '',
        EmailId: '',
        RoleId: '',
        Depid: '',
        DesignationId: '',
        UserStatus: true,
        UserId:'',
    });
    var [roleId, setRoleId] = useState("");
    const [roleList, setRoleList] = useState([]);
    var [departmentId, setDepartmentId] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    var [designationId, setDesignationId] = useState("");
    const [designationList, setDesignationList] = useState([]);
    const validationSchema = Yup.object().shape({
        FullName: Yup.string().required('FullName is required'),
        MobileNo: Yup.string().required()
        .matches(/^[0-9]+$/, "Must be only digits")
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
        EmailId: Yup.string().required('Email is required'),
        RoleId: Yup.string().required('Role Id is required'),
        Depid: Yup.string().required('Department Id is required'),
        DesignationId: Yup.string().required('Designation Id is required'),
        UserStatus: Yup.string(true).required('User Status is required'),
    });
    const router = useRouter();
    useEffect(() => {
        if(!userPermissions(router.asPath)){
            router.push('/unauthorized');
          }
        getRoleList();
        getDepartmentList();
        getDesignationList();
        getUsersByRole();

        return () => {
            setUsersList([]);
            setRoleList([]);
            setDepartmentList([]);
            setDesignationList([])
        }
    }, []);
   
   const  getUsersByRole=()=>{
    const userDetails =JSON.parse(window.sessionStorage.getItem('userDetails'));
    if(userDetails.RoleName.toLowerCase() == 'admin'){
        getUsersList();
    }
    else{
        getDepartmentWiseUsers(userDetails);
    }
   } ;

    const getRoleList = () => {
        RoleService.getAllRole().then((res) => {
            // const result = res.map((response) => {
                
            // })
            setRoleList(res);
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
      const getDesignationList = () => {
        DesignationsService.getAllDesignations().then((res) => {
            setDesignationList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const handleClickOpen = () => {
        setOpen(true);
        formReset();
    };

    const handleClose = () => {
        setOpen(false);
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
    const editUsers = (users) => {
        setUsers(users);
        setOpen(true);
    }
    const deleteUsers = (usersdelete) => {
        
        if (usersdelete) {
            UsersService.deleteUsers(usersdelete.UserId).then((res) => {
                getUsersList();
            }).catch((err) => {
            });
        }
    };

    const getUsersList = () => {
        UsersService.getAllUsers().then((res) => {
            const result = res.map((response) => {
                return {
                    ...response,
                    "status": response.UserStatus ? 'Active' : 'Inactive',
                }
            })
            setUsersList(result);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const getDepartmentWiseUsers= (userDet) => {
        UsersService.getDepartmentWiseUsers(userDet).then((res) => {
            setUsersList(res);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const formReset = () => {
        setUsers({
            FullName: '',
            MobileNo: '',
            EmailId: '',
            RoleId: '',
            Depid: '',
            DesignationId: '',
            UserStatus: true,
            UserId:'',
        })
    }
    const formik = useFormik({
        initialValues: users,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            values.CreatedBy =  userDetails ? userDetails.UserId : '';
            if (users.UserId) {
                UsersService.upadeUsers(values).then((res) => {
                    handleClose();
                   
                    getUsersByRole();
                    resetForm();
                    formReset();
                    alert(" Users Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                delete values.UserId;
                UsersService.creteUsers(values).then((res) => {
                    getUsersByRole();
                    resetForm();
                    handleClose();
                    formReset();
                    alert(" Users Added Successfully.");
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
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            spacing={4}
                        >
                            <Stack spacing={1}>
                                <Typography variant="h4">
                                    Users
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
                                    <DialogTitle>Users</DialogTitle>
                                    <form onSubmit={formik.handleSubmit} >
                                        <DialogContent style={{ width: 308 }}>
                                            <DialogContentText>

                                            </DialogContentText>

                                            <Grid container spacing={2}>
                                                <Grid xs={12} md={12} >
                                                    <TextField
                                                        autoFocus
                                                        style={{ width: 258 }}
                                                        id="FullName"
                                                        name="FullName"
                                                        label="Full Name"
                                                        type="text"
                                                        variant="standard"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.FullName}
                                                        error={formik.touched.FullName && Boolean(formik.errors.FullName)}
                                                        helperText={formik.touched.FullName && formik.errors.FullName}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <TextField

                                                        style={{ width: 258 }}
                                                        id="MobileNo"
                                                        name="MobileNo"
                                                        label="Mobile Number"
                                                        type="text"
                                                        variant="standard"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.MobileNo}
                                                        error={formik.touched.MobileNo && Boolean(formik.errors.MobileNo)}
                                                        helperText={formik.touched.MobileNo && formik.errors.MobileNo}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <TextField
                                                        InputProps={{ style: { width: 258 } }}
                                                        margin="dense"
                                                        id="EmailId"
                                                        name="EmailId"
                                                        label="Email ID"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.EmailId}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.EmailId && Boolean(formik.errors.EmailId)}
                                                        helperText={formik.touched.EmailId && formik.errors.EmailId}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Role Id</InputLabel>
                                                        <Select
                                                            labelId="RoleId"
                                                            id="RoleId"
                                                            label="Role Name"
                                                            name="RoleId"
                                                            value={formik.values.RoleId}
                                                            // value={roleId}
                                                            onChange={e => {formik.handleChange(e);}}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {roleList.map(({ index,RoleId, RoleName }) => (
                                                                <MenuItem key={index} value={RoleId}>{RoleName}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Department Id</InputLabel>
                                                        <Select
                                                            labelId="Depid"
                                                            id="Depid"
                                                            label="Department Name"
                                                            name="Depid"
                                                            value={formik.values.Depid}
                                                            onChange={e => {formik.handleChange(e);}}
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
                                                <Grid xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="studentName">Designation Id</InputLabel>
                                                        <Select
                                                            labelId="DesignationId"
                                                            id="DesignationId"
                                                            label="Designation Id"
                                                            name="DesignationId"
                                                            value={formik.values.DesignationId}
                                                            onChange={e => {formik.handleChange(e);}}

                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            {designationList.map(({ index, DesignationId, Designation }) => (
                                                                <MenuItem key={index} value={DesignationId}>{Designation}
                                                                </MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            label="User Status"
                                                            name="UserStatus"
                                                            value={formik.values.UserStatus}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.UserStatus && Boolean(formik.errors.UserStatus)}
                                                            helperText={formik.touched.UserStatus && formik.errors.UserStatus}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value={true}>Active</MenuItem>
                                                            <MenuItem value={false}>In Active</MenuItem>
                                                            
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                              
                                                <Grid xs={12} md={12}>

                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit">{users.UserId ? 'Update' : 'Add'}</Button>

                                                </Grid>

                                            </Grid>


                                        </DialogContent>
                                    </form>
                                </Dialog>
                            </div>
                        </Stack>
                        {/* <CustomersSearch /> */}
                        <CustomersTable
                            headersList={headersList}
                            count={usersList.length}
                            items={usersList}
                            editDetails={editUsers}
                            deleteContact={deleteUsers}
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
