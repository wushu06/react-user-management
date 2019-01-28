import React from 'react';
import Header from '../../containers/Header';
import $ from 'jquery';
import 'fullcalendar';
import 'moment'
import '../../assets/fullcalendar.min.css'

class Calendar extends React.Component {
    componentDidMount() {
        $('#calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2019-01-12',
            navLinks: true, // can click day/week names to navigate views
            selectable: true,
            selectHelper: true,
            select: function(start, end) {
                var title = prompt('Event Title:');
                var eventData;
                if (title) {
                    eventData = {
                        title: title,
                        start: start,
                        end: end
                    };
                    $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                }
                $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: [
                {
                    title: 'All Day Event',
                    start: '2019-01-01'
                },
                {
                    title: 'Long Event',
                    start: '2019-01-07',
                    end: '2019-01-10'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2019-01-09T16:00:00'
                },
                {
                    id: 999,
                    title: 'Repeating Event',
                    start: '2019-01-16T16:00:00'
                },
                {
                    title: 'Conference',
                    start: '2019-01-11',
                    end: '2019-01-13'
                },
                {
                    title: 'Meeting',
                    start: '2019-01-12T10:30:00',
                    end: '2019-01-12T12:30:00'
                },
                {
                    title: 'Lunch',
                    start: '2019-01-12T12:00:00'
                },
                {
                    title: 'Meeting',
                    start: '2019-01-12T14:30:00'
                },
                {
                    title: 'Happy Hour',
                    start: '2019-01-12T17:30:00'
                },
                {
                    title: 'Dinner',
                    start: '2019-01-12T20:00:00'
                },
                {
                    title: 'Birthday Party',
                    start: '2019-01-13T07:00:00'
                },
                {
                    title: 'Click for Google',
                    url: 'http://google.com/',
                    start: '2019-01-28'
                }
            ]
        });


    }
    render() {
        return (
            <div>
                <Header/>
                <div className="block_container">
                    <div id='calendar'></div>

                </div>
                
            </div>
        )
    }
}

export default Calendar;