import React, { Component } from 'react';
import { TextField } from 'react-native-material-textfield';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    Linking,
    StatusBar,
    Picker,
    ScrollView,
    FlatList,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
import { connect } from 'react-redux';

import Snackbar from 'react-native-snackbar';


import newStyle from '../Loginpage/Login.less';//less file css required in variable
import { TextInput, HelperText, ActivityIndicator } from 'react-native-paper';
import { LOGIN_USER, CLOSE_ERROR, OPEN_LOADING, CLOSE_LOADING, NETWORK_ERROR_CLOSE } from '../../constants/actionTypes';
import { StackActions, NavigationActions } from 'react-navigation';
// import Locationcard from '../../components/Locationcard';

const mapDisapatchToProps = dispatch => ({
    userLogin: (value) =>
        dispatch({ type: LOGIN_USER, value }),
    removeError: () =>
        dispatch({ type: CLOSE_ERROR }),
    addLoading: () =>
        dispatch({ type: OPEN_LOADING }),
    closeLoading: () =>
        dispatch({ type: CLOSE_LOADING }),
        CloseNetwork:()=>
        dispatch({type:NETWORK_ERROR_CLOSE})
})
const mapStateToProps = state => {
    return {
        success: state.loginReducer.successStatus,
        error: state.loginReducer.errorStatus,
        errorMessage: state.loginReducer.error,
        loading: state.loginReducer.loading,
        network:state.loginReducer.networkError
    }
}


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            focused: false,
            list: [],
            loginFocus: false,
            userName: "",
            Password: "",
            usernameError: "",
            passwordError: ""
        }
        pickerRef = React.createRef();
        this.onSubmit = this.onSubmit.bind(this)
        this.setLocation = this.setLocation.bind(this)
    }

    CheckConnectivity(detail) {
        // For Android devices
        var flag = false
        this.passwordInput.blur()
        this.emailInput.blur()
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    console.log(" in is connected");
                    {
                        this.props.addLoading()
                        this.props.userLogin(detail)
                        //  setTimeout(() => { this.unknownError() }, 5000);
                    }

                    flag = true
                } else {
                    console.log(" in else of net");

                    Snackbar.show({
                        title: "Check Internet  connection",
                        duration: Snackbar.LENGTH_SHORT,
                        action: {
                            title: 'ERROR',
                            color: 'red',

                        },
                    });
                    flag = false
                }
            });
        }
        return flag;
    };

    unknownError() {
        this.props.closeLoading()
        Snackbar.show({
            title: "Network error",
            duration: Snackbar.LENGTH_SHORT,
            action: {
                title: 'ERROR',
                color: 'red',

            },
        });
        this.props.CloseNetwork()

    }
    //this method is to set the location in the picker for futher classification in the dropdown
    setLocation(Value) {
        console.log("in select value");

        this.setState({
            location: Value,
            focused: true,
            function() {
                console.log(this.state.location)
            }
        })
        console.log("in select value" + this.state.location);

        console.log("in location" + JSON.stringify(this.state.list));


    }
    onLogin() {
        this.setState({
            loginFocus: true
        })
    }

    //this method is triggred when the login button is pressed and navigation to the other  page on valid credentials 
    // done in this method/


    onSubmit(userName, Password) {

        if (!this.validate()) {


            var detail = {
                loginId: userName,
                password: Password
            }
            console.log("array of users-->" + JSON.stringify(detail));

            this.CheckConnectivity(detail)
            {
                // this.props.addLoading()
                // this.props.userLogin(detail)
            }
            console.log("in submit");


            console.log("in submit");
        }
    }
    loginRedirect() {
        const navigateAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Dashboard" })],
        });
        console.log("in");

        this.props.navigation.dispatch(navigateAction);
    }


    validate = () => {
        var flag = false;
        console.log('in validate')
        console.warn('username---', this.state.Username)
        console.warn('password--', this.state.Password)

        /**
         * array of errors to define helper text
         */

        const error = {
            usernameError: "",
            passwordError: '',


        }


        if (this.state.userName.length === 0) {
            flag = true
            error.usernameError = 'Required'

        }
        if (!this.validateEmail(this.state.userName)) {
            flag = true,
                error.usernameError = "Email address is badly formatted"



        }




        if (this.state.Password.length < 8) {
            flag = true;
            error.passwordError = "*password must have 8 characters "

        }
        if (this.state.Password.length === 0) {
            flag = true
            error.passwordError = "Required"



        }
        /**
         * if errors are caught in validation
         * set the same state and array of erroors deisplaying error text
         */
        this.setState({
            ...this.state,
            ...error
        })
        /**
         *
         * returning flag value for futher validation
         */
        return flag
    }

    validateEmail(email) {
        var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        return re.test(email);
    }
    handleUsername(email) {


        console.log(" in handle username" + email);
        // await this.setState({
        //     userName: text
        // })
        if (this.state.userName.length === 0) {
            this.setState({
                usernameError: 'Required'
            })
        }

       else if (!this.validateEmail(email)) {
            this.setState({


                usernameError: "Email address is badly formatted"

            })

        }
        else {
            this.setState({
                usernameError: ""
            })
            this.passwordInput.focus()
        }





    }
    handlePassword(password) {
        console.log("in handle password" + password);


        if (this.state.Password.length === 0) {
            this.setState({
                passwordError: "Required"
            })
            return false

        }
        else if (this.state.Password.length >= 1 && this.state.Password.length < 8) {
            this.setState({
                passwordError: "Password must  have eight characters"
            })
            return false
        }
        else {
            this.setState({
                passwordError: ""
            })
            this.onSubmit(this.state.userName, this.state.Password)

            return true
        }

    }

    handleError() {
        console.log("in handle error" + JSON.stringify(this.props.errorMessage))
        var message = this.props.errorMessage.message
        console.log("messgae--->" + message);

        Snackbar.show({
            title: message,
            duration: Snackbar.LENGTH_SHORT,
            action: {
                title: 'ERROR',
                color: 'red',

            },
        });
        this.props.removeError();

    }

    render() {
        var loginStyle = this.state.loginFocus ? newStyle.loginButtonFocused : newStyle.loginButton
        // if else conditioning used to select the array on base on sate location variables
        console.log(" email test" + this.validateEmail(this.state.userName));

        // this const is used to perform conditional rendering of the picker by changing th css value of border
        const borderTheme = this.state.focused ? newStyle.Dropdown : newStyle.DropdownBefore
        // this const is used to perform conditional rendering of the picker by changing th css value of the textu
        if (this.props.success) {
            this.loginRedirect()
        }
        else if (this.props.error) {
            this.handleError()
        }
        if(this.props.network && !this.props.error){
            this.unknownError()
        }
        const textTheme = this.state.focused ? newStyle.locationTextAfter : newStyle.locationTextBefore
        return (

            // <KeyboardAvoidingView style={{ flex: 1 }}>


            <View style={newStyle.mainView} >
                {/* <StatusBar backgroundColor="#F8F8F8" /> */}
                {/* <ScrollView > */}
                {/* <View style={newStyle.ScrollView}> */}
                <View style={newStyle.logoView}>
                    <Image style={newStyle.mainLogo} source={require("../../assets/logo.png")} />

                </View>
                <View style={newStyle.TextfieldView} >
                    {/* <View style={newStyle.viewTextfield}> */}
                    <TextInput
                        style={newStyle.TextField}
                        theme={{ colors: { primary: '#E26003', background: "#FFFFFF" } }}
                        placeholder="Enter Name "
                        label="Name"
                        error={this.state.usernameError}
                        ref={(input) => { this.emailInput = input; }}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.handleUsername(this.state.userName) }}
                        mode="outlined"
                        onEndEditing={()=>this.handleUsername(this.state.userName)}
                        blurOnSubmit={false}
                        value={this.state.userName}
                        // onChange={()=>this.handleUsername(this.state.userName)}
                        onChangeText={(text) => this.setState({ userName: text })}
                    >

                    </TextInput>
                    <View style={newStyle.helperTextView}>
                        <HelperText
                            type="error"
                            visible={this.state.usernameError}
                        >{this.state.usernameError} </HelperText>
                    </View>
                    {/* </View> */}
                    {/* <View style={newStyle.TextfieldView} > */}
                    <TextInput
                        ref={(input) => { this.passwordInput = input; }}
                        style={newStyle.TextField}
                        theme={{ colors: { primary: '#E26003', background: "#FFFFFF" } }}
                        placeholder="Enter Password"
                        label="Password"
                        secureTextEntry={true}
                        mode="outlined"
                        onEndEditing={()=>this.handlePassword(this.state.Password)}
                        error={this.state.passwordError}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.handlePassword(this.state.Password) }}
                        blurOnSubmit={false}
                        value={this.state.Password}
                        onChangeText={(text) => this.setState({ Password: text })}
                    >

                    </TextInput>
                    <View style={newStyle.helperTextView}>


                        <HelperText
                            type="error"
                            visible={this.state.passwordError}
                        >{this.state.passwordError} </HelperText>
                    </View>
                    {/* </View> */}
                    {/* <View
                                    ref={this.pickerRef}

                                    style={borderTheme}>
                                    <View
                                        onPress={() => this.onFocus()

                                        }

                                        style={newStyle.locationView}>
                                        <Text style={textTheme}>Location</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => this.focusedPicker()} onPressOut={() => this.endFocused()}>
                                        <Picker

                                            selectedValue={this.state.location}

                                            style={newStyle.Dropdown}
                                            onValueChange={(itemValue, itemIndex) => this.setLocation(itemValue)

                                            }>
                                            <Picker.Item label="--Select Location--" value="" />
                                            <Picker.Item label="Mumbai" value="Mumbai" />
                                            <Picker.Item label="Banglore" value="Banglore" />
                                            <Picker.Item label="Pune" value="Pune" />

                                        </Picker>
                                    </TouchableOpacity>
                                </View> */}
                    <View style={newStyle.bottomView}>
                        {this.props.loading ?
                            <ActivityIndicator color="#F17907" ></ActivityIndicator>
                            :
                            (

                                <TouchableOpacity onPress={() => this.onSubmit(this.state.userName, this.state.Password)}>
                                    <View style={newStyle.loginButton}
                                        ref={(button) => { this.loginButton = button; }}
                                    >
                                        <Text style={newStyle.loginText}>
                                            Login
                                        </Text>
                                    </View>
                                </TouchableOpacity>

                                // ) :
                                // (
                                //     <View style={newStyle.loginButtonFocused}
                                //         ref={(button) => { this.loginButton = button; }}
                                //     >
                                //         <Text style={newStyle.loginText}>
                                //             Login
                                //         </Text>
                                //     </View>
                                // )



                            )

                        }

                    </View>

                </View>


            </View>
            /* </ScrollView> */

            // </View>

            // </KeyboardAvoidingView>

        )
    }
}
export default connect(mapStateToProps, mapDisapatchToProps)(Login)