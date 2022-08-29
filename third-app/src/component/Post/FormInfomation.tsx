import CheckIcon from '@mui/icons-material/Check';
import { Button, Grid } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CheckPwd } from '../../utils/checkPwd';
import { Product } from '../types';
import { setInfoHTML, setIsLoading } from '../../redux/Slice/postSlice';
import { setSnackbar } from '../../redux/Slice/snackbar';

interface IProps {
  handleSubmitFormBody: any;
  nowObject?: Product | null;
  handleResetFormInfo?: any;
  handleDelById?: any;
}

const Infomation = (props: IProps) => {
  const {
    handleSubmitFormBody,
    nowObject,
    handleResetFormInfo,
    handleDelById,
  } = props;

  const handleResetInfoForm = () => {
    handleResetFormInfo();
    dispatch(setInfoHTML({ infoHTML: true }));
    setCheckRegex({
      uppercase: false,
      lowercase: false,
      number: false,
      symbol: false,
      lengthText: false,
    });
    setBodyForm(defaultValue);
    const elem: any = $('#summernote');
    elem.summernote('code', '');
  };
  const dispatch = useDispatch();
  const defaultValue = {
    id: null,
    category: 'Life',
    email: '',
    userName: '',
    pwd: '',
    viewCnt: 0,
    title: '',
    body: '',
    regDt: `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`,
  };
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    if (nowObject) {
      if (bodyForm.pwd === '') {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Enter your password!',
          }),
        );
      } else if (bodyForm.pwd === nowObject?.pwd && nowObject) {
        const elem: any = $('#summernote');
        const bodyElem = elem.summernote('code');
        dispatch(setIsLoading({ loadDing: false }));
        handleResetInfoForm();
        handleSubmitFormBody({ ...bodyForm, body: bodyElem });
      } else {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Incorrect password!',
          }),
        );
      }
    } else if (nowObject === null) {
      console.log('a', bodyForm.pwd);

      if (bodyForm.pwd === '') {
        console.log('enter pass');
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Enter your password!',
          }),
        );
      } else if (
        checkRegex.lengthText &&
        checkRegex.lowercase &&
        checkRegex.number &&
        checkRegex.symbol &&
        checkRegex.uppercase
      ) {
        const elem: any = $('#summernote');
        const bodyElem = elem.summernote('code');
        dispatch(setIsLoading({ loadDing: false }));
        handleResetInfoForm();
        handleSubmitFormBody({ ...bodyForm, body: bodyElem });
      } else {
        console.log('pass is format');
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Password is not format',
          }),
        );
      }
    }
  };

  const [bodyForm, setBodyForm] = useState<Product>(defaultValue);

  const [checkRegex, setCheckRegex] = useState({
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    lengthText: false,
  });

  const handleChangePW = (e: any) => {
    const textRegex = e.target.value;
    CheckPwd(textRegex, setCheckRegex, checkRegex);
    setBodyForm({ ...bodyForm, pwd: textRegex });
    console.log(checkRegex);
  };

  const handleChangeRadio = (e: any, value: any) => {
    setBodyForm((prevBodyForm) => ({ ...prevBodyForm, category: value }));
  };

  const handleDel = () => {
    if (nowObject) {
      if (bodyForm.pwd === '') {
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Enter your password!',
          }),
        );
      } else if (bodyForm.pwd === nowObject?.pwd && nowObject) {
        dispatch(setInfoHTML({ infoHTML: true }));
        dispatch(setIsLoading({ loadDing: false }));
        handleDelById();
        handleResetInfoForm();
      } else {
        console.log('body.pwd !== nowObject.pwd');
        dispatch(
          setSnackbar({
            snackbarOpen: true,
            snackbarType: 'error',
            snackbarMessage: 'Incorrect password!',
          }),
        );
      }
    }
  };

  useEffect(() => {
    const elem: any = $('#summernote');
    if (nowObject) {
      setBodyForm({
        id: nowObject.id,
        category: nowObject.category,
        email: nowObject.email,
        userName: nowObject.userName,
        pwd: '',
        viewCnt: nowObject.viewCnt,
        title: nowObject.title,
        body: nowObject.body,
        regDt: `${moment(new Date()).format('YYYY-MM-DD HH:mm:ss')}`,
      });
      elem.summernote('code', nowObject.body);
      setCheckRegex({
        uppercase: false,
        lowercase: false,
        number: false,
        symbol: false,
        lengthText: false,
      });
    } else {
      setBodyForm(defaultValue);
      elem.summernote('code', '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nowObject]);

  useEffect(() => {
    const elem: any = $('#summernote');
    elem.summernote({
      placeholder: 'Enter content....',
      tabsize: 2,
      focus: true,
      disableResizeEditor: true,
      toolbar: [
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['font', ['strikethrough', 'superscript', 'subscript']],
        ['fontsize', ['fontsize']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['height', ['height']],
        ['table', ['table']],
        ['insert', ['link', 'picture', 'video']],
        ['view', ['fullscreen', 'codeview', 'help']],
      ],
      popover: {
        image: [
          [
            'image',
            ['resizeFull', 'resizeHalf', 'resizeQuarter', 'resizeNone'],
          ],
          ['float', ['floatLeft', 'floatRight', 'floatNone']],
          ['remove', ['removeMedia']],
        ],
        link: [['link', ['linkDialogShow', 'unlink']]],
        table: [
          ['add', ['addRowDown', 'addRowUp', 'addColLeft', 'addColRight']],
          ['delete', ['deleteRow', 'deleteCol', 'deleteTable']],
        ],
        air: [
          ['color', ['color']],
          ['font', ['bold', 'underline', 'clear']],
          ['para', ['ul', 'paragraph']],
          ['table', ['table']],
          ['insert', ['link', 'picture']],
        ],
        styleTags: [
          'p',
          {
            title: 'Blockquote',
            tag: 'blockquote',
            className: 'blockquote',
            value: 'blockquote',
          },
          'pre',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
        ],
      },
      codemirror: {
        theme: 'monokai',
      },
    });
    $('.note-statusbar').hide();
  }, []);
  return (
    <form onSubmit={handleSubmitForm} id="myForm">
      <div className="category">
        <div className="chooseCategory">Category</div>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            value={bodyForm.category}
            name="radio-buttons-group"
            onChange={handleChangeRadio}
          >
            <div className="chooseCategory-life">
              <FormControlLabel
                value="Life"
                control={<Radio size="small" value="Life" />}
                label="Life"
              />
            </div>
            <div className="chooseCategory-special-report">
              <FormControlLabel
                value="Special Report"
                control={<Radio size="small" value="Special Report" />}
                label="Special Report"
              />
            </div>
            <div className="chooseCategory-behind-story">
              <FormControlLabel
                value="Behind story"
                control={<Radio size="small" value="Behind story" />}
                label="Behind story"
              />
            </div>
          </RadioGroup>
        </FormControl>
      </div>
      <div className="form__info">
        <div className="form__info-title">
          <TextField
            id="outlined-basic"
            variant="outlined"
            fullWidth
            size="small"
            placeholder="Please enter a title"
            name="title"
            type="text"
            sx={{ height: '35px' }}
            onChange={(e) => {
              setBodyForm({
                ...bodyForm,
                title: e.target.value,
              });
            }}
            value={bodyForm.title}
          />
        </div>
        <form className="form__info-summerNote">
          <textarea id="summernote" name={bodyForm.body} />
        </form>
        <div className="form__info-create">
          <Grid container>
            <Grid
              item
              xs={3.5}
              sx={{ alignItems: 'center', justifyContent: 'center' }}
            >
              <div className="checkInfo">
                <p className="titleCheck">Writer</p>
                <TextField
                  id="demo-helper-text-aligned-no-helper"
                  placeholder="Enter Name"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  size="small"
                  name="name"
                  value={bodyForm.userName}
                  type="text"
                  onChange={(e) => {
                    setBodyForm({
                      ...bodyForm,
                      userName: e.target.value,
                    });
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={8.5} sx={{ paddingLeft: '24px' }}>
              <div className="checkInfo">
                <p className="titleCheck">E-Mail</p>
                <TextField
                  id="demo-helper-text-aligned-no-helper"
                  placeholder="Enter Email"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  size="small"
                  className="tf"
                  name="email"
                  value={bodyForm.email}
                  type="email"
                  onChange={(e) => {
                    setBodyForm({
                      ...bodyForm,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
            </Grid>
            <Grid item xs={3.5} sx={{ marginTop: '10px' }}>
              <div className="checkInfo">
                <p className="titleCheck">Password</p>
                <TextField
                  placeholder="Enter Password"
                  InputLabelProps={{ style: { fontSize: 12 } }}
                  size="small"
                  className="tf"
                  onChange={handleChangePW}
                  name="pwd"
                  type="password"
                  value={bodyForm.pwd}
                />
              </div>
            </Grid>
            <Grid item xs={8.5} sx={{ marginTop: '10px' }}>
              <div className="checkInfo" style={{ paddingLeft: '11px' }}>
                <div className="checkInfo check2">
                  <CheckIcon
                    style={{
                      color: checkRegex.uppercase
                        ? '#2196f3'
                        : 'rgba(0, 0, 0, 0.48)',
                    }}
                  />
                  <p className="checkicon">uppercase</p>
                </div>
                <div className="checkInfo check2">
                  <CheckIcon
                    style={{
                      color: checkRegex.lowercase
                        ? '#2196f3'
                        : 'rgba(0, 0, 0, 0.48)',
                    }}
                  />
                  <p className="checkicon">lowercase</p>
                </div>
                <div className="checkInfo check2">
                  <CheckIcon
                    style={{
                      color: checkRegex.number
                        ? '#2196f3'
                        : 'rgba(0, 0, 0, 0.48)',
                    }}
                  />
                  <p className="checkicon ">number</p>
                </div>
                <div className="checkInfo check2">
                  <CheckIcon
                    style={{
                      color: checkRegex.symbol
                        ? '#2196f3'
                        : 'rgba(0, 0, 0, 0.48)',
                    }}
                  />
                  <p className="checkicon">symbol</p>
                </div>
                <div className="checkInfo check2">
                  <CheckIcon
                    style={{
                      color: checkRegex.lengthText
                        ? '#2196f3'
                        : 'rgba(0, 0, 0, 0.48)',
                    }}
                  />
                  <p className="checkicon">8-16</p>
                </div>
              </div>
            </Grid>
          </Grid>
          <hr style={{ margin: '19px 0 0px 0' }} />
          <div className="buttonInfo">
            <Button className="btna" variant="contained" type="submit">
              Save
            </Button>

            {nowObject ? (
              <Button
                className="btna btnb"
                variant="contained"
                onClick={handleDel}
              >
                Delete
              </Button>
            ) : (
              <Button
                variant="contained"
                style={{ textTransform: 'none' }}
                onClick={handleDel}
                disabled
              >
                Delete
              </Button>
            )}

            <Button
              className="btna btnb"
              variant="contained"
              onClick={handleResetInfoForm}
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Infomation;
