// eslint-disable-next-line import/no-extraneous-dependencies
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useTheme } from '@/theme';

const NetworkStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(true);

  const { gutters, layout } = useTheme();

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
    !isConnected && (
      <View style={[layout.flex_1]}>
        <Text style={[]}>No internet connection</Text>
        <TouchableOpacity onPress={handleRetry} style={[gutters.marginTop_24]}>
          <Text style={[]}>Retry</Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default NetworkStatus;
