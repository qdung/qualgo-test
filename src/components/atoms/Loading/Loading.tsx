import React from 'react';
import { ActivityIndicator, View } from 'react-native';

import { useTheme } from '@/theme';

interface LoadingProps {
  color?: string;
  size?: 'large' | 'small';
}

const Loading: React.FC<LoadingProps> = ({
  color = '#0000ff',
  size = 'large',
}) => {
  const { layout } = useTheme();
  return (
    <View style={[layout.flex_1, layout.itemsCenter, layout.justifyCenter]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

export default Loading;
