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

  return dayMap[day];
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
        startTime: `${t.start_time}`,
        endTime: `${t.end_time}`,
        daysOfWeek: [getDateFromDay(t.day)]
      }
    )
  });
  
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