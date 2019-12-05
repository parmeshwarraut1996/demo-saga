import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
var candidate=require('../models/Candidatemodel');
var candi=new candidate.Candidate
import newStyle from '../pages/Dashboard/Dashboard.less';
import { connect } from 'react-redux';
import { SELECTED_USER, SELECTED_EDIT, MULTI_SELECTED, SELECTED_CARD } from '../constants/actionTypes';
const mapDisapatchToProps = dispatch => ({
    userSelected: (value) =>
        dispatch({ type: SELECTED_EDIT, value }),
    multiSelect: () =>
        dispatch({ type: MULTI_SELECTED }),
    select: (value) =>
        dispatch({ type: SELECTED_CARD, value })
})
const mapStateToProps = state => {
    console.log(" select----->" + state.searchReducer.card);

    return {
        user: state.searchReducer.userSelected,
        multi: state.searchReducer.multiSelected
    }
}
class Usercard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false,
            isloaded: false
        }
    }
    componentDidMount() {
        setTimeout(() => this.setState({
            isloaded: true
        })
            , 1000
        )
    }

    multiSelect(data) {
        if (data.selected === false) {
            data.selected = true
            this.props.array(data)
            this.setState({
                selected: !this.state.selected
            })
            console.log(" <--------------in trure ------->");

        } else {
            data.selected = false
            this.setState({
                selected: !this.state.selected
            })
        }

        console.log("IN MULTI SLECTD" + this.state.selected);
        this.props.select(data)
        // this.setState({
        //     selected: !this.state.selected
        // })
        // console.log("IN MULTI SLECTD ---->" + this.state.selected);
        this.props.multiSelect(data)

    }
    closeShimmer() {
        this.props.method()
    }
    selectedUser(value) {
        this.props.userSelected(value);
        this.props.navigation.navigate("UserInfo")
    }
    render() {

        // console.log("in usercard------> " + JSON.stringify(this.props.data));
        
        // this.props.selectedArray.map((item) => {
        //     if (item.userName === this.props.data.userName) {
        //         style = newStyle.selectedView
        //     }
        //     else {
        //         style = newStyle.Usercard
        //     }
        // })
        // //  console.log(" date of card-->>>"+this.props.data.updateDate);

        // var style =  this.props.data.selected ? newStyle.selectedView : newStyle.Usercard
        return (
        


            <TouchableOpacity
                onPress={() => this.selectedUser(this.props.data)}
            //  onPress={this.props.multi ? () => this.multiSelect(this.props.data) : () => this.selectedUser(this.props.data)}
            // onLongPress={() => this.multiSelect(this.props.data)}
            >
                <View style={newStyle.Usercard}>

                    <View style={newStyle.detailView}>

                        {
                            this.state.isloaded  ?
                                <View style={newStyle.usernameView}>
                                    <Text style={newStyle.cardnameText}>
                                        {this.props.data.name}
                                    </Text>
                                </View>
                                :
                                <ShimmerPlaceHolder autoRun={this.props.autoRun} visible={this.state.isloaded} style={newStyle.usernameView} >
                                    <Text style={newStyle.cardnameText}>
                                        {this.props.data.name}
                                    </Text>
                                </ShimmerPlaceHolder>

                        }

                        {
                            this.state.isloaded ?
                                <View style={newStyle.cardMail}>
                                    <Image style={newStyle.mailIcon} source={require('../assets/email.png')} />
                                    <Text style={newStyle.cardEmailtext}>{this.props.data.emailId}</Text>
                                </View>
                                : <ShimmerPlaceHolder autoRun={this.props.autoRun} visible={this.state.isloaded} style={newStyle.cardMail} >
                                    <Image style={newStyle.mailIcon} source={require('../assets/email.png')} />
                                    <Text style={newStyle.cardEmailtext}>{this.props.data.emailId}</Text>
                                </ShimmerPlaceHolder>

                        }


                        {this.state.isloaded ?
                            <View style={newStyle.cardMail} >
                                <Image style={newStyle.userLocation} source={require('../assets/blackLocation.png')} />
                                <Text style={newStyle.cardEmailtext}>{this.props.data.location}</Text>

                            </View>
                            :
                            <ShimmerPlaceHolder autoRun={this.props.autoRun} visible={this.state.isloaded} style={newStyle.cardMail} >
                                <Image style={newStyle.userLocation} source={require('../assets/blackLocation.png')} />
                                <Text style={newStyle.cardEmailtext}>{this.props.data.location}</Text>
                            </ShimmerPlaceHolder>


                        }





                    </View>
                    {
                        this.state.isloaded ?
                            <View style={newStyle.userDateview}>

                                <Text style={newStyle.userDatetext}>{this.props.data.updateDate}</Text>

                            </View>
                            :
                            <ShimmerPlaceHolder autoRun={this.props.autoRun} visible={this.state.isloaded} style={newStyle.userDateview} >

                                <Text style={newStyle.userDatetext}>{this.props.data.updateDate}</Text>
                            </ShimmerPlaceHolder>

                    }


                </View>

            </TouchableOpacity>

        )
    }
}
export default connect(mapStateToProps, mapDisapatchToProps)(Usercard)