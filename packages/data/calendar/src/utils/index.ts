import moment from 'moment';
import { momentLocalizer } from 'react-big-calendar';

const localizer = momentLocalizer(moment); //

const moveEvent = ({ event, start, end }, updateEvent) => {
  const formData = new FormData();

  formData.append('instance[begins_at]', moment(start).format());
  formData.append('instance[begin_time]', moment(start).format('HH:mm'));
  formData.append('instance[finishes_at]', moment(end).format());
  formData.append('instance[end_time]', moment(end).format('HH:mm'));

  return updateEvent(event.id, formData, 'info');

  // alert(`${event.name} was dropped onto ${start}`);
};

const resizeEvent = (resizeType, { event, start, end }, updateEvent) => {
  const formData = new FormData();

  formData.append('instance[begins_at]', moment(start).format());
  formData.append('instance[begin_time]', moment(start).format('HH:mm'));
  formData.append('instance[finishes_at]', moment(end).format());
  formData.append('instance[end_time]', moment(end).format('HH:mm'));

  return updateEvent(event.id, formData, 'info');
};

// Calendar
const calendarProps = ({ events, onEventDrop, onEventResize }) => ({
  localizer,
  selectable: true,
  resizable: true,
  showMultiDayTimes: true,
  scrollToTime: moment().toDate(),
  onEventDrop, // props => moveEvent(props, updateEvent),
  onEventResize, // (resizeType, props) => resizeEvent(resizeType, props, updateEvent),
  defaultDate: moment().toDate(),
  events,
  defaultView: 'day',
  // startAccessor: event =>
  //   moment(`${event.beginsAt} ${event.beginTime}`).toDate(),
  // endAccessor: event => moment(`${event.finishesAt} ${event.endTime}`).toDate(),
  // titleAccessor: 'name',
  // eventPropGetter: event => ({
  //   style: {
  //     backgroundColor: event.group ? event.group.color : 'white',
  //   },
  // }),
  // onSelectEvent: event => history.push(`/apps/agenda/events/${event.id}`),
  // onSelectSlot: ({ start, end }) =>
  //   history.push(
  //     `/apps/agenda/events/new/${moment(start).format('YYYYMMDDHHmm')}-${moment(
  //       end,
  //     ).format('YYYYMMDDHHmm')}`,
  //   ),
});

export default calendarProps;
