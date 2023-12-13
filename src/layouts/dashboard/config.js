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
     
    },
    {
      title: 'Users',
      path: '/users',
      role:['Admin'],
     
    },
    {
      title: 'Minister',
      path: '/minister',
      role:['Admin'],
     
    },
    {
      title: 'legaslature party office',
      path: '/leguslative',
      role:['Admin'],
     
    },
    {
      title: 'Session',
      path: '/session',
      role:['Admin'],
   
    },
    ],
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
    
  },
 
  {
    title: 'Counter Pass',
    path: '/counterpass',
    role:['Admin','Counter pass'],
   icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
  },
  {
    title: 'Add Counter Pass',
    path: '/addcounter',
    role:['Admin','Counter pass'],
   icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
  },
  {
    title: 'Sub-Dropdown',
    path: '/subdropdown',
    role:['Admin','Counter pass'],
   icon: (
        <SvgIcon fontSize="small">
          <ShoppingBagIcon />
        </SvgIcon>
      )
  },
  {
    title: 'Request Pass',
    path: '/visitingpasses',
    role:['Admin',"Apply for Pass","Approver","Secretary","Counter pass"],
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    )
  },
  {
    title: 'Approval',
    path: '/approval',
    role:['Admin',"Approver"],
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
export const USER_ROLE = {
  ADMIN: 'Admin',
  APPLYPASS: 'Apply for Pass',
  APPROVER: 'Approver',
  COUNTERPASS: 'Counter pass',
  SECURITY:'Secretary',
  
  // Add more details as needed
};

export const userPermissions = (router) => {
  const userDetails = JSON.parse(window.sessionStorage.getItem('userDetails'));
  const stringWithoutSlash = router.startsWith('/') ? router.substring(1) : router;
  switch (userDetails.RoleName) {
    case USER_ROLE.ADMIN:
      return ['customers','role','visitingplaces','passes','designations','users','counterpass','visitingpasses','approval','addcounter','minister','leguslative'].includes(stringWithoutSlash);
    case USER_ROLE.APPLYPASS:
      return ['visitingpasses'].includes(stringWithoutSlash);
      case USER_ROLE.APPROVER:
        return ['visitingpasses','approval'].includes(stringWithoutSlash)
        case USER_ROLE.SECURITY:
          return ['visitingpasses','approval'].includes(stringWithoutSlash) 
           case USER_ROLE.SECRETARY:
          return ['visitingpasses','approval'].includes(stringWithoutSlash) 
          case USER_ROLE.COUNTERPASS:
            return ['visitingpasses','counterpass', 'addcounter'].includes(stringWithoutSlash)  
          
  }
};

