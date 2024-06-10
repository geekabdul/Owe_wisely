import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import {color, dimension, font} from '../../utility';
import {BasicDetailsContainerCard} from './BasicDetailsContainerCard';

const BasicDetailsInput = ({
  placeholder,
  iconUri,
  setInputValue,
  keyBoardType = placeholder === 'Monthly income' ? 'numeric' : 'default',
  type,
  maxLength,
  data,
  editableL,
  autoCapitalizeL,
  tempValue,
  imageClick,
  onKeyPress,
  multiline = false,
  capitalize = false,
  onFocus = false,
  onBlur,
}) => {
  const {inputIconContainerStyle, inputStyle, imageBoxStyle} = styles;
  const [text, setText] = useState('');
  const [tempData, setTemData] = useState(tempValue);
  // console.log('tempValue', tempValue);
  // console.log('tempData', tempData);
  // console.log('placeholder', placeholder);
  function formatWithCommas(n) {
    return n.toString().replace(/\B(?=(\d{3})+\b)/g, ',');
  }

  const handleChangeText = txt => {
    if (!type) {
      var temptxt = txt.replace(',', '');
      const tempdata = formatWithCommas(temptxt);
      // console.log('formatWithCommas(txt)', tempData);
      setTemData(tempdata);
      setText(txt);
      setInputValue(txt);
    } else {
      setText(txt);
      setInputValue(txt);
    }
  };
  // console.log(data, 'data');
  return (
    <BasicDetailsContainerCard>
      <View style={inputIconContainerStyle}>
        <TextInput
          onBlur={onBlur}
          style={inputStyle}
          placeholder={placeholder}
          placeholderTextColor={color.boulder}
          value={
            placeholder === 'Monthly income'
              ? tempData
              : capitalize
              ? data.toString().toUpperCase()
              : data
          }
          onChangeText={handleChangeText}
          keyboardType={keyBoardType}
          maxLength={maxLength}
          editable={editableL}
          autoCapitalize={autoCapitalizeL}
          onFocus={onFocus}
          multiline={multiline}
        />
        {iconUri && (
          <TouchableOpacity
            onPress={() => {
              imageClick();
            }}
            style={imageBoxStyle}>
            <Image
              source={iconUri}
              style={{height: 16, width: 16, resizeMode: 'contain'}}
            />
          </TouchableOpacity>
        )}
      </View>
    </BasicDetailsContainerCard>
  );
};

const styles = StyleSheet.create({
  containerStyle: {},
  inputIconContainerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputStyle: {
    flex: 1,
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.black,
  },
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand2,
    borderTopLeftRadius: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {BasicDetailsInput};
