import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import firebase from '../firebase/Fire';

//app custom componnents
import AppText from '../components/text/AppText';
import AppButton from '../components/form/AppButton';
import AppInput from '../components/form/AppInput';
import { checkConnect } from '../config/functions';
import NoInternetScreen from './NoInternetScreen';

function SignInScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);

    //check for networ connect 
    const [ isConnect, setIsConnect ] = useState(true);

    checkConnect().then(res => {
      setIsConnect(res);
    })

  //check if user is logged 
  useEffect(
    () => {
     firebase.auth().onAuthStateChanged((user) => {
       if (user) {
         navigation.navigate("BottomNavigation", {
            screen: 'Home', 
            params: { 
              params: {
                screen: 'Posts', 
                params: { 
                  userid: user.uid
                }
              }
            }});
        }
     });
   }
 );
    
    const signIn = async () => {
      setError('');
      setIsLoading(true);
      try {
        await firebase
           .auth()
           .signInWithEmailAndPassword(email, password)
           .then((userCredential) => {
             //stop loading
            setIsLoading(false);
            navigation.navigate("BottomNavigation");
          })
          .catch((error) => {
            //stop loading
           setIsLoading(false);
            setError(error.message)
          });
       } catch (err) {
        //stop loading
        setIsLoading(false);
         setError(err.message)
       }
    }

  return (
    <>
      {
        isConnect == false ? <NoInternetScreen onPress={() => setIsConnect(true)} /> : 
          
              
    <View style={styles.Container}>
            <View style={styles.upperContainer}> 
                <View>
                  { isLoading && <ActivityIndicator size="70%" color="white"/>}
                  <AppText
                    color="white"
                    size={50}
                    bold
                  >
                    Welcome Back!!!
                  </AppText>

                  <AppText
                    size={18}
                    color="white"
                    style={{marginTop: -15}}
                  >
                    It is good to have you back on the platform
                  </AppText>
                </View>

            </View>
            <View style={styles.SignContainer}> 
              <View>
                <View style={{marginBottom: 10}}>
                  <AppText
                    size={35}
                  >Sign In</AppText>
                </View>

                <AppInput 
                  placeholder="Email"
                  keyboardType="email-address"
                  iconName="email"
                  onChangeText={(text) => setEmail(text)}
                />
                <AppInput 
                  placeholder="Passoword"
                  iconName="key"
                  onChangeText={(text) => setPassword(text)}
                  textContentType="password"
                  secureTextEntry
                />
                {
                  error ? 
                  <AppText 
                    color="red"
                    bold
                  >{error}</AppText> : null
                }
                
                <View style={{flexDirection: "row"}}>
                  <AppText>
                    New to this platform? 
                  </AppText>
                  <AppText
                    color="#008000"
                    style={{marginLeft: 10}}
                    size={16}
                    onPress={() => navigation.navigate("SignUp")}
                    bold
                  >
                    Sign Up
                  </AppText>
                </View>
              </View>

              <View style={{alignItems: "flex-end", justifyContent: "flex-end", width: "100%", flex: 1}}>
                <AppButton 
                  title="Log In"
                  titleSize={25}
                  color="white"
                  backgroundColor="#008000"
                  style={styles.button}
                  width={200}
                  onPress={() => signIn()}
                />
              </View>

            </View>
    </View>
      }
      </>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1, 
    backgroundColor: "#008000"
  }, 
  container: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    height: 80, 
    borderRadius: 0,
    borderTopLeftRadius: 20,
    marginRight: -20, 
    marginTop: 20, 
    alignSelf: "flex-end"
  },
  SignContainer: {
    backgroundColor: "white", 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30,
    paddingHorizontal: 20, 
    paddingTop: 50, 
    flex: 1
  }, 
  upperContainer: {
    flex: 1, 
    padding: 20, 
    justifyContent: 'flex-end',
  }
})

export default SignInScreen;