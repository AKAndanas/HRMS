import { ForwardRefRenderFunction, forwardRef, CSSProperties } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

interface LogoProps {
  disabledLink?: boolean;
  sx?: CSSProperties;
}

const Logo: ForwardRefRenderFunction<unknown, LogoProps> = 
    ({ disabledLink = false, sx, ...other }, ref) => {

  const logo = (
    <Box
      component="img"
      src="https://www.irayitsolutions.com/wp-content/uploads/2021/06/iray-logo.png"
      sx={{ width: 80, height: 25, cursor: 'pointer', ...sx }}
      ref={ref as any}
      {...other}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
};

export default forwardRef(Logo);
