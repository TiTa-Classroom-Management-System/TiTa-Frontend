import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";

import "./Timetable.css";

const getDateFromDay = (day) => {
    const dayMap = {
        Sunday: 0,
        Monday: 1,
        Tuesday: 2,
        Wednesday: 3,
        Thursday: 4,
        Friday: 5,
        Saturday: 6,
    };

    return dayMap[day];
};

const getTitle = (t) => {
    return t.type && t.course_code && t.branchname && t.branchyear && t.grp_no
        ? `${t.type} | ${t.course_code} | ${t.branchname}-${t.grp_no} | ${t.branchyear}`
        : `${t.type} | ${t.course_code}`;
};

const Timetable = ({ tt }) => {
    const colors = [
        "#206a5d",
        "#ec4646",
        "#4a47a3",
        "#845ec2",
        "#ff7b54",
        "#865858",
    ];
    let course_codes = [];

    tt.forEach((t) => {
        course_codes.push(t.course_code);
    });

    const unique_course_codes = [...new Set(course_codes)];

    let set_colors = {};
    for (let i = 0; i < unique_course_codes.length; i++) {
        set_colors[unique_course_codes[i]] = colors[i];
    }

    let events = [];
    tt.forEach((t) => {
        events.push({
            id: t.tt_id,
            title: getTitle(t),
            startTime: `${t.start_time}`,
            endTime: `${t.end_time}`,
            daysOfWeek: [getDateFromDay(t.day)],
            color: set_colors[t.course_code],
        });
    });
    return (
        <div>
            <div className="tt-large">
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridWeek"
                    aspectRatio="2.5"
                    slotMinTime="08:00"
                    slotMaxTime="18:00"
                    nowIndicator={true}
                    allDaySlot={false}
                    events={events}
                />
            </div>
            <div className="tt-small">
                <FullCalendar
                    plugins={[listPlugin]}
                    initialView="listWeek"
                    events={events}
                />
            </div>
            <hr />
        </div>
    );
};

export default Timetable;
