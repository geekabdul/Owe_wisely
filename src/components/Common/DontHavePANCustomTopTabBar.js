import React, {useState} from 'react';
import {Animated, View, TouchableOpacity, StyleSheet} from 'react-native';
import {Header} from './Header';
import {image} from '../../assets';
import {color, font} from '../../utility';
import FAQModal from '../../components/FAQComponent/FAQModal';
function DontHavePANCustomTopTabBar({
  state,
  descriptors,
  navigation,
  position,
  headerLabel,
}) {
  const {containerStyle, focusContainerStyle, labelTextStyle} = styles;
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={{backgroundColor: color.white}}>
      <Header
        backOnPress={() => navigation.goBack()}
        iconUri={image.infoIcon}
        label={headerLabel}
        onPress={() => {
          setShowModal(true);
        }}
      />
      {showModal ? (
        <FAQModal
          modalVisible={showModal}
          onPressclose={() => {
            setShowModal(false);
          }}
          categoryName={'driving_license'}
        />
      ) : null}
      <View style={{flexDirection: 'row'}}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({name: route.name, merge: true});
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const inputRange = state.routes.map((_, i) => i);
          const opacity = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0)),
          });
          const borderRadiusStyle = {
            borderBottomRightRadius: isFocused && index === 0 ? 5 : 0,
            borderBottomLeftRadius: isFocused && index === 1 ? 5 : 0,
          };
          const textExtraStyle = {
            color: isFocused ? color.white : 'rgba(14, 14, 14, 0.3)',
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[
                !isFocused ? containerStyle : focusContainerStyle,
                borderRadiusStyle,
              ]}>
              <Animated.Text style={[labelTextStyle, textExtraStyle]}>
                {label}
              </Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    backgroundColor: color.concrete,
  },
  focusContainerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    backgroundColor: color.black,
  },
  labelTextStyle: {
    fontSize: 12,
    fontFamily: font.soraBold,
  },
});

export {DontHavePANCustomTopTabBar};
