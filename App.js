import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Loginscreen from './src/Loginscreen';
import Registerscreen from './src/Registerscreen';
import Homescreen from './src/Homescreen';
import OrderScreen from './src/OrderScreen';
import auth from '@react-native-firebase/auth';
import {useState, useEffect} from 'react';
import EditProfile from './src/EditProfile';
import HomeDscreen from './src/HomeDscreen';
const Stack = createNativeStackNavigator();

const App = () => {
  const [user, setuser] = useState('');
  useEffect(() => {
    const unregister = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setuser(userExist);
      } else setuser('');
    });

    return () => {
      unregister();
    };
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {user ? (
          <>
            <Stack.Screen name="Home">
              {props => <Homescreen {...props} user={user} />}
            </Stack.Screen>

            <Stack.Screen name="edit">
              {props => <EditProfile {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen
              name="order"
              options={{headerShown: true, title: 'BASKET/ORDER'}}>
              {props => <OrderScreen {...props} user={user} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={Loginscreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Signup"
              component={Registerscreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="HomeD">
              {props => <HomeDscreen {...props} user={user} />}
            </Stack.Screen>
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;
