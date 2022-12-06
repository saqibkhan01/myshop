import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import Manubar from './Manubar';

const OrderScreen = ({route, navigation}) => {
  // const data = route.params.newdata;
  
  const [newdata, setNewData] = useState(route.params.newdata);
  // console.log('cart', newdata);

  const onDelete = id => {
    const data = [...newdata];
    const dldata = data.filter(x => {
      if (x.id !== id) {
        return x;
      }
    });
    // console.log(dldata);
    setNewData(dldata);
  };

  const Viewscard = ({item}) => (
    <View style={styles.container1}>
      <Image source={{uri: item.url}} style={styles.images} />
      <View style={styles.container2}>
        <Text style={styles.addtext}>{item.name}</Text>
        <Text style={[styles.addtext, styles.marginv]}>${item.price}</Text>
        <View style={styles.marginv}>
          <Text>{item.title}</Text>
        </View>
        <TouchableOpacity style={styles.submit} onPress={()=> onDelete(item.id)}>
          <Text style={{fontWeight: 'bold'}}>delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.containers}>
      <FlatList data={newdata} 
      keyExtractor={(item, index) => item.id}
      renderItem={Viewscard} />
      <View style={styles.container3}>
        <View style={{flexDirection: 'column'}}>
          <Text style={[styles.addtext, {marginBottom: '7%'}]}>
            Order Total
          </Text>
          <Text style={styles.addtext}>$89</Text>
        </View>
        <View style={[styles.container2, {paddingLeft: '15%'}]}>
          <Text>1xProduct1&</Text>
          <Text style={[styles.addtext, styles.marginv]}>$67</Text>
        </View>
        <View style={styles.btn}>
          <TouchableOpacity
            style={styles.submit}
            onPress={() => navigation.goBack()}>
            <Text style={{fontSize: 12}}>Continue Shopping</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submit}>
            <Text style={{fontSize: 12}}>Purchase Screen</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#F6F7FB',
          padding: '4%',
          elevation: 5,
          borderRadius: 10,
        }}>
        <Manubar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containers: {
    padding: 20,
    flex: 1,
  },
  container1: {
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    elevation: 10,
    marginTop: '5%',
    paddingTop: '10%',
    paddingLeft: '10%',
  },
  container3:{
    flexDirection: 'row',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ffff',
    backgroundColor: '#ffff',
    elevation: 10,
    marginBottom:0,
    paddingTop: '10%',
    paddingLeft: '10%',
    marginBottom:"5%"
  },
  images: {
    height: 220,
    width: '40%',
    borderWidth: 5,
    borderColor: 'grey',
    marginBottom: '15%',
  },
  container2: {
    paddingLeft: '5%',
  },
  addtext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  marginv: {
    marginVertical: '5%',
    width: '80%',
  },
  submit: {
    width: '40%',
    backgroundColor: 'lightblue',
    padding: '3%',
    borderRadius: 8,
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '30%',
    marginLeft: '-80%',
    width: '100%',
    marginBottom: '5%',
    height: '30%',
  },
});
export default OrderScreen;
