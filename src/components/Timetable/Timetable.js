import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const getDateFromDay = (day) =>
{
  const dayMap = {
    "Sunday" : 0,
    "Monday" : 1,
    "Tuesday" : 2,
    "Wednesday" : 3,
    "Thursday" : 4,
    "Friday" : 5,
    "Saturday" : 6
  }

  const today = new Date();
  const week_day = today.getDay();
  const month = today.getMonth();
  const year = today.getFullYear();
  const date = today.getDate();

  return(`${year}-0${month + 1}-0${date + Math.abs((dayMap[day] - week_day))}`);
}

const Timetable = ({ tt }) =>
{
  let events = [];
  tt.forEach((t) =>
  {
    events.push(
      {
        id: t.tt_id,
        title: t.type,
        start: `${getDateFromDay(t.day)}T${t.start_time}`,
        end: `${getDateFromDay(t.day)}T${t.end_time}`
      }
    )
  });
  console.log(events);
  return (
      <FullCalendar
        plugins = {[ timeGridPlugin  ]}
        initialView = "timeGridWeek"
        aspectRatio = "2.5"
        slotMinTime = "08:00"
        slotMaxTime = "18:00"
        events = {events}
      />
    )
}

export default Timetable;