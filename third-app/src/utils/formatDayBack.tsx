import moment from 'moment';

export function FormatDayBack(val: any) {
  // const mom = (param:any): any => moment(param)

  const nowDay = new Date();
  switch (val) {
    case 'TODAY': {
      return nowDay;
    }
    case '3 Days': {
      const pastThreeDay = nowDay.setDate(nowDay.getDate() - 3);
      const newPastThreeDay = new Date(pastThreeDay);
      return newPastThreeDay;
    }
    case '1 WEEK': {
      const pastOneWeek = nowDay.setDate(nowDay.getDate() - 7);
      const newPastOneWeek = new Date(pastOneWeek);
      return newPastOneWeek;
    }
    case '1 MONTH': {
      const pastOneMonth = nowDay.setMonth(nowDay.getMonth() - 1);
      const newPastOneMonth = new Date(pastOneMonth);
      return newPastOneMonth;
    }
    case '6 MONTH': {
      const pastSixMonth = nowDay.setMonth(nowDay.getMonth() - 6);
      const newPastSixMonth = new Date(pastSixMonth);
      return newPastSixMonth;
    }
    case '1 YEAR': {
      const pastOneYear = nowDay.setMonth(nowDay.getMonth() - 12);
      const newPastOneYear = new Date(pastOneYear);
      return newPastOneYear;
    }
    default:
      break;
  }
}
