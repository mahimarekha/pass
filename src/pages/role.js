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
import RoleService from "../service/RoleService";
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

const Page = (context) => {
    
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const headersList = [{
        name: 'Role Code',
        property: 'RoleCode'
    },
    {
        
        name: 'Role Name',
        property: 'RoleName'
    },
    {
        name: 'Role Status',
        property: 'status'
    },
    {
        name: 'Visiting Passes Status',
        property: 'VisitingPassesStatus'
    },
    
    {
        name: 'description',
        property: 'description'
    },
    {
        name: 'Edit',
        property: 'Edit'
    },
    ];
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const [roleList, setRoleList] = useState([]);
    const [role, setRole] = useState({
        RoleCode: '',
        RoleName: '',
        RoleId: '',
        RoleStatus: true,
        VisitingPassesStatus:'',
        description: '',
        // status: true,
    });
    const validationSchema = Yup.object().shape({
        RoleCode: Yup.string().required('Role Code is required')
        .max(2, 'Must be exactly 2 digits'),
        RoleName: Yup.string().required('Role Name is required'),
        RoleStatus: Yup.string(true).required('Role Status is required'),
        VisitingPassesStatus: Yup.string().required('Visiting Passes Status is required'),
        description: Yup.string().required('description is required'),
        // count: Yup.string(),
    });
    const router = useRouter();
    
    useEffect(() => {
        
          if(!userPermissions(router.asPath)){
            router.push('/unauthorized');
          }

        getRoleList();

        return () => {
            setRoleList([]);
        }
    }, []);
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
    const editRole = (role) => {
        setRole(role);
        setOpen(true);
    }
    const deleteRole = (roledelete) => {
        if (roledelete) {
            RoleService.deleteRole(roledelete).then((res) => {
                getRoleList();
            }).catch((err) => {
            });
        }
    };

    const getRoleList = () => {
        RoleService.getAllRole().then((res) => {
            const result = res.map((response) => {
                return {
                    ...response,
                    "status": response.RoleStatus ? 'Active' : 'Inactive',
                }
            })
            setRoleList(result);
        }).catch((err) => {
            // setError(err.message);
        });
    }
    const formReset=()=>{
        setRole({
            RoleCode: '',
            RoleName: '',
            RoleId: '',
            RoleStatus: true,
            description: '',
        VisitingPassesStatus:'',

        })
    }
    const formik = useFormik({
        initialValues: role,
        enableReinitialize: true,
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (role.RoleId) {
                RoleService.upadeRole(values).then((res) => {
                    handleClose();
                    getRoleList();
                    resetForm();
                    formReset();
                    alert(" Role Updated Successfully.");
                }).catch((err) => {
                });
            }
            else {
                delete values.RoleId;
                RoleService.creteRole(values).then((res) => {
                    getRoleList();
                    resetForm();
                    handleClose();
                    formReset();
                    alert(" Role Added Successfully.");
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
                                    Roles
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
                                    <DialogTitle>Role</DialogTitle>
                                    <form onSubmit={formik.handleSubmit} >
                                        <DialogContent style={{ width: 308 }}>
                                            <DialogContentText>

                                            </DialogContentText>

                                            <Grid container spacing={2}>
                                                <Grid xs={12} md={12} >
                                                    <TextField
                                                        autoFocus
                                                        style={{ width: 258 }}
                                                        id="RoleCode"
                                                        name="RoleCode"
                                                        label="Role Code"
                                                        type="text"
                                                        variant="standard"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.RoleCode}
                                                        error={formik.touched.RoleCode && Boolean(formik.errors.RoleCode)}
                                                        helperText={formik.touched.RoleCode && formik.errors.RoleCode}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <TextField

                                                        style={{ width: 258 }}
                                                        id="RoleName"
                                                        name="RoleName"
                                                        label="RoleName"
                                                        type="text"
                                                        variant="standard"
                                                        onChange={formik.handleChange}
                                                        value={formik.values.RoleName}
                                                        error={formik.touched.RoleName && Boolean(formik.errors.RoleName)}
                                                        helperText={formik.touched.RoleName && formik.errors.RoleName}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="demo-simple-select-standard-label"> Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            label="Role Status"
                                                            name="RoleStatus"
                                                            value={formik.values.RoleStatus}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.RoleStatus && Boolean(formik.errors.RoleStatus)}
                                                            helperText={formik.touched.RoleStatus && formik.errors.RoleStatus}
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
                                                    <FormControl variant="standard" fullWidth>
                                                        <InputLabel id="demo-simple-select-standard-label">Visiting Passes Status</InputLabel>
                                                        <Select
                                                            labelId="demo-simple-select-standard-label"
                                                            id="demo-simple-select-standard"
                                                            label="Visiting Passes Status"
                                                            name="VisitingPassesStatus"
                                                            value={formik.values.VisitingPassesStatus}
                                                            onChange={formik.handleChange}
                                                            error={formik.touched.VisitingPassesStatus && Boolean(formik.errors.VisitingPassesStatus)}
                                                            helperText={formik.touched.VisitingPassesStatus && formik.errors.VisitingPassesStatus}
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="Approved">Approved</MenuItem>
                                                            {/* <MenuItem value="Rejected">Rejected</MenuItem> */}
                                                            <MenuItem value="Pending">Pending</MenuItem>
                                                        </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={12} md={12}>
                                                    <TextField
                                                        InputProps={{ style: { width: 258 } }}
                                                        autoFocus
                                                        margin="dense"
                                                        id="description"
                                                        name="description"
                                                        label="Description"
                                                        type="text"
                                                        variant="standard"
                                                        value={formik.values.description}
                                                        onChange={formik.handleChange}
                                                        error={formik.touched.description && Boolean(formik.errors.description)}
                                                        helperText={formik.touched.description && formik.errors.description}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={12}>

                                                    <Button onClick={handleClose}>Cancel</Button>
                                                    <Button type="submit">{role.RoleId?'Update':'Add'}</Button>

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
                            count={roleList.length}
                            items={roleList}
                            editDetails={editRole}

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
