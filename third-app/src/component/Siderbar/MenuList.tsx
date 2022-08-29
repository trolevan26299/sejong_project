import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { ListItemButton, ListItemText, Typography } from '@mui/material';
import Collapse from '@mui/material/Collapse';
import { useState } from 'react';
import { IMenu } from '../types';
import MenuList from './Menu';

interface IProps {
  menuItem?: IMenu;
}

function MenuListItem(props: IProps) {
  const { menuItem } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <>
      <ListItemButton onClick={() => handleClick()}>
        <ListItemText
          primary={
            <Typography style={{ color: '#eeeeee' }}>
              {menuItem?.menuDisplayNm}
            </Typography>
          }
        />
        {open ? (
          <ExpandLess className="icon__menu-nav" />
        ) : (
          <ExpandMore className="icon__menu-nav" />
        )}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <MenuList dataMenu={menuItem} />
      </Collapse>
    </>
  );
}

export default MenuListItem;
