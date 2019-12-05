import React, { Component } from "react";
import {
    Platform,
    ScrollView,
    Text,
    StyleSheet,
    Keyboard,
    Picker,
    Button,
    Image,
    TextInput,
    TouchableHighlight,
    KeyboardAvoidingView,
    StatusBar,
    FlatList,
    TouchableOpacity,
    RefreshControl,
    View, ActivityIndicator
} from "react-native";
import { connect } from "react-redux";

import newStyle from "../pages/Dashboard/Dashboard.less";

export default class Errorpage extends Component {
    render() {
        return (
            
            <View style={newStyle.errorView}>
                  <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
                  <Image source={require('../assets/wifi.png')} style={newStyle.reloadIcon}/>
            <Text style={newStyle.Text}>
                Network error

            </Text>
            
            <Text style={newStyle.Text}>
                Check Internet Conneectivity
            </Text>
            <View style={{marginTop:40,alignItems:"center"}}>
            <Text style={newStyle.Text}>
                Tap here to reload
            </Text>
            <Image source={require('../assets/reload.png')} style={newStyle.reloadIcon} />
            </View>
        </View>
    
        )
    }
}