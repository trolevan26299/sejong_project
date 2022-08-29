import moment from 'moment';

export function ParamFilter(searchTerm: any, value: any) {
  switch (searchTerm.type) {
    case 'All': {
      const newParams = {
        regDt_gte: moment(searchTerm.startDay)
          .format('YYYY-MM-DD')
          .concat(' 00:00:00'),
        regDt_lte: moment(searchTerm.endDay)
          .format('YYYY-MM-DD')
          .concat(' 23:59:59'),
        q: value,
      };
      return newParams;
    }
    case 'userName_like': {
      const newParams = {
        regDt_gte: moment(searchTerm.startDay)
          .format('YYYY-MM-DD')
          .concat(' 00:00:00'),
        regDt_lte: moment(searchTerm.endDay)
          .format('YYYY-MM-DD')
          .concat(' 23:59:59'),
        userName_like: value,
      };
      return newParams;
    }
    case 'title_like': {
      const newParams = {
        regDt_gte: moment(searchTerm.startDay)
          .format('YYYY-MM-DD')
          .concat(' 00:00:00'),
        regDt_lte: moment(searchTerm.endDay)
          .format('YYYY-MM-DD')
          .concat(' 23:59:59'),
        title_like: value,
      };
      return newParams;
    }
    case 'body_like': {
      const newParams = {
        regDt_gte: moment(searchTerm.startDay)
          .format('YYYY-MM-DD')
          .concat(' 00:00:00'),
        regDt_lte: moment(searchTerm.endDay)
          .format('YYYY-MM-DD')
          .concat(' 23:59:59'),
        body_like: value,
      };
      return newParams;
    }
    default:
      break;
  }
}
