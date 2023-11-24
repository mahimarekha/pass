import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import * as React from 'react';
import * as Yup from 'yup';
import { subDays, subHours } from 'date-fns';
import { useRouter } from 'next/router'

import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { useSelection } from 'src/hooks/use-selection';

import { useEffect } from 'react';

import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import UsersService from "../../service/UsersService";
import { CustomersSearch } from 'src/sections/customer/customers-search';
import { applyPagination } from 'src/utils/apply-pagination';
import VisitingPassesService from "../../service/VisitingPassService";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';

import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
 import dayjs from 'dayjs';
 const bull = (
    <Box 
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      
    </Box>
  );
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
    const [page, setPage] = useState(0);
    const [open, setOpen] = React.useState(false);
    const [openQR, setOpenQR] = React.useState(false);
    const [getQR, setQR] = React.useState({});
  
    const userDetails =JSON.parse(window.sessionStorage.getItem('userDetails'));
    const [designationsList, setDesignationList] = useState([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const customers = useCustomers(page, rowsPerPage);
    const customersIds = useCustomerIds(customers);
    const [usersList, setUsersList] = useState([]);
    var [departmentId, setDepartmentId] = useState("");
    const [departmentList, setDepartmentList] = useState([]);
    const [visitingPassesList, setVisitingPassesList] = useState([]);
   

 
  
    const router = useRouter()

const handleCloseQR = () => {
    setOpenQR(false);
};
    useEffect(() => {
        getQrCodeList();
        getVisitingPassesList();
        return () => {
            setVisitingPassesList([]);
        }
    }, []);
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
   const printTicket =()=>{
    window.print();
   }
    const getQrCodeList = () => {
        
        VisitingPassesService.getQrCode(router.query.slug).then((res) => {
            if(res.length){
                const base64Data = "data:image/png;base64, "+res[0].QRCode;
                res[0].qrcode = base64Data;
                setQR(res[0]);
                setOpenQR(true);
                // const imageBuffer = Buffer.from(base64Data, 'base64');
                // const blob = new Blob([imageBuffer]);
                // const blobUrl = URL.createObjectURL(blob);
                // const link = document.createElement('a');
                // link.href = blobUrl;
                // link.click();
                // URL.revokeObjectURL(blobUrl);
            }
          
            
        }).catch((err) => {
            // setError(err.message);
        });
    }
    return (
        <>
          
        
        <Container maxWidth="sm">
         <Card variant='outlined' style={{width:500,height:300}}
         
         sx={{
            boxShadow: 3,
           
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#fff'),
            color: (theme) =>
              theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
        
           
         
            fontSize: '0.875rem',
            fontWeight: '700',
          }}>
       <CardHeader
        sx={{
            
           
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#101010' : '#6366f1'),
           
    
            
          }}
        action={
          <p style={{color:"white"}}>ENTRTY PASS</p>
        }
        title="TELANGANA ASSEMBLY"
       titleTypographyProps={{color:"white",fontSize:'20px'}}
      />
      <CardContent style={{backgroundColor: "gainsboro"}}>
      
        
      
        <Grid container spacing={2}>
                <Grid xs={8} md={8} container spacing={1} >
                <Grid xs={12} md={12}>
                    <label style={{fontWeight:"bold"}}>
                     Full Name
                    </label>
                  
                        <div style={{fontWeight:"500", fontSize:"17px", textTransform:"uppercase"}}>
                            {getQR?.FullName}
                             </div>
                       
                   
                </Grid>
                
                <Grid xs={6} md={6}>
                    <label style={{fontWeight:"bold"}}>
                      From Date
                    </label>
                    <div style={{fontWeight:"500", fontSize:"17px", textTransform:"uppercase"}}>
                        
                    {getQR?.FromDate} 
                        </div>
                   
                </Grid>
                <Grid xs={6} md={6}>
                    <label style={{fontWeight:"bold"}}>
                      To Date
                    </label>
                    <div style={{fontWeight:"500", fontSize:"17px", textTransform:"uppercase"}}>

                    {getQR?.ToDate} 
                        </div>
                </Grid>
                <Grid xs={6} md={6}>
                    <label style={{fontWeight:"bold"}}>
                      Purpose Of Visiting
                    </label>
                    <div style={{fontWeight:"500", fontSize:"15px"}}>

                    {getQR?.PurposeVisting} 
                        </div>
                </Grid>
                </Grid>
                <Grid xs={4} md={4}>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
        <img src={getQR?.qrcode} alt='qrcode' style={{ width:'100%',border:'1px solid #2f3746'}}/>
        </Typography>
                </Grid>
            </Grid>
      </CardContent>
      <CardActions>
     
      </CardActions>
    </Card>
    <Grid container spacing={2}>
    <Grid xs={12} >
        <div style={{textAlign: "center",
    marginTop: "35px"}}>
            
    <Button variant="contained" onClick={printTicket}>Print</Button>
    </div>
    </Grid>
    </Grid>
    </Container>
           
          
        </>
    );
};


Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
