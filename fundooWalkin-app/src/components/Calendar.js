import React, { Component } from 'react';
import { Platform, ScrollView, Text, StyleSheet, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl, View } from 'react-native';
import Popover from 'react-native-popover-view'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { connect } from 'react-redux';
import { CLOSE_CALENDAR } from '../constants/actionTypes';
import newStyle from '../pages/Dashboard/Dashboard.less'
const mapDisapatchToProps = dispatch => ({
    closeCalendar: () =>
        dispatch({ type: CLOSE_CALENDAR }),


})
const mapStateToProps = state => {


    return {
        visible: state.dashboardReducer.calendar


    }
}

class Customcalendar extends Component {
    constructor() {
        super();
        this.state = {
            date: ""
        }
    }
    close() {
        this.props.closeCalendar()

    }
    render() {
        const nextDays = [
            '2019-08-01',
            '2019-08-05',
            '2019-08-08',
            '2019-08-07',
            '2019-08-18',
            '2019-08-17',
            '2019-08-28',
            '2019-08-29'
        ];

        let newDaysObject = {};
        const markeddays = { [this.state.date]: { marked: true } }
        nextDays.push(this.state.date)
        nextDays.forEach((day) => {
            newDaysObject = {
                ...newDaysObject,
                [day]: {
                    selected: true,
                    // marked: true
                }
            };
        });


        return (
            <View>
                <Popover isVisible={this.props.visible} >
                    {/* <CalendarList /> */}
                    <View style={newStyle.calendarInner}>
                        <Calendar theme={{
                            arrowColor: '#F17907',
                            selectedDayBackgroundColor: '#F17907',


                        }}
                            style={{ padding: 10 }}
                            onDayPress={day => {
                                console.log("date ------>" + day.dateString)
                                this.setState({
                                    date: day.dateString
                                })

                            }}

                            markedDates={newDaysObject}
                        // Collection of dates that have to be marked. Default = {}
                        // markedDates={{
                        //     '2019-07-16': { selected: true, marked: true, selectedColor: 'blue' },
                        //     '2019-07-17': { marked: true },
                        //     '2019-06-18': { marked: true, dotColor: 'red', activeOpacity: 0 },
                        //     '2019-08-19': { disabled: true, disableTouchEvent: true }
                        // }}
                        />
                        <View style={newStyle.calendarButtonView}>
                            <TouchableOpacity onPress={() => this.close()}>
                                <Text style={newStyle.calendarText}>
                                    Ok
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.close()}>
                                <Text style={newStyle.calendarText}>
                                    Cancel
                            </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Popover>


            </View>

        )
    }
}
export default connect(mapStateToProps, mapDisapatchToProps)(Customcalendar);