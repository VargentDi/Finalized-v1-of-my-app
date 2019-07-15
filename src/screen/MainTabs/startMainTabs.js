import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import {Platform} from 'react-native'


const startTabs=()=>{

    Promise.all([    
    Icon.getImageSource(Platform.OS==='android'?"md-map":'ios-map',30),
    Icon.getImageSource(Platform.OS==='android'?"md-share-alt":"ios-share",30),
    Icon.getImageSource(Platform.OS==='android'?"md-menu":"ios-menu",30),

]

    )
    .then(source=>{

        Navigation.startTabBasedApp({
            tabs:[
                {
                    screen:'finalyProject-places.FindPlaceScreen',
                    label:'find place',
                    title:'find place',
                    icon:source[0],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:source[2],
                                title:'Menu',
                                id:'sideDrawerToogle'
                            }
                        ]
                    }
    
                },
                {
                    screen:'finalyProject-places.SharePlaceScreen',
                    label:'Share',
                    title:'SHARE',
                    icon:source[1],
                    navigatorButtons:{
                        leftButtons:[
                            {
                                icon:source[2],
                                title:'Menu',
                                id:'sideDrawerToogle'
                                
                            }
                        ]
                    },
                },
        
            ],
            tabsStyle:{
                tabBarSelectedButtonColor:"orange"
            },
            drawer:{
                left:{
                    screen:"finalyProject-places.SideDrawerScreen"
                }
            },
            appStyle:{
                tabBarSelectedButtonColor:"orange"

            }
        })
    })
}
export default startTabs;