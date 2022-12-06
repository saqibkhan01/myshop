import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity,
    
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import  Icon  from "react-native-vector-icons/FontAwesome";

  import firestore from '@react-native-firebase/firestore';

const HomeScreen = ({navigation, user}) => {
    const [getData, setGetData] = useState("")
    

    const getUsers = async () => {
    const querySanp = await firestore()
      .collection("users")
      .where("uid", "!=", user.uid)
      .get()
     const alluser = querySanp.docs.map((docSnap) => docSnap.data());
     setGetData(alluser)
    // console.log(alluser)
  };

  useEffect(() => {
    getUsers();
  }, []);

  const RenderCard = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={
          () =>
            navigation.navigate("chat", {
                name: item.name,
                uid: item.uid,
                pic: item.pic,
                status: item.status,
            })
        }
      >
        <View style={styles.mycard}>
          <Image source={{ uri: item.pic }} style={styles.img} />
          <View>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.email}</Text>
          </View>
          <Text>{item.status.toString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        keyExtractor={(key) => key.uid}
        data={getData}
        renderItem={({item})=> {return <RenderCard item={item} /> }}
      />
      <TouchableOpacity
        style={styles.accountbtn}
        onPress={() => navigation.navigate("Account")}
      >
       <Icon name="user-circle-o" size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  img: { width: 60, height: 60, borderRadius: 30, backgroundColor: "green" },
  text: {
    fontSize: 18,
    marginLeft: 15,
  },
  mycard: {
    flexDirection: "row",

    padding: 20,
    backgroundColor: "white",
  },
  accountbtn: {
    position: "absolute",
    height: 70,
    width: 70,
    borderRadius: 35,
    borderColor: "white",
    backgroundColor: "white",
    elevation: 10,
    padding: 15,
    marginTop: 600,
    marginLeft: 300,
  },
  search: {
    width: 320,
    height: 40,
    borderWidth: 2,
    borderColor: "lightgray",
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    paddingLeft: 15,
    backgroundColor: "lightgray",
    marginLeft: 20,
  },
});


export default HomeScreen

