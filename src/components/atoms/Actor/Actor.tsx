import type { ImageStyle } from 'react-native';
import type { Actor } from '@/store/types';

import { Image, Text, View } from 'react-native';

import { useTheme } from '@/theme';

const size: ImageStyle = {
  height: 96,
  width: 96,
};

const Actor = ({ actor }: { actor: Actor }) => {
  const { backgrounds, borders, fonts, gutters, layout } = useTheme();
  return (
    <View style={[gutters.padding_12]}>
      <Image
        resizeMode="cover"
        source={{ uri: actor.url }}
        style={[borders.rounded_16, size]}
      />
      <Text style={[fonts.bold, fonts.size_12, fonts.gray400]}>
        {/* {actor.name} */}
      </Text>
    </View>
  );
};

export default Actor;
