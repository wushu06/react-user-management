import React from 'react';
import Header from '../../containers/Header';
import $ from 'jquery';
import 'fullcalendar';
import 'moment'
import '../../assets/fullcalendar.min.css'
import firebase from "../../firebase";
import {connect} from "react-redux";
import moment from 'moment';

class Calendar extends React.Component {
    state = {
        ranges: [],
        companyName: this.props.currentUser.displayName,

    }
    componentDidMount() {
        let collection = this.state.companyName.replace(/[^a-zA-Z0-9]/g, '');
        let ranges = []

        firebase.database().ref(collection).child('users').on('child_added', snap => {
            if (snap.val().holiday && 'range' in snap.val().holiday)
                ranges.push({date:snap.val().holiday.range, name: snap.val().firstName});
                 this.setState({ranges:ranges }, ()=> this.showCalendar())

        })





    }

    showCalendar = () => {
        let _self = this
        let events = []
        this.state.ranges.map((date, i) => {
            date.date.map(item => {
                 events = [...events]
                return  events.push({title: date.name, start: item[0], end: item[1]})

            })
        })

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
            events: events

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

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});


export default connect(mapStateToProps)(Calendar);