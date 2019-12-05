import { createAppContainer, createStackNavigator } from "react-navigation";
import Infocard from "./pages/editUser/Infocard";
import Userlist from "./pages/ListView/Userlist";
import Screen from "./pages/splashscreen";
import Login from "./pages/Loginpage/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Usercard from "./components/Usercard";
import Swipecard from "./pages/Swipecard";
import Errorpage from "./components/Errorpage";



const Appnavigator = createStackNavigator({
  splash: {
    screen: Screen,
    navigationOptions: {
      header: null
    }
  },
  login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },

  Dashboard: {
    screen: Dashboard,
    navigationOptions: {
      header: null
    }
  },
  UserInfo: {
    screen: Infocard,
    navigationOptions: {
      header: null
    }
  },
  UserList: {
    screen: Userlist,
    navigationOptions: {
      header: null
    }
  },
  userCard: {
    screen: Usercard,
    navigationOptions: {
      header: null
    }
  },
  swipe: {
    screen: Swipecard,
    navigationOptions: {
      header: null
    }
  },
  errorPage:{
    screen:Errorpage,
    navigationOptions:{
      header:null
    }
  }



},


  {
    initialRouteName: "splash"
  },




);
export default createAppContainer(Appnavigator);