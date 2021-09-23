import React, { useState } from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import firebase from '../firebase/Fire';

//app custom componnents
import AppText from '../components/text/AppText';
import AppButton from '../components/form/AppButton';
import AppInput from '../components/form/AppInput';
import { checkConnect } from '../config/functions';
import NoInternetScreen from './NoInternetScreen';

function SignupScreen({ navigation }) {
// get input values
const [ surname, setSurname ] = useState('');
const [ firstname, setFirstname ] = useState('');
const [ email, setEmail ] = useState('');
const [ password, setPassword ] = useState('');

//error variable
const [ error, setError ] = useState('');

  //check for networ connect 
  const [ isConnect, setIsConnect ] = useState(true);

  checkConnect().then(res => {
    setIsConnect(res);
  })

//loading
const [ isLoading, setIsLoading ] = useState(false);

const signUp = async() => {

  if(firstname !== '' && password !== '' && email !== '' && surname !== ''){
    
  setIsLoading(true);
  try{
    await firebase.auth().createUserWithEmailAndPassword(email, password);

    const currentUser = firebase.auth().currentUser;

    //upload content to the database 
    const db = firebase.firestore();
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        email: currentUser.email,
        surname: surname,
        firstName: firstname,
      })
          //set isloading to false
          setIsLoading(false);
          navigation.navigate("Registration Success", {fname: firstname.toUpperCase(), sname: surname.toUpperCase()});
  }catch(err){
    //set isloading to false
    setIsLoading(false);
    setError("Something went wrong!");
  }

  }else{
    setError("All fields are required");
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
              Welcome!!!
            </AppText>

            <AppText
              size={18}
              color="white"
              style={{marginTop: -15}}
            >
              This is ABC Company. Care to join us? 
            </AppText>
          </View>

       </View>
      <View style={styles.SignContainer}> 
        <View>
          <View style={{marginBottom: 10}}>
            <AppText
              size={35}
            >SignUp</AppText>
          </View>

          <AppInput 
            placeholder="Surname"
            iconName="account"
            onChangeText={(text) => setSurname(text)}
            autoFocus
          />
          <AppInput 
            placeholder="First Name"
            iconName="account"
            onChangeText={(text) => setFirstname(text)}
          />
          <AppInput 
            placeholder="Email"
            keyboardType="email-address"
            iconName="email"
            onChangeText={(text) => setEmail(text)}
          />
          <AppInput 
            placeholder="Passoword"
            iconName="key"
            textContentType="password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
          />

          {
            error ? <AppText
              color="red"
              bold
            >{error}</AppText> : null
          }
          
          <View style={{flexDirection: "row"}}>
            <AppText>
              Already Signed Up? 
            </AppText>
            <AppText
              color="#008000"
              style={{marginLeft: 10}}
              size={16}
              bold
              onPress={() => navigation.navigate("SignIn")}
            >
              Sign In
            </AppText>
          </View>
        </View>

        <View style={{alignItems: "flex-end", justifyContent: "flex-end", width: "100%", flex: 1}}>
          <AppButton 
            title="SignUp"
            titleSize={25}
            color="white"
            backgroundColor="#008000"
            style={styles.button}
            width={200}
            onPress={() => signUp()}
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
    flex: 2
  }, 
  upperContainer: {
    flex: 1, 
    padding: 20, 
    justifyContent: 'flex-end',
  }
})

export default SignupScreen;