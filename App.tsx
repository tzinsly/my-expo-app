import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Platform} from 'react-native';

//The bellow hook will be used to cache a function between re-renders
import { useCallback } from 'react';

//We wil use the splash-screen before the component is loaded
//The Components are not loaded until the fonts we will add are available
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

//Functional components 
//No need to import Component class from React
//No need to render, just return the JSX
//Using the arrow syntax make it easier and cleaner
const App = () => {

  //JavaScript expressions goes outside the return statement, if inside then needs {}
  const myImage = require('./assets/my-internal-images/financial-chart.png');

  //Defining fonts, which are an array:
  const [fontsLoaded] = useFonts ({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Alkatra-Regular': require('./assets/fonts/Alkatra-Regular.ttf'),
    'Alkatra-Bold': require('./assets/fonts/Alkatra-Bold.ttf')
  })

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <View style={styles.imageView}>
        <Image source={myImage} style={styles.imagesStyles}/>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>My Financial Dashboard</Text>
        <Text style={styles.slogan}>My first app using react native and expo!</Text>
      </View>
      <StatusBar style="auto"/>
    </View>
  );
}


//React Native does not support css 
const styles = StyleSheet.create({
  container: {
    //indicates how child components inside the container will utilize the space
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center', 
  },
  imageView: {
    flex: 5
  },
  imagesStyles: {
    flex: 1,
    ...Platform.select({
      android: {
        resizeMode: 'contain'
      },
      ios: {
        resizeMode: 'contain'
      },
      default: {
        resizeMode: 'cover'
      }
    }),
  },
  titleContainer: {
    flex: 3,
    alignItems: 'center'
  },
  title: {
    fontSize: 40,
    fontFamily: 'Alkatra-Bold'
  },
  slogan: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular'
  }
});

export default App;
