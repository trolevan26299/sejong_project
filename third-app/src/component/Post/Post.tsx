import {
  FormControl,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
import { useEffect, useState } from 'react';
import {
  createByFormSubmit,
  postSlice,
  postSliceById,
  postSliceNullId,
  fetchTotalProducts,
  updateById,
  deleteProductId,
} from '../../Services/ProductsAPI';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';
import { DigestMessage } from '../../utils/PwdSHA256';
import { ParamFilter } from '../../utils/paramFIlter';
import { Filter, Product } from '../types';
import FormInfomation from './FormInfomation';
import SortBy from './SortBy';
import TableBoard from './Table';
import { setInfoHTML, setIsLoading } from '../../redux/Slice/postSlice';
import { setSnackbar } from '../../redux/Slice/snackbar';
import Snackbar from '../../utils/snackbar';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: 'white',
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

const Posting = () => {
  const loadDing = useAppSelector((state) => state.postSlice.loadDing);
  const dispatch = useAppDispatch();
  const infoCR = useAppSelector((state) => state.postSlice.infoHTML);
  const matches = useMediaQuery('(min-width:1700px)');
  const dataProduct = useAppSelector((state) => state.postSlice.product);
  const dataTotal = useAppSelector((state) => state.postSlice.total);
  const nowObject = useAppSelector((state) => state.postSlice.singleProduct);
  const [amount, setAmount] = useState<number>(10);
  const [nowId, setnowId] = useState<number>();

  const [filter, setFilter] = useState<Filter>({
    _page: 1,
    _limit: 10,
    regDt_gte: `${moment(new Date()).format('YYYY-MM-DD').concat(' 00:00:00')}`,
    regDt_lte: `${moment(new Date()).format('YYYY-MM-DD').concat(' 23:59:59')}`,
    _sort: 'regDt',
    _order: 'desc',
  });

  const handleChangePage = (e: any, page: any) => {
    if (!page || filter._page === page) return;
    setFilter((prevFilter) => ({ ...prevFilter, _page: page }));
  };

  const handleChangeAmount = (e: any) => {
    if (e?.target?.value) {
      setAmount(e.target.value);
      setFilter((prevFilter) => ({
        ...prevFilter,
        _limit: e.target.value,
        _page: 1,
      }));
    }
  };

  const handleSortByAny = (val: any) => {
    setFilter((prevFilter) => ({ ...prevFilter, ...val, _page: 1 }));
  };

  const handleResetTable = () => {
    setFilter({
      _page: 1,
      _limit: 10,
      regDt_gte: `${moment(new Date())
        .format('YYYY-MM-DD')
        .concat(' 00:00:00')}`,
      regDt_lte: `${moment(new Date())
        .format('YYYY-MM-DD')
        .concat(' 23:59:59')}`,
    });
    setAmount(10);
  };

  const handleOnSubmit = (searchTerm: any, value: string) => {
    const newParams = ParamFilter(searchTerm, value);
    handleSortByAny(newParams);
  };

  const onEdit = (item: Product) => {
    if (item.id) {
      dispatch(setInfoHTML({ infoHTML: false }));
      setnowId(item.id);
      dispatch(postSliceById(item.id));
    }
    dispatch(setIsLoading({ loadDing: false }));
  };

  const handleSubmitFormBody = (val: any) => {
    if (nowId) {
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: 'success',
          snackbarMessage: 'Edit Successfully',
        }),
      );
      dispatch(updateById(val?.id, val));
    } else {
      dispatch(createByFormSubmit(val));
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: 'success',
          snackbarMessage: 'Created Success!',
        }),
      );
    }
  };

  const handleResetFormInfo = () => {
    setnowId(undefined);
    dispatch(postSliceNullId(null));
    postSliceNullId(null);
  };

  const handleDelById = () => {
    if (nowId && nowObject) {
      dispatch(deleteProductId(nowId, nowObject));
      dispatch(
        setSnackbar({
          snackbarOpen: true,
          snackbarType: 'success',
          snackbarMessage: 'Deleted Success!',
        }),
      );
    }
    setnowId(undefined);
    dispatch(postSliceNullId(null));
  };

  useEffect(() => {
    if (nowObject?.id) {
      dispatch(updateById(nowObject.id, nowObject));
    }
  }, [nowObject, dispatch]);

  useEffect(() => {
    dispatch(postSlice(filter));
    dispatch(
      fetchTotalProducts({
        regDt_gte: filter.regDt_gte,
        regDt_lte: filter.regDt_lte,
      }),
    );
  }, [filter, dataProduct?.length, dispatch]);
  return (
    <div className="content__app">
      <Box
        sx={{
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        <Snackbar />
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          className="w-100 h-100 table-board"
          columnSpacing={!matches ? 0 : 3}
        >
          {!loadDing && (
            <div className="progress">
              <CircularProgress />
            </div>
          )}
          <Grid
            className={`${
              !matches ? 'reponsive__content-1 w-100 h-100' : 'w-100 h-100'
            }`}
            item
            xs={12}
            md={infoCR ? 12 : 7}
          >
            <Item className="bg__posting ">
              <div
                className="content__app-title-boards"
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                Boards List
              </div>
              <div className="body__sort-boards">
                <SortBy
                  handleResetTable={handleResetTable}
                  handleOnSubmit={handleOnSubmit}
                  nowObject={nowObject}
                  handleResetFormInfo={handleResetFormInfo}
                />
              </div>
              <div className="body__table-boards">
                <TableBoard
                  dataProduct={dataProduct}
                  onEdit={onEdit}
                  nowId={nowId}
                />

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  columnGap={4}
                  alignItems="center"
                  sx={{ paddingTop: '24px' }}
                >
                  <FormControl>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      size="small"
                      value={amount}
                      onChange={handleChangeAmount}
                      sx={{ height: '30px' }}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                      <MenuItem value={50}>50</MenuItem>
                      <MenuItem value={100}>100</MenuItem>
                      <MenuItem value={200}>200</MenuItem>
                    </Select>
                  </FormControl>
                  {filter._limit &&
                    Math.ceil(dataTotal / filter._limit) >= 1 && (
                      <Pagination
                        count={Math.ceil(dataTotal / filter._limit)}
                        variant="outlined"
                        shape="rounded"
                        page={filter._page}
                        onChange={handleChangePage}
                      />
                    )}
                  <div>
                    <b>Total Post :</b> {dataTotal}
                  </div>
                </Stack>
              </div>
            </Item>
          </Grid>
          <Grid
            className={`${
              !matches ? 'reponsive__content-2 w-100 h-100' : 'w-100 h-100'
            }`}
            item
            xs={7}
            md={infoCR ? 0 : 5}
            sx={{ display: infoCR ? 'none' : 'block' }}
          >
            <Item className="bg__posting">
              <div
                className="content__app-title-information"
                style={{ fontSize: '20px', fontWeight: '400' }}
              >
                Information
              </div>
              <div className="content__app-choose-category">
                <FormInfomation
                  handleSubmitFormBody={handleSubmitFormBody}
                  nowObject={nowObject}
                  handleResetFormInfo={handleResetFormInfo}
                  handleDelById={handleDelById}
                />
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Posting;
