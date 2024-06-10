// Example of Expandable ListView in React Native
// https://aboutreact.com/expandable-list-view/

// Import React
import React, {useEffect, useState} from 'react';
// Import required components
import {
  SafeAreaView,
  LayoutAnimation,
  StyleSheet,
  View,
  Text,
  ScrollView,
  UIManager,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import {responsiveFontSize, responsiveScreenWidth} from '../../utility/Size';

const ExpandableComponent = props => {
  //Custom Component for the Expandable List
  const [layoutHeight, setLayoutHeight] = useState(0);

  useEffect(() => {
    if (props.item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [props.item.isExpanded]);
  
  console.log('>>>>123 ', props.item);
  return (
    <View>
      {/*Header of the Expandable List props.item*/}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={props.onClickFunction}
        style={styles.header}>
        <View style={{width: '90%'}}>
          <Text style={styles.headerText}>{props.item.faq_topic}</Text>
        </View>
        <View>
          {layoutHeight===0?
          <Image
            source={require('../../assets/FAQLogos/dropdown.png')}
            resizeMode="contain"
            style={{height: 10, width: 15, alignSelf: 'center'}}
          />:
             <Image
                  source={require('../../assets/FAQLogos/upload.png')}
                  style={{height: 10, width: 15, alignSelf: 'center'}}
                /> }
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: layoutHeight,
          overflow: 'hidden',
        }}>
        {/*Content under the header of the Expandable List props.item*/}
        {/* {props.item.subcategory.map((item, key) => (*/}
        <TouchableOpacity
          // key={key}
          style={styles.content}
          onPress={() =>
            console.log('Id: ' + props.item.id + ' val: ' + props.item.val)
          }>
          <Text style={styles.text}>{props.item.faq_content}</Text>
        </TouchableOpacity>
        {/* ))} */}
      </View>
      <View style={styles.separator} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: 'black',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#808080',
    width: '95%',
    marginLeft: 16,
    marginRight: 16,
  },
  text: {
    fontSize: responsiveFontSize(1.6),
    color: 'black',
    fontWeight: '500',
    marginStart: responsiveScreenWidth(0),
    marginBottom: responsiveScreenWidth(4),
    width: '90%',
    alignSelf: 'center',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#fff',
  },
});

export default ExpandableComponent;
