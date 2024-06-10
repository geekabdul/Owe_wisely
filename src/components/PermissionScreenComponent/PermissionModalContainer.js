import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import {color} from '../../utility';

const PermissionModalContainer = ({onPress, visible, children}) => {
  const {overlayViewStyle, containerStyle} = styles;
  return (
    <Modal transparent visible={visible}>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={overlayViewStyle}>
          <View style={containerStyle}>{children}</View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlayViewStyle: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.permissionModalOverlay,
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {PermissionModalContainer};
