import { Navigation } from 'react-native-navigation';
import SharePlaceScreen from './src/screen/SharePlace/SharePlace';
import AuthScreen from './src/screen/auth/Auth'
import FindPlaceScreen from './src/screen/FindPlace/FindPlace';
import {Provider} from 'react-redux'
import configureStore from './src/store /configureStore';
import SelectDetailScreen from './src/screen/PlaceDetail/PlaceDetail'
import SideDrawer from './src/screen/SideDrawer/SideDrawer'
const store=configureStore();
Navigation.registerComponent("finalyProject-places.SharePlaceScreen",()=>SharePlaceScreen,store,Provider);
Navigation.registerComponent("finalyProject-places.FindPlaceScreen",()=>FindPlaceScreen,store,Provider);
Navigation.registerComponent("finalyProject-places.SelectDetailScreen",()=>SelectDetailScreen,store,Provider);
Navigation.registerComponent("finalyProject-places.SideDrawerScreen",()=>SideDrawer);
//Register screen

Navigation.registerComponent("finalyProject-places.AuthScreen",()=>AuthScreen,store,Provider);

Navigation.startSingleScreenApp({
  screen:{
    screen:"finalyProject-places.AuthScreen",
    title:"Login"
  }
})