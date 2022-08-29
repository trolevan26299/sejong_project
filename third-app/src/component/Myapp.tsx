import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useMediaQuery } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useEffect, useState } from 'react';
import menuApi from '../Services/MenuAPI';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import { setToggleChange } from '../redux/Slice/toggleMenu';
import RouterScreen from '../routes/router';
import './layout.css';
import MenuList from './Siderbar/Menu';
import { IMenu } from './types';

const Sidebar = (): JSX.Element => {
  const themeCus = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 1260,
        md: 1700,
        lg: 1920,
        xl: 2000,
      },
    },
  });

  const [dataMenu, setDataMenu] = useState<IMenu>();
  const dispatch = useAppDispatch();
  const nowToggle = useAppSelector((state) => state.toggleSlice.toggle);

  const matches = useMediaQuery('(min-width:1700px)');
  const min = useMediaQuery('(min-width:1260px)');
  const minHeight = useMediaQuery('(min-height:937px)');

  const handleOpenNav = () => {
    dispatch(setToggleChange({ toggle: true }));
  };

  const handleCloseNav = () => {
    dispatch(setToggleChange({ toggle: false }));
  };

  useEffect(() => {
    dispatch(setToggleChange({ toggle: matches }));
  }, [dispatch, matches]);

  useEffect(() => {
    const responseMenu = async () => {
      try {
        const response: any = await menuApi.getMenuApi();
        setDataMenu(response[0]);
      } catch (error) {
        console.log('Failed to Fetch Menu', error);
      }
    };
    responseMenu();
  }, []);
  return (
    <ThemeProvider theme={themeCus}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="main" style={{ width: !min ? '1260px' : '100%' }}>
          <div
            className={`${
              !nowToggle ? 'nav__closed' : `${!matches ? 'nav__small' : 'nav'}`
            }`}
          >
            <h1>Sejong</h1>
            <div className={`${!nowToggle ? 'nav__pc-closed' : 'nav__pc'}`}>
              <MenuList dataMenu={dataMenu} />
            </div>
          </div>
          <div
            className={`${
              !nowToggle
                ? 'content__close-nav'
                : `${!matches ? `small__content` : 'all_content'}`
            }`}
          >
            <div
              className="header__page"
              style={{
                width: !min ? '1260px' : '100%',
              }}
            >
              <div className="nav__bars-btn">
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  spacing={4}
                >
                  <MenuOpenIcon
                    className="icon__menu"
                    onClick={!nowToggle ? handleOpenNav : handleCloseNav}
                  />
                  <Avatar>T</Avatar>
                </Stack>
              </div>
            </div>
            <div
              className={`${
                !nowToggle ? '' : `${!matches ? 'nav__overlay' : ''}`
              }`}
              aria-hidden="true"
              onClick={handleCloseNav}
              onKeyDown={handleCloseNav}
            />
            <div
              className="header__content w-100"
              style={{
                overflowY: !minHeight ? 'auto' : 'hidden',
                overflowX: !min ? 'auto' : 'hidden',
                height: 'calc(100% - 57px)',
              }}
            >
              <div
                className="w-100 h-100"
                style={{ minHeight: 'calc(937px - 57px)' }}
              >
                <RouterScreen />
              </div>
            </div>
          </div>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Sidebar;
