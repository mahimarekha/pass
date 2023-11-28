import ChartBarIcon from '@heroicons/react/24/solid/ChartBarIcon';
import CogIcon from '@heroicons/react/24/solid/CogIcon';
import LockClosedIcon from '@heroicons/react/24/solid/LockClosedIcon';
import ShoppingBagIcon from '@heroicons/react/24/solid/ShoppingBagIcon';
import UserIcon from '@heroicons/react/24/solid/UserIcon';
import UserPlusIcon from '@heroicons/react/24/solid/UserPlusIcon';
import UsersIcon from '@heroicons/react/24/solid/UsersIcon';
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon';
import { SvgIcon } from '@mui/material';

export const items = [
  {
    title: 'Master',
    path: '/',
    role:['Admin'],
    child:[  {
      title: 'Department',
      path: '/customers',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <UsersIcon />
      //   </SvgIcon>
      // )
    },
    {
      title: 'Roles',
      path: '/role',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <ShoppingBagIcon />
      //   </SvgIcon>
      // )
    },
    {
      title: 'Visiting Places',
      path: '/visitingplaces',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <UserIcon />
      //   </SvgIcon>
      // )
    } ,{
      title: 'Passes',
      path: '/passes',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <LockClosedIcon />
      //   </SvgIcon>
      // )
    },
    {
      title: 'Designations',
      path: '/designations',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <CogIcon />
      //   </SvgIcon>
      // )
    },
    {
      title: 'Users',
      path: '/users',
      role:['Admin'],
      // icon: (
      //   <SvgIcon fontSize="small">
      //     <CogIcon />
      //   </SvgIcon>
      // )
    },
    {
      title: 'Counter Pass',
      path: '/counterpass',
      role:['Admin'],
    //  icon: (
    //       <SvgIcon fontSize="small">
    //         <ShoppingBagIcon />
    //       </SvgIcon>
    //     )
    },
    ],
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
    
  },
 
  // {
  //   title: 'Companies'
  //   path: '/companies',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <ShoppingBagIcon />
  //     </SvgIcon>
  //   )
  // },

  {
    title: 'Request Pass',
    path: '/visitingpasses',
    role:['Admin', "SCs","Approver"],
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Approval',
    path: '/approval',
    role:['Admin', "Approver"],
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
 
  // {
  //   title: 'Login',
  //   path: '/auth/login',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <LockClosedIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Register',
  //   path: '/auth/register',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <UserPlusIcon />
  //     </SvgIcon>
  //   )
  // },
  // {
  //   title: 'Error',
  //   path: '/404',
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <XCircleIcon />
  //     </SvgIcon>
  //   )
  // }
];
