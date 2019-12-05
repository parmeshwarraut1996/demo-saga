
import React, { Component } from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipeable-cards';
import Infocard from './editUser/Infocard';
import { Users } from './ListView/Userlist';

 export default class Swipecard extends Component{

    render()
    {
        return(
            <View>

<SwipeCards
        cards={Users}
        renderCard  ={ <Infocard />}
        // renderNoMoreCards={() => <NoMoreCards />}
 
        onSwipeRight={this.handleYup}
        onSwipeLeft={this.handleNope}
        onSwipeUp={this.handleMaybe}
        hasMaybeAction
      />
            </View>
        )
    }
}
