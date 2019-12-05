import React, { Component } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View, Keyboard, Picker, Button, Image, TextInput, TouchableHighlight, KeyboardAvoidingView, StatusBar, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import newStyle from '../ListView/Userlist.less'
import Usercard from '../../components/Usercard';
import LinearGradient from 'react-native-linear-gradient';

import { QUIT_MULTISELECT, UNSELECT_LIST, SELECTED_CARD, GET_COUNT, GET_USER } from '../../constants/actionTypes';
const mapDisapatchToProps = dispatch => ({
    userSelected: (value) =>
        dispatch({ type: SELECTED_USER, value }),
    quit: () =>
        dispatch({ type: QUIT_MULTISELECT }),
    closeList: () =>
        dispatch({ type: UNSELECT_LIST }),
    selectAll: (value) =>
        dispatch({ type: SELECTED_CARD, value }),
    getCount: () =>
        dispatch({ type: GET_COUNT }),
    getUser: () =>
        dispatch({ type: GET_USER })

})
const mapStateToProps = state => {



    return {
        list: state.searchReducer.listSelected,
        multi: state.searchReducer.multiSelected,
        user: state.dashboardReducer.user,
        location: state.dashboardReducer.location,
        blogs: state.dashboardReducer.user.filter(user => user.status === state.searchReducer.listSelected.listStatus)
        // array:newArray

        // newArray:state.dashboardReducer.user.map((item)=>{
        //     if(item.status===state.searchReducer.listSelected.listStatus){
        //         newArray.push(item)
        //     }

        // })
    }
}



class Userlist extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedArray: [],
            value: true,

            search: false,
            searchValue: "",
            isSearching: false,
            filterArray: [],
            shimmer: true

        }
        pickerRef = React.createRef();
        this.addSelected = this.addSelected.bind(this)
    }
    componentDidMount() {
        setTimeout(() => this.setState({
            shimmer: false
        })
            , 1000
        )
        console.log("in setstate===----===>"+this.state.shimmer);
        
    }
    addSelected(value) {
        console.log(" add selected---->" + value);

        var old = this.state.selectedArray;
        old.push(value)

        this.setState({
            selectedArray: old
        })

        console.log("in selected araay" + JSON.stringify(this.state.selectedArray));



    }

    removeSelected() {

    }
    goBack() {
        this.props.closeList()
        this.props.navigation.navigate("Dashboard")
    }
    quitMuliselection() {
        this.props.quit()
    }
    // async selectAll(value) {
    //     value.map((item) => {
    //         item.selected = true
    //         // this.props.selectAll(item)
    //     })
    //     await this.setState({
    //         detail: value
    //     })
    //     console.log("after selet all" + JSON.stringify(this.state.detail));

    // }
    async  onSearch() {

        await this.setState({
            search: true
        })
        console.log("value of search" + this.state.search);

        this.searchInput.focus()

    }
    onCancel() {
        this.searchInput.clear()
        this.setState({
            isSearching: false
        })

    }
    onBackCancel() {
        this.setState({
            search: false
        })

    }
    // deSelectAll(value) {
    //     value.map((item) => {
    //         item.selected = false
    //         this.props.selectAll(item)
    //     })
    // }
    offAutoRun() {
        this.setState({
            shimmer: false
        })
    }
    onSearchuser(text) {
        console.log("text--->" + text
        );

        if (text.toString().length >= 1) {
            const newData = this.props.blogs.filter(function (item) {
                return (
                    item.name.toLowerCase().indexOf(text.toLowerCase()) > -1 ||
                    item.name.toLowerCase().indexOf(text.toLowerCase()) > -1
                );
            });
            this.setState({
                isSearching: true,
                filterArray: newData,
                shimmer: false,
            });
        } else {
            this.setState({
                isSearching: false,
                shimmer: true
            });
        }
    }
    render() {


        var length = this.props.blogs.length

        // console.log("value of item ----->" + JSON.stringify(this.props.blogs));

        return (
            <View>
                <StatusBar backgroundColor="#EA6404" barStyle="light-content" />
                {this.props.multi ?
                    <LinearGradient colors={['#E26003', '#FF7B08']}>
                        <View style={newStyle.multiSelectionView}>
                            <TouchableOpacity onPress={() => this.quitMuliselection()}>
                                <Image style={newStyle.BackImage} source={require('../../assets/back.png')} accessibilityLabel="backIcon" />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <View>
                                    <Text>
                                        APPROVE
                         </Text>
                                </View>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => this.selectAll(this.state.detail)}>
                                <View>
                                    <Text>
                                        SELECT ALL
                         </Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </LinearGradient>
                    :
                    this.state.search ?
                        <LinearGradient colors={['#E26003', '#FF7B08']} style={newStyle.topView}>
                            <View style={newStyle.searchView}>
                                <TouchableOpacity onPress={() => this.onBackCancel()}>
                                    <View>
                                        <Image style={newStyle.backIcon} source={require('../../assets/back.png')} />
                                    </View>
                                </TouchableOpacity>
                                <View style={newStyle.innerSearch}>
                                    <TextInput
                                        placeholder="Search Candidate"
                                        style={newStyle.searchTextfield}
                                        ref={(input) => { this.searchInput = input }}
                                        // value={this.state.searchValue}
                                        onChangeText={(text) => this.onSearchuser(text)}

                                    >

                                    </TextInput>
                                    <TouchableOpacity onPress={() => this.onCancel()}>
                                        <View>
                                            <Image style={newStyle.cancelIcon} source={require('../../assets/cancel.png')} />


                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </LinearGradient>
                        :
                        <LinearGradient colors={['#E26003', '#FF7B08']} style={newStyle.topView}>
                            {/* <View style={newStyle.topView}> */}

                            <TouchableOpacity onPress={() => this.goBack()}>
                                <Image style={newStyle.BackImage} source={require('../../assets/back.png')} accessibilityLabel="backIcon" />
                            </TouchableOpacity>
                            <View style={newStyle.middleTopView}>
                                <Text style={newStyle.listText}>{this.props.list.value}</Text>
                                <View style={newStyle.numberView}>
                                    <Text style={newStyle.numberText}>{length}</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => this.onSearch()}>
                                <View>
                                    <Image style={newStyle.searchIcon} source={require('../../assets/search.png')} />
                                </View>
                            </TouchableOpacity>
                            {/* </View> */}
                        </LinearGradient>


                }


                <ScrollView style={{ marginBottom: 60 }}>
                    <FlatList horizontal={false} showsHorizontalScrollIndicator={false} keyboardShouldPersistTaps="always"
                        data={!this.state.isSearching ? this.props.blogs : this.state.filterArray}
                        renderItem={({ item }) =>
                            <Usercard data={item} navigation={this.props.navigation} array={this.addSelected} method={this.offAutoRun} selectedArray={this.state.detail} autoRun={this.state.shimmer} />
                        }
                    />
                </ScrollView>

            </View>
        )
    }
}
export default connect(mapStateToProps, mapDisapatchToProps)(Userlist);