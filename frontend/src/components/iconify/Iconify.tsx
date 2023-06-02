import { Icon } from '@iconify/react';
import { Box, BoxProps } from '@mui/material';
import React from 'react';

interface IconifyProps extends BoxProps {
  icon: string;
  width?: number | string;
}

const Iconify = React.forwardRef<HTMLDivElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  )
);

export default Iconify;
