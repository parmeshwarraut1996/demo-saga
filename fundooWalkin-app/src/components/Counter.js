import React, { Component } from 'react';
import { Platform, ScrollView, Text, StyleSheet, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl, View } from 'react-native';
import { connect } from 'react-redux';
import newStyle from '../pages/Dashboard/Dashboard.less'
import { SELECTED_LIST } from '../constants/actionTypes';

const mapDisapatchToProps = dispatch => ({

    selectedList: (value) =>
        dispatch({ type: SELECTED_LIST, value }),


})
const mapStateToProps = state => {


    return {
        user: state.searchReducer.userSelected,
        count: state.dashboardReducer.responseCount,


    }
}
class Counter extends Component {
    acceptSelected() {
        var value = {
            value: "SELECTED",
            listStatus: "Selected"
        }
        this.props.selectedList(value)
        this.props.navigation.navigate("UserList")
    }
    holdSelected() {
        var value = {
            value: "TBD",
            listStatus: "TBD"
        }
        this.props.selectedList(value)
        this.props.navigation.navigate("UserList")

    }
    rejectSelected() {
        var value = {
            value: "REJECTED",
            listStatus: "Rejected"
        }
        this.props.selectedList(value);
        this.props.navigation.navigate("UserList")

    }

    render() {

        return (
            <View style={newStyle.counterOuterview}>
                <View style={newStyle.counterView}>

                    <View style={newStyle.counter}>
                        <TouchableOpacity onPress={() => this.acceptSelected()}>
                            <View style={newStyle.counterinnerView}>
                                <Text style={newStyle.counterNumber}>
                                    {this.props.selected ?
                                        this.props.selected :
                                        <Text>
                                            0
                                            </Text>
                                    }

                                </Text>
                                <Text style={newStyle.counterText}>
                                    SELECTED
                </Text>
                            </View>
                        </TouchableOpacity>

                    </View>

                    <View style={newStyle.TBDcounter}>
                        <TouchableOpacity onPress={() => this.holdSelected()}>
                            <View style={newStyle.tbdinnerView}>
                                {/* <View style={newStyle.counterinnerView}> */}
                                <Text style={newStyle.counterNumber}>
                                    {this.props.tbd ?
                                        this.props.tbd :
                                        <Text>
                                            0
                                        </Text>

                                    }

                                </Text>
                                <View style={newStyle.tbdtextView}>
                                    <Text style={newStyle.tdbCountertext}>TBD</Text>
                                </View>
                                {/* </View> */}
                            </View>
                        </TouchableOpacity>
                    </View>


                    <View style={newStyle.rejectCounter}>
                        <TouchableOpacity onPress={() => this.rejectSelected()}>
                            <View style={newStyle.counterinnerView}>
                                <Text style={newStyle.counterNumber}>
                                    {this.props.rejected ?
                                        this.props.rejected :
                                        <Text>
                                            0
    </Text>
                                    }

                                </Text>
                                <Text style={newStyle.counterText}>
                                    REJECTED
                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>

        )
    }

}
export default connect(mapStateToProps, mapDisapatchToProps)(Counter)