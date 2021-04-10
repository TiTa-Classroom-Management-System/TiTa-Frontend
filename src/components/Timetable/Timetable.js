import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

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

const getTitle = (t) =>
{
  return (t.type && t.course_code && t.branchName && t.branchYear) ? (`${t.type} | ${t.course_code} | ${t.branchName} | ${t.branchYear}`) : (`${t.type} | ${t.course_code}`);
}

const Timetable = ({ tt }) =>
{
  let events = [];
  tt.forEach((t) =>
  {
    events.push(
      {
        id: t.tt_id,
        title: getTitle(t),
        startTime: `${t.start_time}`,
        endTime: `${t.end_time}`,
        daysOfWeek: [getDateFromDay(t.day)]
      }
    )
  });
  return (
    <div>
      <div className = "tt-large">
      <FullCalendar
        plugins = {[ timeGridPlugin  ]}
        initialView = "timeGridWeek"
        aspectRatio = "2.5"
        slotMinTime = "08:00"
        slotMaxTime = "18:00"
        nowIndicator={true}
        allDaySlot={false}
        events = {events}
      />
      </div>
      <div className = "tt-small">
        <FullCalendar
          plugins = {[listPlugin]}
          initialView = 'listWeek'
          events = {events}
        />
      </div>
    </div>
    )
}

export default Timetable;