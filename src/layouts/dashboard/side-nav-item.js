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

export const SideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title,child } = props;
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

//   if(child){
//     return (
//       <li>
//       <ButtonBase onClick={handleClick}
//         sx={{
//           alignItems: 'center',
//           borderRadius: 1,
//           display: 'flex',
//           justifyContent: 'flex-start',
//           pl: '16px',
//           pr: '16px',
//           py: '6px',
//           textAlign: 'left',
//           width: '100%',
//           ...(active && {
//             backgroundColor: 'rgba(255, 255, 255, 0.04)'
//           }),
//           '&:hover': {
//             backgroundColor: 'rgba(255, 255, 255, 0.04)'
//           }
//         }}
//         {...linkProps}
//       >
//         {icon && (
//           <Box
//             component="span"
//             sx={{
//               alignItems: 'center',
//               color: 'neutral.400',
//               display: 'inline-flex',
//               justifyContent: 'center',
//               mr: 2,
//               ...(active && {
//                 color: 'primary.main'
//               })
//             }}
//           >
//             {icon}
//           </Box>
//         )}
//         <Box
//           component="span"
//           sx={{
//             color: 'neutral.400',
//             flexGrow: 1,
//             fontFamily: (theme) => theme.typography.fontFamily,
//             fontSize: 14,
//             fontWeight: 600,
//             lineHeight: '24px',
//             whiteSpace: 'nowrap',
//             ...(active && {
//               color: 'common.white'
//             }),
//             ...(disabled && {
//               color: 'neutral.500'
//             })
//           }}
//         >
//           {title}
//         </Box>
//         {open ? <ExpandLess /> : <ExpandMore />}
//         <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>

//         {child?.map((item) => {
//               // const active = item.path ? (pathname === item.path) : false;

//               return ( <ListItemButton sx={{ pl: 4 }}>
//                 <ListItemIcon>
//                   <StarBorder />
//                 </ListItemIcon>
//                 <ListItemText primary="Starred" />
//               </ListItemButton>)
//             })}
//           {/* <ListItemButton sx={{ pl: 4 }}>
//             <ListItemIcon>
             
//             </ListItemIcon>
//             <ListItemText primary="Starred" />
//           </ListItemButton> */}
//         </List>
//       </Collapse>
//       </ButtonBase>
//     </li>
//     );
// //     {child.map((item) => {
    
// //       const { active = false, disabled, external, icon, path, title,child } = item;
// // console.log(item)
// //       return (
// //         <li>
// //         <ButtonBase
// //           sx={{
// //             alignItems: 'center',
// //             borderRadius: 1,
// //             display: 'flex',
// //             justifyContent: 'flex-start',
// //             pl: '16px',
// //             pr: '16px',
// //             py: '6px',
// //             textAlign: 'left',
// //             width: '100%',
// //             ...(active && {
// //               backgroundColor: 'rgba(255, 255, 255, 0.04)'
// //             }),
// //             '&:hover': {
// //               backgroundColor: 'rgba(255, 255, 255, 0.04)'
// //             }
// //           }}
// //           {...linkProps}
// //         >
// //           {icon && (
// //             <Box
// //               component="span"
// //               sx={{
// //                 alignItems: 'center',
// //                 color: 'neutral.400',
// //                 display: 'inline-flex',
// //                 justifyContent: 'center',
// //                 mr: 2,
// //                 ...(active && {
// //                   color: 'primary.main'
// //                 })
// //               }}
// //             >
// //               {icon}ddd
// //             </Box>
// //           )}
// //           <Box
// //             component="span"
// //             sx={{
// //               color: 'neutral.400',
// //               flexGrow: 1,
// //               fontFamily: (theme) => theme.typography.fontFamily,
// //               fontSize: 14,
// //               fontWeight: 600,
// //               lineHeight: '24px',
// //               whiteSpace: 'nowrap',
// //               ...(active && {
// //                 color: 'common.white'
// //               }),
// //               ...(disabled && {
// //                 color: 'neutral.500'
// //               })
// //             }}
// //           >
// //             {title}ddd
// //           </Box>
// //         </ButtonBase>
// //       </li>
// //       );
// //     })}
//   }
  function toggleCollapse(e) {
    if (isSidebarOpened) {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  }
  return (
    <li>
      <ButtonBase
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
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'common.white'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

SideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
