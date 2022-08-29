import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setSnackbar } from '../redux/Slice/snackbar';

export default function CustomizedSnackbars() {
  const Open = useAppSelector((state) => state.snackbar.snackbarOpen);
  const snackType = useAppSelector((state) => state.snackbar.snackbarType);
  const message = useAppSelector((state) => state.snackbar.snackbarMessage);
  const dispatch = useAppDispatch();

  return (
    <Snackbar
      open={Open}
      autoHideDuration={4000}
      onClose={() => dispatch(setSnackbar({ snackbarOpen: false }))}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      {snackType === 'success' ? (
        <Alert
          onClose={() => dispatch(setSnackbar({ snackbarOpen: false }))}
          severity="success"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      ) : (
        <Alert
          onClose={() => dispatch(setSnackbar({ snackbarOpen: false }))}
          severity="error"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      )}
    </Snackbar>
  );
}
