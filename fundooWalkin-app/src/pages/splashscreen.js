import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    StatusBar
} from 'react-native'
import style from './Dashboard/Dashboard.less'
import { StackActions, NavigationActions } from 'react-navigation';

export default class Screen extends Component {

    componentDidMount() {
        setTimeout(() =>
            this.navigateToWalkthrough()
            , 2000);
    }

    navigateToWalkthrough = () => {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "login" })],
        });
        console.log("in");

        this.props.navigation.dispatch(navigateAction);
    }
    render() {
        return (

            <View style={styles.container} >
                <StatusBar backgroundColor="white" barStyle="dark-content" />
                <Image source={require('../assets/logo.png')} />

            </View>

        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
        // backgroundColor: '#f3f2f2',
        // marginTop: 30,

    },
    item: {
        fontSize: 20,
    },
    line: {
        flex: 1,
        height: 0.3,
        backgroundColor: 'darkgray',
    },
})
