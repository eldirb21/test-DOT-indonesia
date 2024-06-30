import {ActivityIndicator, Modal, StyleSheet, View} from 'react-native';
import React from 'react';

type Props = {
  visible?: boolean;
  style?: any;
  bgColor?: string;
};

const Spinner = (props: Props) => {
  return (
    <Modal visible={props.visible} transparent statusBarTranslucent>
      <View style={[styles.spinner, props.style]}>
        <ActivityIndicator size={40} />
      </View>
    </Modal>
  );
};

export default Spinner;

const styles = StyleSheet.create({
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
});
