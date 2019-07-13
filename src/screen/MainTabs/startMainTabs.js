import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';


const startTabs=()=>{

    Promise.all([    
    Icon.getImageSource("md-map",30),
    Icon.getImageSource("ios-share-alt",30),
    Icon.getImageSource("ios-menu",30),

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
            drawer:{
                left:{
                    screen:"finalyProject-places.SideDrawerScreen"
                }
            }
        })
    })
}
export default startTabs;