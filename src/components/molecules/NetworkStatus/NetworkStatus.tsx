/* eslint-disable import/no-extraneous-dependencies */

import type { ViewStyle } from 'react-native';

import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import { useTheme } from '@/theme';

const modalSize: ViewStyle = {
  backgroundColor: 'white',
  height: 200,
  width: 200,
};

const NetworkStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  const { borders, gutters, layout } = useTheme();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  const handleRetry = () => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
    });
  };

  return (
    <Modal
      isVisible={!isConnected}
      style={{
        justifyContent: 'center',
        margin: 0,
      }}
    >
      <View
        style={[
          layout.itemsCenter,
          layout.justifyCenter,
          layout.selfCenter,
          borders.rounded_16,
          modalSize,
        ]}
      >
        <Text style={[]}>No internet connection</Text>
        <TouchableOpacity onPress={handleRetry} style={[gutters.marginTop_24]}>
          <Text style={[]}>Retry</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default NetworkStatus;
