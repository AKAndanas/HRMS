import httpClient from '../../../httpClient';
// @mui
import { LoadingButton } from '@mui/lab';
// mocks_

// ----------------------------------------------------------------------

/*const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];*/

// ----------------------------------------------------------------------

export default function AccountPopover() {
  /*const [open, setOpen] = useState(null);



  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };*/

  const logoutUser = async() => {
    await httpClient.post('http://localhost:5000/logout');
    window.location.href ="/login";
}

  return (
    <>
      <LoadingButton className='btn btn-outline-danger' size="small" type="submit" variant="contained" onClick={()=>logoutUser()}>
        Logout
        </LoadingButton>    </>
  );
}
