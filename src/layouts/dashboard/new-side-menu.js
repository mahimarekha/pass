import NextLink from 'next/link';
import * as React from 'react';

import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
// import useStyles from "./styles";

export const NewSideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title,child,pathname, role } = props;

  const userDetails =JSON.parse(window.sessionStorage.getItem('userDetails'));
  const loginRole = role.includes(userDetails.RoleName);
 
  // var classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  const linkProps = path
    ? external
      ? {
        component: 'a',
        href: path,
        target: '_blank'
      }
      : {
        component: NextLink,
        href: path
      }
    : {};

  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }

  if(!child ){
    return (
        <>
     
         
         <ListItemButton onClick={handleClick} {...linkProps} 
                   sx={{
            alignItems: 'center',
            borderRadius: 1,
            display: 'flex',
            justifyContent: 'flex-start',
            pl: '16px',
            pr: '16px',
            py: '6px',
            textAlign: 'left',
            width: '100%',
            ...(active && {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }),
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.04)'
            }
          }}
        
>
           <ListItemIcon>
             {icon}
           </ListItemIcon>
           <ListItemText primary={title} />
          
         </ListItemButton>
       
        </>
       
      
       );
  }

  if(loginRole ){
  return (
   <>

    
    <ListItemButton onClick={handleClick}>
      <ListItemIcon>
       {icon}
      </ListItemIcon>
      <ListItemText primary={title} />
      {open ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>

    <Collapse in={open} timeout="auto" unmountOnExit>

      <List component="div" disablePadding>
        {child?.map((item,index) => {
            const { active = false, disabled, external, icon, path, title } = item;
            const sublinkProps = path
            ? external
              ? {
                component: 'a',
                href: path,
                target: '_blank'
              }
              : {
                component: NextLink,
                href: path
              }
            : {};
              const subactive = item.path ? (pathname === item.path) : false;
              
             return ( <ListItemButton key={index} 
              sx={{
                pl: 4,
                alignItems: 'center',
                borderRadius: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                pl: '16px',
                pr: '16px',
                py: '6px',
                textAlign: 'left',
                width: '100%',
                ...(subactive && {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)'
                }),
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.04)'
                }
              }}
             {...sublinkProps}>
              <ListItemIcon>
              {icon}
              </ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>)
        })}
     
      </List>
    </Collapse>
   </>
  
 
  );
}
};

NewSideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
