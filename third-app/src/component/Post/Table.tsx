import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useDispatch } from 'react-redux';
import { Product } from '../types';

interface IProps {
  dataProduct?: Product[] | null;
  onEdit?: any;
  nowId?: number;
}

const TableBoard = (props: IProps) => {
  const { dataProduct, onEdit } = props;
  const { nowId } = props;
  const dispatch = useDispatch();
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: '621px',
        '& .MuiTableRow-root:hover': {
          backgroundColor: '#EAF0F6!important',
        },
      }}
    >
      <Table
        sx={{ minWidth: 650 }}
        size="small"
        aria-label="simple table"
        stickyHeader
      >
        <TableHead>
          <TableRow>
            <TableCell align="left">No</TableCell>
            <TableCell align="left">Category</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="left">Write</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Views</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataProduct?.map((item) => {
            return (
              <TableRow
                key={item.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  cursor: 'pointer',
                  borderRight: '2px solid black',
                }}
                onClick={() => onEdit(item)}
                selected={nowId === item.id}
              >
                <TableCell align="left">{item.id}</TableCell>
                <TableCell align="left">{item.category}</TableCell>
                <TableCell align="left">{item.title}</TableCell>
                <TableCell align="left">{item.userName}</TableCell>
                <TableCell align="left">{item.regDt}</TableCell>
                <TableCell align="left">{item.viewCnt}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TableBoard;
