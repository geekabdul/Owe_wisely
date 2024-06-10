import {StyleSheet} from 'react-native';
import {color} from './color';
import {dimension} from './dimensions';
import {font} from './fonts';

export const style = StyleSheet.create({
  commonRowStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commonRowStyleWithSpaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonImageStyle: {
    height: '100%',
    width: '100%',
    borderColor: 'red',
  },
  commonImageStyle1: {
    height: '50%',
    width: '50%',
  },
  permissionButtonTextStyle: {
    fontSize: 14,
    fontFamily: font.soraBold,
  },
  permissionButtonSeparatorBorderStyle: {
    borderBottomWidth: 1,
    width: dimension.width * 0.6,
    borderColor: color.mercury,
    marginVertical: 15,
  },
});
