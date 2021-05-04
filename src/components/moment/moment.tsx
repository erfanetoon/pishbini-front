import React from 'react';
import moment from 'moment-jalaali';
import 'moment/locale/fa';

interface propsInterface {
  type: string;
  time?: number;
}

const Moment: React.FC<propsInterface> = (props): any => {
  moment().locale('fa');
  moment.updateLocale('fa', {
    jMonths: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
  });
  if (props.type === 'date') {
    return <span>{moment(props.time).format('jDD jMMMM jYY')}</span>;
  } else if (props.type === 'time') {
    return <span>{moment(props.time).format('HH:mm')}</span>;
  }
};

export default Moment;
