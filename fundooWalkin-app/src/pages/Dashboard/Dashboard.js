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
import Spinner from 'react-native-loading-spinner-overlay';

// import { Card } from "react-native-paper";
// import { Dropdown } from "react-native-material-dropdown";
import newStyle from "../Dashboard/Dashboard.less";
// import Usercard from "../../components/Usercard";
import DateTimePicker from "react-native-modal-datetime-picker";
import Snackbar from "react-native-snackbar";
var countModel = require('../../models/Countmodel');
var count = new countModel.Count()

// import Infocard from "../editUser/Infocard";
import { connect } from "react-redux";
import {
    SELECTED_USER,
    CLOSE_USER,
    SELECTED_LIST,
    GET_COUNT,
    GET_USER,
    CLOSE_UPDATE_RESPONSE,
    GET_COUNT_BY_CITY,
    OPEN_CALENDAR,
    OPEN_LOADING,
    GET_CHAT
} from "../../constants/actionTypes";
// import Popover from "react-native-popover-view";
import Message from "../../components/Message";
import Counter from "../../components/Counter";
import Calendar from "../../components/Calendar";
import Errorpage from "../../components/Errorpage";

const mapDisapatchToProps = dispatch => ({
    userSelected: value => dispatch({ type: SELECTED_USER, value }),
    deleteUser: () => dispatch({ type: CLOSE_USER }),
    selectedList: value => dispatch({ type: SELECTED_LIST, value }),
    getCount: () => dispatch({ type: GET_COUNT }),
    getUser: value => dispatch({ type: GET_USER, value }),
    removeStatus: () => dispatch({ type: CLOSE_UPDATE_RESPONSE }),
    getCityCount: () => dispatch({ type: GET_COUNT_BY_CITY }),
    openCalendar: () =>
        dispatch({ type: OPEN_CALENDAR }),
    openLoading: () =>
        dispatch({ type: OPEN_LOADING }),
        getChat:()=>
        dispatch({type:GET_CHAT})
});
const mapStateToProps = state => {
    // console.log("user dashboard --=>"+JSON.stringify(state.dashboardReducer.user));

    return {
        // user: state.searchReducer.userSelected,
        count: state.dashboardReducer.responseCount,
        user: state.dashboardReducer.user,
        updateResponse: state.dashboardReducer.updateResponse,
        updateStatus: state.dashboardReducer.updateStatus,
        cityWiseCount: state.dashboardReducer.cityWiseCount,
        chats: state.dashboardReducer.chats,
        network: state.dashboardReducer.networkError,
        loading: state.dashboardReducer.loading
    };
};

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: "",
            isSearching: false,
            filterArray: [],
            userSelected: false,
            date: "",
            isDateTimePickerVisible: false,
            isVisible: false,
            refreshing: false
        };
    }
    componentDidMount() {
        this.props.getCount();
        this.props.getUser(this.state.location);
        this.props.getChat()
    }
    updateCount() {
        // thunk
        // this.props.getCount(); // waiting for request
        console.log("in update message");

        // setTimeout(this.updateCount(), 3000);
    }
    updateMessage(data) {
        var message = this.props.updateResponse.data.message;
        console.log("message in response" + message);

        Snackbar.show({
            title: "Candidate update successful",
            duration: Snackbar.LENGTH_SHORT,
            action: {
                title: "SUCCESS",
                color: "green"
            }
        });
        this.props.removeStatus();
    }
    //show date picker component
    showDateTimePicker() {
        // this.setState({ isDateTimePickerVisible: true, date: "" });

        this.props.openCalendar()

    }

    //    handle the selected date picker value and slice it accorrding to the string needed and display to the user
    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        var d = "" + date;
        var a = d.slice(4, 15);
        this.setState({
            date: a
        });
        this.hideDateTimePicker();
    };
    clearSearch() {
        this.searchInput.clear();
        this.setState({
            isSearching: false
        });
    }

    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    //this method is triggred when user enter some value to search usimg user name
    onSearch(text) {
        //check condition idf legth of string is greater than 1
        if (text.toString().length >= 1) {
            console.log(" in search " + text);

            if (text.charAt(0) === "@") {
                var newText = text.substring(1);
                console.log("newtext----->" + newText);

                //then setState and make the search result visible to user bu seting isSearching var =true
                // this.setState({
                //     isSearching: true,

                // });
                this.props.deleteUser();
                //this part will lower case the textInput value and the filtered value from the array of user and searh on basis of user name and will search the index of the particular text in the given usernames
                const newData = this.props.user.filter(function (item) {
                    console.log(" item.name--->" + item.name);

                    return (
                        item.name.toLowerCase().indexOf(newText.toLowerCase()) > -1 ||
                        item.name.toLowerCase().indexOf(newText.toLowerCase()) > -1
                    );
                });
                // if match found the it will set state the filter array to be  displayed
                this.setState({
                    isSearching: true,
                    filterArray: newData
                });
            }
        } else {
            this.setState({
                isSearching: false
            });
        }
    }
    // this method is used to send the selected user and send its value to the reducer for futher oprerations
    selectedUser(user) {
        this.searchInput.clear();
        console.log("user in dashboard" + JSON.stringify(user));

        this.props.navigation.navigate("UserInfo");
        this.props.userSelected(user);
        this.setState({
            isSearching: false
        });
    }
    // this methods changes the value depending upon the list selected and navigate to userlist page
    acceptSelected() {
        var value = {
            value: "SELECTED",
            listStatus: "Selected"
        };
        this.props.selectedList(value);
        this.props.navigation.navigate("UserList");
    }
    holdSelected() {
        var value = {
            value: "TBD",
            listStatus: "TBD"
        };
        this.props.selectedList(value);
        this.props.navigation.navigate("UserList");
    }
    rejectSelected() {
        var value = {
            value: "REJECTED",
            listStatus: "Rejected"
        };
        this.props.selectedList(value);
        this.props.navigation.navigate("UserList");
    }
    showPopper() {
        this.setState({
            isVisible: true
        });
    }
    async pickedItem(val) {
        var selected = "";
        console.warn("value==>" + val);
        await this.setState({ location: val });

        this.props.getUser(this.state.location);
        await this.props.getCityCount();
    }
    unknownError() {



    }
    onRefresh = () => {
        console.log("in refresh");

        this.props.getCount();
        this.props.openLoading()
        this.props.getUser(this.state.location);

    }
    render() {
        if (this.props.network) {
            this.unknownError()
        }
        var today = new Date();
        var date = "" + today;
        var a = date.slice(4, 15);
        // console.log("data   ->>" + JSON.stringify(this.props.count[0]));
        // console.log("data   ->>" + JSON.stringify(this.props.user));
        var selected = "";
        var rejected = "";
        var tbd = "";
        var data = [];
        var array = [];
        var userCount;
        this.props.cityWiseCount.map(countData => {
            if (
                this.state.location.toLowerCase() === countData.location.toLowerCase()
            ) {
                data.push(countData);
            }
        });

        if (this.state.location === "") {
            array = this.props.count;
        } else {
            array = data;
        }
        array.map(item => {
            if (item.status === "Selected") {
                selected = item.count;

            } else if (item.status === "Rejected") {
                rejected = item.count;
            } else if (item.status === "TBD") {
                tbd = item.count;
            }
            userCount = new countModel.Count(rejected, selected, tbd)
            console.log("in model count" + JSON.stringify(userCount));


        });

        console.log("data-->" + selected);
        if (this.props.updateStatus) {
            this.updateMessage(this.props.updateResponse);
        }


        const status = this.props.network ? newStyle.loadingDiv : newStyle.mainDiv
        // console.log("chat user data in dashboard ==> " + JSON.stringify(this.props.chats));

        return (
            <View style={{ flex: 1 }}>
                {this.props.network ?

                    <TouchableOpacity onPress={() => this.onRefresh()}>
                        <Errorpage />
                    </TouchableOpacity>

                    :
                    <View style={newStyle.mainDiv}>

                        <StatusBar backgroundColor="#EA6404" barStyle="dark-content" />
                        <View style={newStyle.topView}>
                            {/* location view  kept to select or change the drive location   */}
                            <View style={newStyle.pickerView}>
                                <View style={newStyle.locationView}>
                                    <Image
                                        style={newStyle.mapIcon}
                                        source={require("../../assets/location.png")}
                                    />
                                    {/* <Text style={newStyle.locationText}> YOUR LOCATION</Text> */}
                                </View>
                                <Picker
                                    selectedValue={this.state.location}
                                    style={newStyle.picker}
                                    itemStyle={{ height: 20, padding: 0, color: "#FFFFFF" }}
                                    // onValueChange={(itemValue, itemIndex) =>
                                    //   this.setState({ location: itemValue })
                                    // }
                                    onValueChange={(itemValue, itemIndex) =>
                                        this.pickedItem(itemValue)
                                    }
                                >
                                    <Picker.Item
                                        color="#000000"
                                        backgroundColor="#000000"
                                        label="ALL"
                                        value=""
                                    />
                                    <Picker.Item
                                        color="#000000"
                                        backgroundColor="#000000"
                                        label="BL-MUMBAI"
                                        value="Mumbai"
                                    />
                                    <Picker.Item
                                        color="#000000"
                                        label="BL-BANGLORE"
                                        value="Bengaluru"
                                    />
                                    <Picker.Item color="#000000" label="BL-PUNE" value="Pune" />
                                </Picker>
                                <Image
                                    style={newStyle.downArrow}
                                    source={require("../../assets/downArrow.png")}
                                />
                                {/* <Picker
                            selectedValue={this.state.location}
                            style={newStyle.picker}
                            itemStyle={{ height: 20, padding: 0, backgroundColor:'#000000' }}
                            onValueChange={(itemValue, itemIndex) =>
                                this.setState({ location: itemValue })
                            }>
                            <Picker.Item color="#FFFFFF" backgroundColor="#000000" label="BL-MUMBAI" value="Mumbai" />
                            <Picker.Item color="#FFFFFF" label="BL-BANGLORE" value="Banglore" />
                            <Picker.Item  color="#FFFFFF"label="BL-PUNE" value="Pune" />

                        </Picker> */}

                                {/* <View>
    <TouchableOpacity onPress={()=>this.showPopper()}>
        <Text> select loaction</Text>
    </TouchableOpacity>
    {this.state.isVisible?
    <Popover placement="bottom" style={{elevation:4 ,zIndex:1000,backgroundColor:'#fffff'}}>
        <Text>BL-MUMBAI</Text>
        <Text>BL-BANGLORE</Text>
        <Text>BL-PUNE</Text>
        </Popover  >
        :
        null
        
        }
    
</View> */}
                            </View>

                            {/* this is datePicker view for selected   drive date */}

                            <View style={newStyle.datePicker}>
                                <TouchableOpacity onPress={() => this.showDateTimePicker()}>
                                    <View style={newStyle.dateView}>
                                        {this.state.date === "" ? (
                                            <Text style={newStyle.dateViewText}>{a}</Text>
                                        ) : (
                                                <Text style={newStyle.dateViewText}>{this.state.date}</Text>
                                            )}

                                        <View>
                                            <Image
                                                style={newStyle.calenderImage}
                                                source={require("../../assets/calendar.png")}
                                            />
                                        </View>
                                    </View>
                                </TouchableOpacity>

                                <DateTimePicker
                                    mode="date"
                                    isVisible={this.state.isDateTimePickerVisible}
                                    onConfirm={this.handleDatePicked}
                                    onCancel={this.hideDateTimePicker}
                                />
                            </View>
                        </View>

                        {/* This is the counter of the student selected,tbh,rejected updated on any changes in the backend file */}

                        <Counter selected={selected} rejected={rejected} tbd={tbd} navigation={this.props.navigation} />
                        <ScrollView style={{ marginTop: 10 }}>

                            <View style={{ flexDirection: "column", alignItems: "center" }}>
                                <Text>{a}</Text>
                            </View>
                            {this.props.loading ?
                                <Spinner
                                    visible={this.props.loading}
                                    color="#EA7D21"

                                />
                                :
                                null}



                            <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
                                <FlatList
                                    horizontal={false}
                                    showsHorizontalScrollIndicator={false}
                                    keyboardShouldPersistTaps="always"
                                    data={this.props.chats.data}
                                    renderItem={({ item }) => (
                                        <Message data={item} navigation={this.props.navigation} />
                                    )}
                                />
                            </View>

                            {/* <Message data={this.props.chats.data} navigation={this.props.navigation} /> */}


                        </ScrollView>
                        <View style={newStyle.bottomView}>
                            {this.state.isSearching ? (
                                <FlatList
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    keyboardShouldPersistTaps="always"
                                    data={this.state.filterArray}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity onPress={() => this.selectedUser(item)}>
                                            <View>
                                                <View style={newStyle.searchUsercard}>
                                                    <View style={newStyle.detailView}>
                                                        <View>
                                                            <Text style={newStyle.usernameText}>{item.name}</Text>
                                                        </View>
                                                        <View style={newStyle.cardMail}>
                                                            <Image
                                                                style={newStyle.mailIcon}
                                                                source={require("../../assets/email.png")}
                                                            />
                                                            <Text style={newStyle.detailText}>
                                                                {item.emailId}
                                                            </Text>
                                                        </View>
                                                        <View style={newStyle.cardMail}>
                                                            <Image
                                                                style={newStyle.userLocation}
                                                                source={require("../../assets/blackLocation.png")}
                                                            />
                                                            <Text style={newStyle.detailText}>
                                                                {item.location}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )}
                                />
                            ) : null}

                            <View style={newStyle.bottomOuter}>
                                <View style={newStyle.searchCard}>
                                    <Image
                                        style={newStyle.searchIcon}
                                        source={require("../../assets/blackSearch.png")}
                                    />
                                    <TextInput
                                        ref={input => {
                                            this.searchInput = input;
                                        }}
                                        style={newStyle.TextInput}
                                        placeholder="Search Candidate"
                                        onChangeText={text => this.onSearch(text)}
                                    />
                                    {this.state.isSearching ? (
                                        <TouchableOpacity onPress={() => this.clearSearch()}>
                                            <View style={newStyle.cancelView}>
                                                <Image
                                                    style={newStyle.cancelIcon}
                                                    source={require("../../assets/cancel.png")}
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                        <Calendar />
                    </View>
                }
            </View>
        );
    }
}
export default connect(
    mapStateToProps,
    mapDisapatchToProps
)(Dashboard);
