import { View, Text, TouchableOpacity, StyleSheet, TextInput, ImageBackground } from 'react-native'
import React, { useState } from 'react'

const Form = () => {
    const[email, setEmail] = useState("")
    const[name, setName] = useState("")

   const submit = () => (
    
   console.log( "your name :" ,{name} , "your email :",  {email} )
    )
  return (
    <View style={{flex:1}}>
        <ImageBackground source={{uri:""}}>
       <TextInput
          style={styles.input}
          placeholder="Enter  Name"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
         <TextInput
          style={styles.input}
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoFocus={true}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <TouchableOpacity onPress={submit}>
            <Text>submit</Text>
        </TouchableOpacity>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 30,
        padding: 12, 
    }
})
export default Form;