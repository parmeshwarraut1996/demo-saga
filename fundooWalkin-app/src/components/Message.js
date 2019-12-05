import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import newStyle from '../pages/Dashboard/Dashboard.less'
import { SELECTED_EDIT } from '../constants/actionTypes';

const mapDisapatchToProps = dispatch => ({
    closeUser: () =>
        dispatch({ type: CLOSE_USER }),
    closeEdit: () =>
        dispatch({ type: CLOSE_EDIT }),
    editUser: (value) =>
        dispatch({ type: SELECTED_EDIT, value }),
})

const mapStateToProps = state => {

    return {
        user: state.searchReducer.user,
        edit: state.searchReducer.edit
    }
}

class Message extends Component {

    userEdit(value) {
        // console.log("in edit user" + JSON.stringify(value));

        this.props.editUser(value)
        this.props.navigation.navigate("UserInfo")

    }
    render() {
        if (this.props.data !== undefined) {
            console.log("in thus ---=====>" + (this.props.data.status));
            var messageStyle = this.props.data.status === "Selected" ? newStyle.successMessage : newStyle.errorMessage
            var textStyle = this.props.data.status === "Selected" ? newStyle.successText : newStyle.errorText
        }
        var time=this.props.data.updateTime.slice(0,5)

        return (
            this.props.data !== undefined ?
                (
                    <TouchableOpacity onPress={() => this.userEdit(this.props.data)}>
                        <View style={newStyle.messageView}>
                            <View style={messageStyle}>
                                <Text style={textStyle}>
                                    {this.props.data.name} {this.props.data.status}</Text>
                            </View>
                            <View>
                                <Text style={{marginRight:5}}>{time}</Text>

                            </View>
                        </View>

                    </TouchableOpacity>)
                :
                null


        )
    }
}
export default connect(mapStateToProps, mapDisapatchToProps)(Message);