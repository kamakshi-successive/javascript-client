import moment from 'moment';

function getDateFormatted() {
  moment().format('dddd, MMMM Do YYYY, h:mm:ss a'); // "Sunday, February 14th 2010, 3:25:50 pm";
}
