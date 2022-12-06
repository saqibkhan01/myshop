import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Alert,
  ActivityIndicator,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import DatePicker from 'react-native-date-picker';
import moment from 'moment/moment';
import Manubar from './Manubar';

const Registerscreen = ({navigation}) => {
  const backImage = require('../assets/backImage.png');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chosenOption, setChosenOption] = useState('male');
  const [showModal, setShowModal] = useState(false);
  const [date, setDate] = useState(new Date());
  const [condation, setCondation] = useState();
  const [phone, setPhone] = useState();
  const [shownext, setShowNext] = useState(false);
  const [ncard, setNcard] = useState();
  const [cardnub, setCardnub] = useState()
  const [showModal1, setShowModal1] = useState(false)
  const [dateb, setDateb] = useState(new Date());
  const [condation1, setCondation1] = useState();
  const [security, setSecurity] = useState();
  const [postalcode, setPostalcode] =useState()

  const options = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  if (loading) {
    return <ActivityIndicator size="large" color="#00ff00" />;
  }

  const userSignup = async () => {
    setLoading(true);
    if (!email || !password || !name) {
      alert('please add all the field');
      return;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      firestore().collection('users').doc(result.user.uid).set({
        name: name,
        email: result.user.email,
        uid: result.user.uid,
        gender: chosenOption,
        DOB: date,
        Phonenumber: phone,
        CardName:ncard,
        CardNumber:cardnub,
        ExpiryDate:dateb,
        SecurityCode:security,
        PostalCode:postalcode
      });
      setLoading(false);
      // navigation.Goback()
      alert('user Profile Regestered',);
      
    } catch (err) {
      alert('something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={backImage} style={styles.backImage} />
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Sign Up</Text>
        {!shownext && (
          <>
          <View style={{marginTop:"35%"}}>
            <TextInput
              style={styles.input}
              placeholder="Enter Name"
              autoCapitalize="none"
              keyboardType="Text"
              textContentType="name"
              autoFocus={true}
              value={name}
              onChangeText={text => setName(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              autoFocus={false}
              value={email}
              onChangeText={text => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              textContentType="password"
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <View>
              <Text style={{fontWeight: 'bold', fontSize: 22}}>Gander :</Text>
              <RadioForm
                style={styles.radiobtn}
                radio_props={options}
                onPress={value => {
                  setChosenOption(value);
                }} //if the user changes options, set the new value
              />
            </View>
            <View style={styles.containerDate}>
              <Text style={styles.text}>Date of Birth:</Text>
              <View style={styles.dbirth}>
                {condation ? (
                  <Text style={styles.text}>
                    {moment(condation.toUTCString()).format('DD/MM/YYYY')}
                  </Text>
                ) : (
                  <Text style={styles.text}>"DD/MM/YYYY"</Text>
                )}
                <TouchableOpacity onPress={() => setShowModal(true)}>
                  <Image
                    style={{height: 25, width: 25}}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/512/591/591576.png',
                    }}
                  />
                </TouchableOpacity>
              </View>

              <View>
                <Modal
                  transparent={true}
                  visible={showModal}
                  animationType="slide">
                  <View style={styles.modalS}>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={date}
                      mode="date"
                      onDateChange={date => {
                        setDate(date);
                        setCondation(date);
                        setShowModal(false);
                      }}
                    />
                  </View>
                </Modal>
              </View>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={[
                  styles.text,
                  {
                    marginTop: 20,
                  },
                ]}>
                Phone :
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: 20, marginTop: 20}}>+44</Text>
                <TextInput
                  style={styles.inputs}
                  autoCapitalize="none"
                  keyboardType="number-pad"
                  value={phone}
                  onChangeText={text => setPhone(text)}
                />
              </View>
            </View>
            </View>
          </>
        )}
        {shownext ? (
          <>
          <View style={{marginTop:"30%"}}>
            <TextInput
              style={[styles.input,styles.marg]}
              placeholder="Name on the card"
              autoCapitalize="none"
              keyboardType="Text"
              textContentType="name"
              autoFocus={true}
              value={ncard}
              onChangeText={text => setNcard(text)}
            />
            <TextInput
              style={[styles.input,styles.marg]}
              placeholder="Card number"
              autoCapitalize="none"
              keyboardType="number-pad"
              textContentType="creditCardNumber"
              autoFocus={false}
              value={cardnub}
              onChangeText={text => setCardnub(text)}
            />
            <View style={{flexDirection:"row",
          justifyContent:"space-evenly",marginBottom:"10%"}}>
            <TouchableOpacity onPress={() => setShowModal1(true)}>
            <Text style={styles.text}>Expiry date:</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Security Code:</Text>
            </View>
            <View style={[styles.dbirths,styles.marg]}>
            
                {condation1 ? (
                  <>
                  <Text style={[styles.input,{paddingHorizontal:"15%"}]}>
                    {moment(condation1.toUTCString()).format('MM/YY')}
                  </Text>
                  </> ) : (
                  <Text style={[styles.input,{paddingHorizontal:"15%"}]}>"MM/YY"</Text>
                )}
                 <TextInput
              style={[styles.input,]}
              placeholder="Card number"
              autoCapitalize="none"
              keyboardType="number-pad"
              textContentType="creditCardNumber"
              autoFocus={false}
              value={security}
              onChangeText={text => setSecurity(text)}
            />
                  
                
              </View>
              <View>
              <Text style={styles.text}>ZIP/Postal Code:</Text>
              <TextInput
              style={[styles.input,]}
              autoCapitalize="none"
              keyboardType="number-pad"
              textContentType="addressState"
              autoFocus={false}
              value={postalcode}
              onChangeText={text => setPostalcode(text)}
            />
              </View>

              <View>
                <Modal
                  transparent={true}
                  visible={showModal1}
                  animationType="slide">
                  <View style={styles.modalS}>
                    <DatePicker
                      style={styles.datePickerStyle}
                      date={dateb}
                      mode="date"
                      onDateChange={date => {
                        setDateb(date);
                        setCondation1(date);
                        setShowModal1(false);
                      }}
                    />
                  </View>
                </Modal>
              </View>
              <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.imgheight} source={{uri:"https://cdn-icons-png.flaticon.com/512/318/318477.png"}}/>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttons}
                onPress={() =>{
                  setCardnub(""),
                  setNcard(""),
                  setSecurity(""),
                  setPostalcode("")
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                  {' '}
                Clear field
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                style={[styles.buttons,{width:"40%"}]}
                onPress={() => userSignup()}>
                <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 12}}>
                  {' '}
                Save card and complete
                </Text>
              </TouchableOpacity>
              </View>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'center',
              }}>
              <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>
                Aleardy have an account{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{color: '#f57c00', fontWeight: '600', fontSize: 14}}>
                  {' '}
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
            </View>
          </>
        ) : (
          <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-evenly"}}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image style={styles.imgheight} source={{uri:"https://cdn-icons-png.flaticon.com/512/318/318477.png"}}/>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttons}
                onPress={() =>{
                  setName("")
                  setEmail("")
                  setPassword("")
                  setPhone("")
                }}>
                <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                  {' '}
                Clear field
                </Text>
              </TouchableOpacity>
                <TouchableOpacity
                style={styles.buttons}
                onPress={() => setShowNext(true)}>
                <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>
                  {' '}
                Next Page
                </Text>
              </TouchableOpacity>
              </View>
        )}
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
      <View style={{backgroundColor:"#F6F7FB", padding:"4%",
    elevation:5,borderRadius:10 }}>
      <Manubar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
   
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'orange',
    alignSelf: 'center',
    paddingBottom: 24,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#F6F7FB',
    height: 58,
    marginBottom: 5,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },
  backImage: {
    width: '100%',
    height: 340,
    position: 'absolute',
    top: 0,
    resizeMode: 'cover',
  },
  whiteSheet: {
    width: '100%',
    height: '75%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: '#f57c00',
    height: 58,
    width:"70%",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttons:{
    backgroundColor: '#f57c00',
    height: 58,
    width:"30%",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  radiobtn: {
    alignSelf: 'center',
  },
  containerDate: {
    padding: 10,
    backgroundColor: '#A8E9CA',
  },

  datePickerStyle: {
    borderRadius: 10,
    elevation: 4,
  },
  text: {
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 22,
  },
  modalS: {
    backgroundColor: '#ffffff',
    padding: 5,
    marginHorizontal: 50,
    marginTop: '90%',
    elevation: 10,
  },
  dbirth: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  inputs: {
    borderBottomWidth: 1,
    width: '50%',
    marginHorizontal: 20,
    height: 50,
  },
  dbirths: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  marg:{
    marginBottom:"5%"
  },
  imgheight: {
    height: 50,
    width: 50,
    marginTop:5
  },
});

export default Registerscreen;
