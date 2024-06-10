import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {image} from '../../assets';
import {
  BasicDetailsInput,
  Button,
  CustomizableDropdown,
  Header,
  ProfileDetailsHouseTypeCard,
  ProfileDetailsProgressBar,
} from '../../components';
import {color, style} from '../../utility';
import {
  stayValidateValues,
  validateValues,
} from '../../validation/PersonalInformationScreenvalidation';
import {AppStateContext} from '../../providers/AuthContextProvider';

const NewBlogCardScreen = ({navigation}) => {
  const {textStorage} = useContext(AppStateContext);
  const [stay, setStay] = useState('');
  const [validationerror, SetValidationerror] = useState({});
  const [stayerror, setStayerror] = useState();
  const [issubmit, setIssubmit] = useState(false);

  const data1 = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];

  return (
    <View style={styles.containerStyle}>
      <ScrollView>
        <View style={styles.containerStyle}>
          <View style={{flexDirection:"row"}}>
            <Text>News Update</Text>
            <Text>{"View all  >>"}</Text>
          </View>
          <View style={{flexDirection:"row"}}>
            <Text>Knowledge Blog</Text>
            <Text>{"View all  >>"}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    backgroundColor: color.white,
  },
});

export {NewBlogCardScreen};
