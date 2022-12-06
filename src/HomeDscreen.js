import React, {useState, useEffect} from 'react';
import Manubar from './Manubar';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const HomeDscreen = ({user, navigation}) => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    setFilteredDataSource(masterDataSource)
  }, []);
  const [masterDataSource, setMasterDataSource] = useState([
    {
      name: 'showes',
      price: 19,
      id: Math.random().toString(),
      title: 'accusamus beatae ad facilis cum similique qui sunt',
      url: 'https://via.placeholder.com/600/92c952',
      thumbnailUrl: 'https://via.placeholder.com/150/92c952',
    },
    {
      name: 'board',
      price: 17,
      id: Math.random().toString(),
      title: 'reprehenderit est deserunt velit ipsam',
      url: 'https://via.placeholder.com/600/771796',
      thumbnailUrl: 'https://via.placeholder.com/150/771796',
    },
    {
      name: 'court',
      price: 18,
      id: Math.random().toString(),
      title: 'officia porro iure quia iusto qui ipsa ut modi',
      url: 'https://via.placeholder.com/600/24f355',
      thumbnailUrl: 'https://via.placeholder.com/150/24f355',
    },
    {
      name: 'juple',
      price: 14,
      id: Math.random().toString(),
      title: 'culpa odio esse rerum omnis laboriosam voluptate repudiandae',
      url: 'https://via.placeholder.com/600/d32776',
      thumbnailUrl: 'https://via.placeholder.com/150/d32776',
    },
    {
      name: 'harr',
      price: 12,
      id: Math.random().toString(),
      title: 'natus nisi omnis corporis facere molestiae rerum in',
      url: 'https://via.placeholder.com/600/f66b97',
      thumbnailUrl: 'https://via.placeholder.com/150/f66b97',
    },
    {
      name: 'gold',
      price: 11,
      id: Math.random().toString(),
      title: 'accusamus ea aliquid et amet sequi nemo',
      url: 'https://via.placeholder.com/600/56a8c2',
      thumbnailUrl: 'https://via.placeholder.com/150/56a8c2',
    },
    {
      name: 'ring',
      price: 10,
      id: Math.random().toString(),
      title: 'officia delectus consequatur vero aut veniam explicabo molestias',
      url: 'https://via.placeholder.com/600/b0f7cc',
      thumbnailUrl: 'https://via.placeholder.com/150/b0f7cc',
    },
    {
      name: 'finger',
      price: 90,
      id: Math.random().toString(),
      title: 'aut porro officiis laborum odit ea laudantium corporis',
      url: 'https://via.placeholder.com/600/54176f',
      thumbnailUrl: 'https://via.placeholder.com/150/54176f',
    },
    {
      name: 'dingtable',
      price: 55,
      id: Math.random().toString(),
      title: 'qui eius qui autem sed',
      url: 'https://via.placeholder.com/600/51aa97',
      thumbnailUrl: 'https://via.placeholder.com/150/51aa97',
    },
    {
      name: 'course',
      price: 12,
      id: Math.random().toString(),
      title: 'beatae et provident et ut vel',
      url: 'https://via.placeholder.com/600/810b14',
      thumbnailUrl: 'https://via.placeholder.com/150/810b14',
    },
    {
      name: 'numan',
      price: 22,
      id:Math.random().toString(),
      title: 'nihil at amet non hic quia qui',
      url: 'https://via.placeholder.com/600/1ee8a4',
      thumbnailUrl: 'https://via.placeholder.com/150/1ee8a4',
    },
    {
      name: 'ayan',
      price: 56,
      id: Math.random().toString(),
      title:
        'mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores',
      url: 'https://via.placeholder.com/600/66b7d2',
      thumbnailUrl: 'https://via.placeholder.com/150/66b7d2',
    },
    {
      name: 'fires',
      price: 11,
      id: Math.random().toString(),
      title: 'repudiandae iusto deleniti rerum',
      url: 'https://via.placeholder.com/600/197d29',
      thumbnailUrl: 'https://via.placeholder.com/150/197d29',
    },
  ]);

  const searchFilterFunction = text => {
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <View>
        <View style={styles.container1}>
          <Image source={{uri: item.url}} style={styles.images} />
          <View style={styles.container2}>
            <Text style={styles.addtext}>{item.name}</Text>
            <Text style={[styles.addtext, styles.marginv]}>${item.price}</Text>
            <View style={styles.addview}>
              <TouchableOpacity style={styles.add}>
                <Text style={styles.addtext}>-</Text>
              </TouchableOpacity>
              <Text style={[styles.addtext, styles.margin]}>1</Text>
              <TouchableOpacity style={styles.add}>
                <Text style={styles.addtext}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.marginv}>
              <Text>{item.title}</Text>
            </View>
            <TouchableOpacity style={styles.submit}>
              <Text style={{fontWeight: 'bold'}}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
        <View style={styles.container4}>
          <TextInput
            style={{
              width: '50%',
              borderRadius: 30,
              borderWidth: 1,
              marginTop: 10,
            }}
            round
            searchIcon={{size: 24}}
            onChangeText={text => searchFilterFunction(text)}
            onClear={text => searchFilterFunction('')}
            placeholder="Type Here..."
            value={search}
          />
          <TouchableOpacity>
            <View>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'blue'}}>No User</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container5}>
          <Text style={styles.taaxt}>Homescreen</Text>
        </View>
        <FlatList
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          //   ItemSeparatorComponent={ItemSeparatorView}
          renderItem={ItemView}
        />
      <View style={{backgroundColor:"#F6F7FB", padding:"4%",
    elevation:5,borderRadius:10,position:"relative"
   }}>
      <Manubar />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 5,
    flex:1
  },
  container1: {
    flexDirection: 'row',
  },
  images: {
    height: 220,
    width: '40%',
    borderWidth: 5,
    borderColor: 'grey',
    marginBottom: '15%',
  },
  addview: {
    flexDirection: 'row',
  },
  add: {
    height: 30,
    width: 30,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    borderRadius: 15,
  },
  container2: {
    paddingLeft: '5%',
  },
  addtext: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  margin: {
    marginHorizontal: '5%',
  },

  marginv: {
    marginVertical: '5%',
  },
  submit: {
    width: '40%',
    backgroundColor: 'lightblue',
    padding: '3%',
    borderRadius: 8,
    alignItems: 'center',
  },
  container4: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  container5: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  taaxt: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default HomeDscreen;
