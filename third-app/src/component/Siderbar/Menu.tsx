import { Typography, useMediaQuery } from '@mui/material';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/useRedux';
import { setToggleChange } from '../../redux/Slice/toggleMenu';
import { IMenu } from '../types';
import MenuListItem from './MenuList';

interface IProps {
  dataMenu?: IMenu;
}

const MenuList = (props: IProps) => {
  const { dataMenu } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:1700px)');

  const handleNavigate = (item: IMenu) => {
    if (!matches) {
      dispatch(setToggleChange({ toggle: false }));
    }
    if (item.menuId) {
      localStorage.setItem('menuId', item.menuId);
    }
    if (item.menuUrl) {
      navigate(item.menuUrl);
    } else {
      navigate('/404');
    }
  };

  const RenderMenu = (data: IMenu) => {
    const menu = data.children
      ?.filter((x) => x.viewYn === 'Y' && x.usedYn === 'Y')
      .map((item, index) => {
        if (Array.isArray(item.children) && item.children.length > 0) {
          return <MenuListItem key={index} menuItem={item} />;
        }
        return (
          <ListItemButton
            key={index}
            selected={localStorage.getItem('menuId') === item.menuId}
            onClick={() => handleNavigate(item)}
            className={`${
              localStorage.getItem('menuId') === item.menuId
                ? 'bg-blue-selected'
                : ''
            }`}
          >
            <ListItemText
              primary={
                <Typography
                  style={{
                    color: '#eeeeee',
                  }}
                >
                  {item.menuDisplayNm}
                </Typography>
              }
            />
          </ListItemButton>
        );
      });
    return menu;
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360 }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {dataMenu !== undefined ? RenderMenu(dataMenu) : ''}
    </List>
  );
};

export default MenuList;
