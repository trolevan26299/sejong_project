import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dayOption, sortLike } from '../../configs';
import { FormatDayBack } from '../../utils/formatDayBack';
import { setInfoHTML, setIsLoading } from '../../redux/Slice/postSlice';

const SortBy = (props: any) => {
  const dispatch = useDispatch();
  const { handleResetTable, handleOnSubmit, handleResetFormInfo } = props;

  const defaultValue = {
    startDay: new Date(),
    endDay: new Date(),
    type: 'All',
    day: 'TODAY',
  };

  const [value, setValue] = useState<string | null>('');
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const handleChangeSearchTerm = (e: any) => {
    setValue(e.target.value);
  };

  const handleChangeSearch = (e: any) => {
    setSearchTerm((prevSearch) => ({
      ...prevSearch,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setSearchTerm(defaultValue);
    dispatch(setIsLoading({ loadDing: false }));
    setValue('');
    handleResetTable();
  };

  const handleChangeDate = (e: any) => {
    const newEvent = e.target.value;
    const newStartDay = FormatDayBack(newEvent);
    if (newStartDay) {
      setSearchTerm((prevSearch) => ({
        ...prevSearch,
        [e.target.name]: e.target.value,
        startDay: newStartDay,
      }));
    }
  };
  const writeF = () => {
    dispatch(setInfoHTML({ infoHTML: false }));
    handleResetFormInfo();
  };
  const handleSubmit = (e: any) => {
    handleOnSubmit(searchTerm, value);
    dispatch(setIsLoading({ loadDing: false }));
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="sort__class">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container columnSpacing={1}>
          <Grid item xs={1}>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchTerm.day}
                onChange={handleChangeDate}
                name="day"
                sx={{ height: '31px' }}
              >
                {dayOption.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <DatePicker
                inputFormat="yyyy-MM-dd"
                value={searchTerm.startDay}
                onChange={(e: any) => {
                  setSearchTerm({
                    ...searchTerm,
                    startDay: e,
                  });
                }}
                renderInput={(params: any) => (
                  <TextField {...params} size="small" name="regDt_gte" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <FormControl fullWidth size="small">
              <DatePicker
                inputFormat="yyyy-MM-dd"
                value={searchTerm.endDay}
                onChange={(e: any) => {
                  setSearchTerm({
                    ...searchTerm,
                    endDay: e,
                  });
                }}
                renderInput={(params: any) => (
                  <TextField {...params} size="small" name="regDt_lte" />
                )}
              />
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            <FormControl fullWidth size="small">
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={searchTerm.type}
                onChange={handleChangeSearch}
                name="type"
                sx={{ height: '31px' }}
              >
                {sortLike.map((item, index) => {
                  return (
                    <MenuItem key={index} value={item.value}>
                      {item.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={2}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              fullWidth
              size="small"
              placeholder="Please enter the search term"
              name="q"
              type="text"
              onChange={handleChangeSearchTerm}
              value={value}
              sx={{ height: '31px' }}
            />
          </Grid>
          <Grid item xs={1.3}>
            <Button
              className="btna"
              variant="contained"
              sx={{
                width: '100%',
                fontStretch: 'normal',
                fontStyle: 'normal',
                letterSpacing: 'normal',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                height: '31px',
                backgroundColor: '#212121',
              }}
              type="submit"
            >
              Search
            </Button>
          </Grid>
          <Grid item xs={1.7}>
            <Button
              className="btna"
              variant="contained"
              sx={{
                width: '100%',
                fontStretch: 'normal',
                fontStyle: 'normal',
                letterSpacing: 'normal',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                height: '31px',
                backgroundColor: '#6c78a0',
              }}
              onClick={handleReset}
            >
              Initialization
            </Button>
          </Grid>
          <Grid item xs={1}>
            <Button
              className="btna"
              variant="contained"
              sx={{
                width: '100%',
                fontStretch: 'normal',
                fontStyle: 'normal',
                letterSpacing: 'normal',
                fontWeight: 'bold',
                fontSize: '0.8rem',
                height: '31px',
                backgroundColor: '#2196f3',
              }}
              onClick={() => {
                writeF();
              }}
            >
              Write
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};
export default SortBy;
