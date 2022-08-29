import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function DashBoard() {
  const matches = useMediaQuery('(min-width:1700px)');

  return (
    <div className="content__app">
      <div className="content__app-UI">
        <Box
          sx={{
            width: '100%',
            height: '100%',
            position: 'relative',
          }}
        >
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="w-100 h-100"
            columnSpacing={!matches ? 0 : 3}
          >
            <Grid
              className={`${
                !matches ? 'reponsive__content-1 w-100 h-100' : 'w-100 h-100'
              }`}
              item
              xs={12}
              md={7}
            >
              <Item className="bg-blue">
                <div className="content__app-infomation-seven">BoardList</div>
              </Item>
            </Grid>
            <Grid
              className={`${
                !matches ? 'reponsive__content-2 w-100 h-100' : 'w-100 h-100'
              }`}
              item
              xs={7}
              md={5}
            >
              <Item className="bg-red">
                <div className="content__app-infomation-five">
                  Infomation area
                </div>
              </Item>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
}
