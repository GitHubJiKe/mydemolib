import * as React from 'react';
import './index.less';

// Delete me
const Thing = () => {
  return (
    <div className="thing">
      <DateSelect
        defaultValue={['2020', '05']}
        onChange={dates => {
          console.log(dates);
        }}
      />
    </div>
  );
};

export default Thing;
type DateValue = [string, string, string] | [string, string] | [string];
interface IDateSelectProps {
  defaultValue: DateValue;
  divider?: string;
  onChange: (dates: DateValue) => void;
}
function addZero(num: number): string {
  if (num > 9) {
    return num.toString();
  }
  return '0' + num;
}
function getYears(): string[] {
  const years: string[] = [];
  for (let index = 2000; index < 2100; index++) {
    years.push(addZero(index));
  }
  return years;
}

function getMonth(): string[] {
  const months: string[] = [];
  for (let index = 1; index < 13; index++) {
    months.push(addZero(index));
  }
  return months;
}

function getDates(month: string, isLeapYear: boolean): string[] {
  const dates = [];
  if (month === '02') {
    if (isLeapYear) {
      for (let index = 1; index < 30; index++) {
        dates.push(addZero(index));
      }
      return dates;
    } else {
      for (let index = 1; index < 29; index++) {
        dates.push(addZero(index));
      }
      return dates;
    }
  }
  switch (month) {
    case '01':
    case '03':
    case '05':
    case '07':
    case '08':
    case '10':
    case '12':
      for (let index = 1; index < 32; index++) {
        dates.push(addZero(index));
      }
      return dates;
    case '04':
    case '06':
    case '09':
    case '11':
      for (let index = 1; index < 31; index++) {
        dates.push(addZero(index));
      }
      return dates;
    default:
      return [];
  }
}

function isLeapYear(year: string | number): boolean {
  const y = parseInt(year.toString());
  if ((y % 4 == 0 && y % 100 != 0) || y % 400 == 0) {
    return true;
  }
  return false;
}

function DateSelect(props: IDateSelectProps) {
  const [yearShow, setYearShow] = React.useState(false);
  const [monthShow, setMonthShow] = React.useState(false);
  const [dateShow, setDateShow] = React.useState(false);
  const newDate = new Date();
  const years = getYears();
  const [year, setYear] = React.useState(
    props.defaultValue[0] || newDate.getFullYear() + ''
  );
  const [month, setMonth] = React.useState(
    props.defaultValue[1] || addZero(newDate.getMonth() + 1)
  );
  const [date, setDate] = React.useState(
    props.defaultValue[2] || addZero(newDate.getDate())
  );
  const openPane = () => {
    setYearShow(true);
    setMonthShow(true);
    setDateShow(true);
  };
  const closePane = () => {
    setYearShow(false);
    setMonthShow(false);
    setDateShow(false);
  };
  React.useEffect(() => {
    props.onChange([year, month, date]);
  }, [year, month, date]);

  React.useEffect(() => {
    const yDom = document.getElementById('year-pane');
    const yIdx = years.findIndex(y => y === year);
    yDom?.scrollTo(0, yIdx * 20 - 80);
  }, [yearShow, monthShow, dateShow]);
  return (
    <div className="select-date">
      <h1 className="dates" onClick={openPane}>
        <span>{year}</span>
        {props.divider || '/'}
        <span>{month}</span>
        {props.divider || '/'}
        <span>{date}</span>
      </h1>
      <div className="pane" id="year-pane">
        {yearShow &&
          years.map(y => (
            <div
              className={year === y ? 'item-selected' : 'item'}
              key={y}
              onClick={() => {
                setYear(y);
                closePane();
              }}
            >
              {y}
            </div>
          ))}
      </div>
      <div className="pane">
        {monthShow &&
          getMonth().map(m => (
            <div
              className={month === m ? 'item-selected' : 'item'}
              key={m}
              onClick={() => {
                setMonth(m);
                closePane();
              }}
            >
              {m}
            </div>
          ))}
      </div>
      <div className="pane" id="date-pane">
        {dateShow &&
          getDates(month, isLeapYear(year)).map(d => (
            <div
              className={date === d ? 'item-selected' : 'item'}
              key={d}
              onClick={() => {
                setDate(d);
                closePane();
              }}
            >
              {d}
            </div>
          ))}
      </div>
    </div>
  );
}
