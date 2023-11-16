import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img src="/assets/avatars/Government-of-Telangana-Black.svg"/>
  );
};
