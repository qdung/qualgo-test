import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/theme';

interface LoadingProps {
  size?: 'large' | 'small';
}

const Loading: React.FC<LoadingProps> = ({ size = 'large' }) => {
  const { colors, gutters, layout } = useTheme();
  return (
    <View
      style={[
        layout.flex_1,
        layout.itemsCenter,
        layout.justifyCenter,
        gutters.paddingTop_80,
      ]}
      testID="loading-indicator"
    >
      <ActivityIndicator color={colors.gray800} size={size} />
    </View>
  );
};

export default Loading;
