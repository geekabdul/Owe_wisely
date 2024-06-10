/*
D Name: Zeel Gohil
D Email ID: zeelgohil9757@gmail.com
D Contact Number: 9757463439
V Number: 1.0
Comp/Props Desc:
  1. label: Text to define field.
  2. multiple: Pass true if multiple selection from dropdown is needed.
  3. data: Data will be the actual dropdown data that we'll select from. Pass array.
  4. placeholder: Dropdown Placeholder/Identifier.
  5. value: Value will be the state where current selected data will be saved.
  6. onChange: On Change returns one callback say (item) which can be used to change the state of value.
*/
import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {Dropdown, MultiSelect} from 'react-native-element-dropdown';
import {image} from '../../assets';
import {color, dimension, font} from '../../utility';
import {BasicDetailsContainerCard} from '../BasicDetailsComponent/BasicDetailsContainerCard';
import {responsiveScreenWidth} from '../../utility/Size';

const CustomizableDropdown = ({
  label,
  multiple,
  data = [],
  placeholder,
  value,
  onChange,
  search,
  searchPlaceholder,
  style,
  isRequired,
  disable = false,
  iconUri,
  dropdownPosition,
  colorOpacity = false,
  tintColor = false,
  onBlur,
}) => {
  const {labelTextStyle, dropdown, textStyle, inputSearchStyle, imageBoxStyle} =
    styles;
  useEffect(() => {
    // console.log('data : ', data, multiple, value, 'dropdownnnnnnnnnn');
  }, [data]);
  const data1 = [
    {label: 'Option 1', value: 'option1'},
    {label: 'Option 2', value: 'option2'},
    {label: 'Option 3', value: 'option3'},
  ];
  return (
    <BasicDetailsContainerCard>
      {label && <Text style={labelTextStyle}>{label}</Text>}
      {!multiple ? (
        <Dropdown
          onBlur={onBlur}
          dropdownPosition={dropdownPosition}
          style={dropdown}
          data={data ? data : data1}
          labelField="name"
          valueField="name"
          placeholder={placeholder}
          placeholderStyle={textStyle}
          disable={disable}
          selectedTextStyle={[
            {color: colorOpacity ? '#ccc' : color.boulder},
            textStyle,
          ]}
          activeColor={color.fadeBackground}
          renderRightIcon={() => (
            <>
              {iconUri ? (
                <View style={{flexDirection: 'row', marginRight: -15}}>
                  <Image
                    source={image.caretDownBlackIcon}
                    style={{margin: 10, justifyContent: 'center'}}
                  />
                  <View style={imageBoxStyle}>
                    <Image
                      source={iconUri}
                      style={{
                        height: 16,
                        width: 16,
                        tintColor: tintColor && 'grey',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                </View>
              ) : (
                <Image
                  source={image.caretDownBlackIcon}
                  style={{justifyContent: 'center'}}
                />
              )}
            </>
          )}
          value={value}
          onChange={onChange}
          search={search}
          inputSearchStyle={inputSearchStyle}
          // containerStyle={{width :'90%',mariginLeft : -30}}
          searchPlaceholder={searchPlaceholder}
          autoScroll={false}
          // itemTextStyle={{color: color.gray}}
          itemTextStyle={{
            color: color.gray,
            height: 20,
            marginTop: responsiveScreenWidth(-2),
          }}
          containerStyle={{marginLeft: -20, width: '90%'}}
          // itemContainerStyle={{height:responsiveScreenWidth(10)}}
        />
      ) : (
        <MultiSelect
          style={dropdown}
          data={data ? data : data1}
          labelField="label"
          valueField="value"
          placeholder={placeholder}
          // placeholderStyle={{color: COLORS.salem}}
          // selectedTextStyle={{color: COLORS.salem}}
          // renderRightIcon={() => <Image source={IMAGES.dropDownArrow} />}
          // iconColor={{color: COLORS.salem}}
          value={value}
          onChange={onChange}
          search={search}
          inputSearchStyle={inputSearchStyle}
          searchPlaceholder={searchPlaceholder}
        />
      )}
    </BasicDetailsContainerCard>
  );
};

const styles = {
  labelTextStyle: {
    fontSize: 15,
    color: color.eucalyptus,
    marginBottom: 10,
    marginTop: 15,
    fontWeight: '600',
  },
  textStyle: {
    fontSize: 14,
    fontFamily: font.soraRegular,
  },
  dropdown: {
    height: 50,
    fontSize: 14,
    fontFamily: font.soraRegular,
    color: color.boulder,
    paddingRight: 15,
  },
  inputSearchStyle: {},
  imageBoxStyle: {
    height: dimension.width * 0.09,
    width: dimension.width * 0.09,
    backgroundColor: color.wildSand2,
    borderTopLeftRadius: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
};

export {CustomizableDropdown};
