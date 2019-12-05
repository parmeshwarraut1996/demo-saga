import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import newStyle from '../pages/Loginpage/Login.less'

class Locationcard extends Component {
    constructor() {
        super();
        this.state = {
            selected: false
        }
    }
    onSelect() {
        this.setState({
            selected: !this.state.selected
        })

    }
    render() {
        console.log("in loaction card" + JSON.stringify(this.props.location));


        return (
            <View style={newStyle.locationCard}>
                <TouchableOpacity onPress={() => this.onSelect()}>
                    <View style={newStyle.locationMain}>
                        <View>
                            <Text style={newStyle.collageText}>
                                {this.props.location.name}
                            </Text>
                        </View>
                        <View style={newStyle.loactionView}>
                            <Image style={newStyle.locationImage} source={require('../assets/location.png')} />
                            <Text style={newStyle.locationText}>{this.props.location.location}</Text>
                        </View>
                    </View>


                </TouchableOpacity>
                <View style={newStyle.iconView}>
                    {
                        this.state.selected ?
                            (
                                <Image style={newStyle.checkedImage} source={require('../assets/checked.png')} />
                            )
                            :
                            null
                    }
                </View>
            </View>
        )
    }

}
export default Locationcard