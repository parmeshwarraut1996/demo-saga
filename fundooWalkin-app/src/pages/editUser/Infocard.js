import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Keyboard, ScrollView, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl } from 'react-native';

import newStyle from '../editUser/infocard.less';
import { list } from '../../file';
import { connect } from 'react-redux';
import { Chip, RadioButton } from 'react-native-paper';
import { CLOSE_USER, CLOSE_EDIT, UPDATE_USER, GET_COUNT, CLOSE_UPDATED, CLOSE_LOADING, CLOSE_UPDATE_LOADING } from '../../constants/actionTypes';
import NetInfo from "@react-native-community/netinfo";
import LinearGradient from 'react-native-linear-gradient';
import ModalDropdown from 'react-native-modal-dropdown';
import Snackbar from "react-native-snackbar";
import Spinner from 'react-native-loading-spinner-overlay';


const mapDispatchToProps = dispatch => ({
    closeUser: () =>
        dispatch({ type: CLOSE_USER }),
    closeEdit: () =>
        dispatch({ type: CLOSE_EDIT }),
    userUpdate: (value) =>
        dispatch({ type: UPDATE_USER, value }),
    getCount: () =>
        dispatch({ type: GET_COUNT }),
    closeUpdated: () =>
        dispatch({ type: CLOSE_UPDATED }),
    closeLoading: () =>
        dispatch({ type: CLOSE_UPDATE_LOADING })
})

const mapStateToProps = state => {
    // console.log("user" + JSON.stringify(state.searchReducer))
    return {
        user: state.searchReducer.user,
        edit: state.searchReducer.edit,
        list: state.searchReducer.listSelected,
        userUpdated: state.dashboardReducer.userUpdated,
        loading: state.dashboardReducer.updateLoading
    }
}



class Infocard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: this.props.user.status,
            value: 0,
            edit: false,
            Attitude: this.props.user.codeSkills,
            Communication: this.props.user.comm,
            Knowledge: this.props.user.passion,
            saveFocus: false,
            remark: this.props.user.remark,
            added: false
        }
    }
    //this will set state the value of selected value to the radio button
    onradioPress(value) {
        // console.log("in radio value" + value);
        this.setState({
            checked: value
        })


    }
    CheckConnectivity(user) {
        // For Android devices
        var flag = false
        if (Platform.OS === "android") {
            console.log("in check conectivityy");

            NetInfo.isConnected.fetch().then(isConnected => {
                if (isConnected) {
                    console.log(" in is connected");
                    {
                        this.props.userUpdate(user)
                        setTimeout(() => { this.unknownError() }, 3000);

                        // this.props.getCount()
                        // this.props.navigation.navigate("Dashboard")
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

    handleUpdate(user) {
        user.status = this.state.checked,
            user.remark = this.state.remark,
            user.codeSkills = this.state.Attitude,
            user.passion = this.state.Knowledge,
            user.comm = this.state.Communication
        // console.log("user after change--->" + JSON.stringify(user));
        this.CheckConnectivity(user)





    }
    unknownError() {
        console.log(" in unknown error" + this.props.userUpdated);

        this.props.closeLoading()
        if (!this.state.added) {
            console.log("===--==--======addedd---=-----  " + this.state.added);
            Snackbar.show({
                title: "Network error ",
                duration: Snackbar.LENGTH_SHORT,
                action: {
                    title: 'ERROR',
                    color: 'red',

                },
            });

        }
        else {
            console.log("===--==--======addedd---=-----  " + this.state.added);

        }

    }
    handleSkill(option, skill) {
        console.log("skillss===>" + skill + "Option===>" + option);

        const values = { TDB, Ok, Fine, Good }

        if (skill === 'Attitude') {
            this.setState({
                Attitude: values[option]
            })
        }
        else if (skill === 'Communication') {
            this.setState({
                Communication: values[option]
            })
        }
        else if (skill === 'Knowledge') {
            this.setState({
                Knowledge: values[option]
            })
        }
    }
    editPoint() {
        this.props.closeEdit()
        this.setState({
            edit: true
        })

    }
    cancelReview() {
        this.props.closeUser();
        this.props.navigation.navigate("Dashboard")
    }
    goBack() {
        this.props.closeEdit()
        this.setState({
            edit: false
        })
        if (this.props.list !== "") {
            this.props.navigation.navigate("UserList")
        }
        else {
            this.props.navigation.navigate("Dashboard")
        }


    }
    navigate() {
        console.log("in navigate");

        this.props.navigation.navigate("Dashboard")
        this.props.closeUpdated()
        this.setState({
            added: true
        })
    }
    onSave() {
        this.setState({
            saveFocus: true
        })

    }
    render() {
        console.log("update response --==>" + this.props.updateResponse);

        // this constasnts used to change the radio button on basis of click 
        // const saveButton = this.state.saveFocus ? newStyle.saveButton : newStyle.cancelButton
        const selected = this.state.checked === 'Selected' ? newStyle.selectedText : newStyle.unselectedText
        const tbd = this.state.checked === 'TBD' ? newStyle.tbdText : newStyle.unselectedText
        const rejected = this.state.checked === 'Rejected' ? newStyle.rejectedText : newStyle.unselectedText
        const innerDetail = this.props.edit || this.state.edit ? newStyle.innerDetailviewEdit : newStyle.innerDetailview
        // console.log("this,edit A--> " + this.state.Attitude);
        // console.log("this,edit c--> " + this.state.Communication);
        // console.log("this,edit k===> " + this.state.Knowledge);
        if (this.props.userUpdated) {
            this.navigate()
        }

        return (
            <KeyboardAvoidingView>
                <ScrollView>
                    <View style={newStyle.infomainView}>
                        <StatusBar backgroundColor='#EA6404' barStyle="dark-content" />

                        {this.props.edit || this.state.edit ?
                            (
                                <LinearGradient colors={['#E26003', '#FF7B08']} style={newStyle.editTopView}>
                                    {/* <View style={newStyle.editTopView}> */}
                                    <TouchableOpacity onPress={() => this.goBack()}>
                                        <View>
                                            <Image style={newStyle.backButtonEdit} source={require('../../assets/back.png')} />
                                        </View>
                                    </TouchableOpacity>
                                    <View>
                                        {this.state.edit ?
                                            (
                                                <Text style={newStyle.candidateText}>
                                                    EDIT
                             </Text>
                                            ) : (
                                                <Text style={newStyle.candidateText}>
                                                    CANDIDATE DETAILS
                                </Text>
                                            )

                                        }

                                    </View>
                                    <View></View>
                                    {/* </View> */}
                                </LinearGradient>
                            )
                            : (
                                <LinearGradient colors={['#E26003', '#FF7B08']} style={newStyle.topViewInfo}>
                                    {/* <View style={newStyle.topViewInfo}> */}
                                    <View style={newStyle.backNameView}>
                                        <TouchableOpacity onPress={() => this.goBack()}>
                                            <View>
                                                <Image style={newStyle.backButton} source={require('../../assets/back.png')} />
                                            </View>
                                        </TouchableOpacity>
                                        <View style={newStyle.userNameText}>

                                            <Text style={newStyle.usernameText}>{this.props.user.name}</Text>

                                        </View>
                                    </View>
                                    {/* </View> */}
                                </LinearGradient>

                            )

                        }


                        <View style={newStyle.topDetailview}>
                            {this.props.edit || this.state.edit ?
                                <View style={newStyle.dashedView}>

                                </View>
                                :
                                null

                            }
                            {this.props.edit || this.state.edit ?
                                (<View style={newStyle.userNameEdit}>

                                    <Text style={newStyle.edituserNameText}>{this.props.user.name}</Text>
                                    <View style={newStyle.dateView}>
                                        <Text style={newStyle.dateText}>{this.props.user.updateDate}</Text>

                                    </View>
                                </View>

                                ) :
                                null

                            }

                            <View style={newStyle.detailView}>
                                <View style={innerDetail}>
                                    <View style={newStyle.emailView}>
                                        <Image style={newStyle.emailIcon} source={require('../../assets/whiteEmail.png')} />
                                        <Text style={newStyle.dynamicText}>{this.props.user.emailId}</Text>
                                    </View>
                                    <View style={newStyle.locationView}>
                                        <Image style={newStyle.emailIcon} source={require('../../assets/location.png')} />
                                        <Text style={newStyle.dynamicText}>{this.props.user.location}</Text>
                                    </View>
                                    <View style={newStyle.locationView}>
                                        <Image style={newStyle.emailIcon} source={require('../../assets/cap.png')} />
                                        <Text style={newStyle.dynamicText}>{this.props.user.source}</Text>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <ScrollView >
                            <View style={newStyle.infoView}>
                                <Text style={newStyle.feedbackText}>FEEDBACK :</Text>
                                <View style={newStyle.ackView}>

                                    <View style={newStyle.ackPoint}>
                                        <Text style={newStyle.ackText}>Attitude</Text>
                                        {this.props.edit ?
                                            (
                                                <View style={newStyle.editPointView}>
                                                    <Text style={newStyle.pointText}>
                                                        {this.props.user.codeSkills}
                                                    </Text>
                                                </View>
                                            ) :
                                            (
                                                <View style={newStyle.pickerView}   >
                                                    <ModalDropdown options={['TBD', "Ok", 'Fine', 'Good']}
                                                        textStyle={newStyle.pointText}
                                                        style={newStyle.pickerEdit}
                                                        defaultValue={this.state.Attitude}
                                                        onSelect={(Option, value) => this.setState({
                                                            Attitude: value
                                                        })}

                                                        dropdownStyle={{ width: 90 }}
                                                        dropdownTextStyle={newStyle.pointText}
                                                    // dropdownStyle={newStyle.pickerEdit}
                                                    />
                                                    {/* <Picker

                                                        selectedValue={this.state.Attitude}
                                                        style={newStyle.pickerEdit}
                                                        onValueChange={(itemValue, itemIndex) =>

                                                            this.setState({ Attitude: itemValue })

                                                        }>
                                                        <Picker.Item label="TBD" value="TBD" />
                                                        <Picker.Item label="Ok" value="Ok" />
                                                        <Picker.Item label="Fine" value="Fine" />
                                                        <Picker.Item label="Good" value="Good" />

                                                    </Picker> */}
                                                    <Image style={{ position: 'absolute', right: 0, height: 15, width: 15, marginRight: 5 }} source={require('../../assets/arrow_down_black.png')} />
                                                    {/* <Image style={{ height: 10, width: 10 }} source={require('../../assets/backDown.png')} /> */}
                                                </View>
                                            )}
                                    </View>
                                    <View style={newStyle.ackPoint}>
                                        <Text style={newStyle.ackText}>Communication</Text>

                                        {this.props.edit ?
                                            (
                                                <View style={newStyle.editPointView}>
                                                    <Text style={newStyle.pointText}>
                                                        {this.props.user.comm}
                                                    </Text>
                                                </View>
                                            ) :
                                            (
                                                <View style={newStyle.pickerView}   >
                                                    <ModalDropdown options={['TBD', "Ok", 'Fine', 'Good']}
                                                        textStyle={newStyle.pointText}
                                                        style={newStyle.pickerEdit}
                                                        defaultValue={this.state.Communication}
                                                        onSelect={(Option, value) => this.setState({
                                                            Communication: value
                                                        })} dropdownStyle={{ width: 90 }}
                                                        dropdownTextStyle={newStyle.pointText}
                                                    // dropdownStyle={newStyle.pickerEdit}
                                                    />
                                                    {/* <Picker
                                                        selectedValue={this.state.Communication}
                                                        style={newStyle.pickerEdit}
                                                        onValueChange={(itemValue, itemIndex) =>
                                                            this.setState({ Communication: itemValue })
                                                        }>
                                                        <Picker.Item label="TBD" value="TBD" />
                                                        <Picker.Item label="Ok" value="Ok" />
                                                        <Picker.Item label="Fine" value="Fine" />
                                                        <Picker.Item label="Good" value="Good" />


                                                    </Picker> */}
                                                    <Image style={{ position: 'absolute', right: 0, height: 15, width: 15, marginRight: 5 }} source={require('../../assets/arrow_down_black.png')} />
                                                    {/* <Image style={{ height: 10, width: 10 }} source={require('../../assets/backDown.png')} /> */}
                                                </View>
                                            )
                                        }

                                    </View>
                                    <View style={newStyle.ackPoint}>
                                        <Text style={newStyle.ackText}>Knowledge</Text>

                                        {this.props.edit ?
                                            (
                                                <View style={newStyle.editPointView}>
                                                    <Text style={newStyle.pointText}>
                                                        {this.props.user.passion}
                                                    </Text>
                                                </View>
                                            ) :
                                            (
                                                <View style={newStyle.pickerView}   >
                                                    <ModalDropdown options={['TBD', "Ok", 'Fine', 'Good']}
                                                        textStyle={newStyle.pointText}
                                                        style={newStyle.pickerEdit}
                                                        defaultValue={this.state.Knowledge}
                                                        onSelect={(Option, value) => this.setState({
                                                            Knowledge: value
                                                        })} dropdownTextStyle={newStyle.pointText}
                                                        dropdownStyle={{ width: 90 }}
                                                    />
                                                    
                                                    <Image style={{ position: 'absolute', right: 0, height: 15, width: 15, marginRight: 5 }} source={require('../../assets/arrow_down_black.png')} />
                                                    {/* <Image style={{ height: 10, width: 10 }} source={require('../../assets/backDown.png')} /> */}
                                                </View>
                                            )
                                        }


                                    </View>

                                </View>
                                <View style={newStyle.statusView}>
                                    <Text style={newStyle.statusText}>
                                        STATUS:
                            </Text>

                                </View>
                                <View style={newStyle.buttonView}>
                                    <View style={newStyle.buttonRadio}>
                                        {
                                            this.state.checked === 'Selected' ? (
                                                <View style={newStyle.selectedButton}>
                                                    <Image style={newStyle.checkedButton} source={require('../../assets/selectedButton.png')} />
                                                    <Text style={selected}>
                                                        Selected
                                                     </Text>
                                                </View>
                                            )
                                                :
                                                (
                                                    this.props.edit ?



                                                        <View style={newStyle.selectedDisable}>
                                                            <View style={newStyle.uncheckedButton} >

                                                            </View>
                                                            <Text style={selected}>
                                                                Selected
                                                              </Text>
                                                        </View>

                                                        :

                                                        <TouchableOpacity onPress={() => this.onradioPress("Selected")}>
                                                            <View style={newStyle.selectedButton}>
                                                                <View style={newStyle.uncheckedButton} >

                                                                </View>
                                                                <Text style={selected}>
                                                                    Selected
                                                             </Text>
                                                            </View>
                                                        </TouchableOpacity>

                                                )
                                        }

                                    </View>
                                    <View style={newStyle.buttonRadio}>
                                        {
                                            this.state.checked === 'TBD' ? (
                                                <View style={newStyle.selectedButton}>
                                                    <Image style={newStyle.checkedButton} source={require('../../assets/tbdButton.png')} />
                                                    <Text style={tbd}>
                                                        TBD
                                                     </Text>
                                                </View>
                                            )
                                                :
                                                (
                                                    this.props.edit ?
                                                        <View style={newStyle.selectedDisable}>
                                                            <View style={newStyle.uncheckedButton} >

                                                            </View>
                                                            <Text style={tbd}>
                                                                TBD
                                                              </Text>
                                                        </View>
                                                        :

                                                        <TouchableOpacity onPress={() => this.onradioPress("TBD")}>
                                                            <View style={newStyle.selectedButton}>
                                                                <View style={newStyle.uncheckedButton}  >

                                                                </View>
                                                                <Text style={tbd}>
                                                                    TBD
                                                         </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                )
                                        }

                                    </View>
                                    <View style={newStyle.buttonRadio}>
                                        {
                                            this.state.checked === 'Rejected' ? (
                                                <View style={newStyle.selectedButton}>
                                                    <Image style={newStyle.checkedButton} source={require('../../assets/rejectedButton.png')} />
                                                    <Text style={rejected}>
                                                        Rejected
                                                   </Text>
                                                </View>
                                            )
                                                :
                                                (

                                                    this.props.edit ?
                                                        <View style={newStyle.selectedDisable}>
                                                            <View style={newStyle.uncheckedButton} >

                                                            </View>
                                                            <Text style={rejected}>
                                                                Rejected
                                                  </Text>
                                                        </View>
                                                        :

                                                        <TouchableOpacity onPress={() => this.onradioPress("Rejected")}>
                                                            <View style={newStyle.selectedButton}>
                                                                <View style={newStyle.uncheckedButton} onPress={() => this.onradioPress("rejected")}>

                                                                </View>
                                                                <Text style={rejected}>
                                                                    Rejected
                                                             </Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                )
                                        }

                                    </View>

                                </View>
                                <View style={newStyle.remarkView}>
                                    <Text style={newStyle.remarkText}>REMARKS :</Text>

                                    {
                                        this.props.edit ?
                                            (
                                                <View style={newStyle.textRemark}>
                                                    <Text >
                                                        {this.props.user.remark}
                                                    </Text>
                                                </View>
                                            ) :
                                            (
                                                <View style={newStyle.multilineText}>
                                                    <TextInput
                                                        style={newStyle.remarkField}
                                                        placeholder="Remarks"
                                                        multiline={true}
                                                        editable={true}
                                                        value={this.state.remark}
                                                        onEndEditing={() => this.onSave()}
                                                        onSubmitEditing={() => { this.onSave() }}
                                                        // mode="outlined"
                                                        onChangeText={(text) => this.setState({ remark: text })}
                                                        blurOnSubmit={false}
                                                    >

                                                    </TextInput>

                                                </View>

                                            )
                                    }

                                    <View style={newStyle.bottomSave}>
                                        <View  >
                                            <TouchableOpacity onPress={() => this.cancelReview()}>
                                                <View style={newStyle.cancelView} ><Text>Cancel</Text></View>
                                            </TouchableOpacity></View>
                                        <View style={newStyle.cancelButton}>
                                            {this.props.edit ?
                                                (
                                                    <TouchableOpacity onPress={() => this.editPoint()}>
                                                        <View style={newStyle.cancelButton}
                                                        ><Text style={newStyle.saveText}>Edit</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                ) :
                                                (
                                                    <TouchableOpacity onPress={() => this.handleUpdate(this.props.user)} >
                                                        <View style={newStyle.cancelButton}
                                                        ><Text style={newStyle.saveText}>Save</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )

                                            }
                                        </View>
                                    </View>

                                </View>

                            </View>
                        </ScrollView>
                    </View>
                    <Spinner
                        visible={this.props.loading}
                        color="#EA7D21"

                    />
                </ScrollView>

            </KeyboardAvoidingView>
        )
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Infocard);