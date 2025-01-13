import type { ImageStyle } from 'react-native';

import { observer } from 'mobx-react-lite';
import {
  Alert,
  Image,
  Linking,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useTheme } from '@/theme';
import { navigationRef } from '@/navigation/Application';

import { IconByVariant, Loading } from '@/components/atoms';
import { SafeScreen } from '@/components/templates';

import movieStore from '@/store/MovieStore';

const searchActor = async (url: string) => {
  try {
    await Linking.openURL(url);
  } catch {
    Alert.alert(`Can not open actor url: ${url}`);
  }
};

const MovieDetail = observer(() => {
  const { isLoadingDetail, selectedMovie } = movieStore;

  const { borders, colors, fonts, gutters, layout } = useTheme();

  const shadow: ImageStyle = {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: colors.gray400,
        shadowOffset: { height: 2, width: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
      },
    }),
  };

  const paddingBottom =
    Platform.OS === 'android'
      ? gutters.paddingBottom_80
      : gutters.paddingBottom_40;

  return (
    <SafeScreen>
      <TouchableOpacity
        onPress={() => navigationRef.goBack()}
        style={[gutters.paddingLeft_16]}
      >
        <IconByVariant
          color={colors.gray800}
          height={32}
          path={'left-chevron'}
          width={32}
        />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={paddingBottom}
        style={[gutters.paddingTop_12, gutters.marginTop_12]}
      >
        {isLoadingDetail ? (
          <Loading />
        ) : (
          selectedMovie && (
            <View style={[gutters.paddingHorizontal_16]}>
              {selectedMovie.imgPoster && (
                <View style={[shadow, gutters.marginBottom_16]}>
                  <Image
                    defaultSource={require('@/theme/assets/images/movie_placeholder.png')}
                    resizeMode="cover"
                    source={{
                      uri: selectedMovie.imgPoster,
                    }}
                    style={[{ height: 400, width: '100%' }, borders.rounded_16]}
                  />
                </View>
              )}
              <View style={[gutters.marginTop_16]}>
                <Text style={[fonts.size_40, fonts.gray800, fonts.bold]}>
                  {selectedMovie.title}
                </Text>
                <Text
                  style={[
                    fonts.size_16,
                    fonts.gray400,
                    gutters.marginTop_16,
                    fonts.textAlignJustify,
                  ]}
                >
                  {selectedMovie.descrition}
                </Text>
                <Text
                  style={[
                    fonts.size_24,
                    fonts.gray800,
                    gutters.marginTop_16,
                    fonts.bold,
                  ]}
                >
                  Actors
                </Text>
                <View
                  style={[
                    layout.row,
                    layout.wrap,
                    gutters.gap_12,
                    gutters.marginTop_12,
                  ]}
                >
                  {selectedMovie.actor.map((item, index) => (
                    <TouchableOpacity
                      key={`actor-${index}`}
                      onPress={() => searchActor(item.url)}
                      style={[
                        borders.w_1,
                        gutters.padding_12,
                        borders.gray400,
                        borders.rounded_16,
                      ]}
                    >
                      <Text style={[fonts.gray400, fonts.semiBold]}>
                        {item.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={[gutters.marginTop_16]}>
                  <Text
                    style={[
                      fonts.size_14,
                      fonts.gray400,
                      fonts.textAlignJustify,
                    ]}
                  >
                    Keywords: {selectedMovie.keywords}
                  </Text>
                </View>
                <View style={[gutters.marginTop_16]}>
                  <Text style={[fonts.size_16, fonts.gray400, fonts.bold]}>
                    Rating: {selectedMovie.rating} / 10
                  </Text>
                </View>
                {/* List of review */}
                <View
                  style={[
                    gutters.marginTop_16,
                    gutters.padding_12,
                    borders.rounded_12,
                    borders.w_1,
                    borders.gray200,
                  ]}
                >
                  <Text style={[fonts.size_16, fonts.gray800, fonts.semiBold]}>
                    Review
                  </Text>
                  <View
                    style={[
                      layout.justifyBetween,
                      layout.row,
                      gutters.marginTop_12,
                    ]}
                  >
                    <View style={[layout.row, layout.itemsCenter]}>
                      <IconByVariant
                        color={colors.gray800}
                        height={32}
                        path={'user-placeholder'}
                        width={32}
                      />
                      <Text
                        style={[
                          fonts.size_14,
                          fonts.gray800,
                          gutters.marginLeft_4,
                        ]}
                      >
                        {selectedMovie.review.author.name}
                      </Text>
                    </View>
                    <Text style={[fonts.size_14, fonts.gray800]}>
                      {selectedMovie.review.dateCreated}
                    </Text>
                  </View>
                  <View style={[gutters.marginTop_12]}>
                    <Text
                      style={[fonts.size_14, fonts.gray800, fonts.semiBold]}
                    >
                      {selectedMovie.review.name}
                    </Text>
                    <Text
                      style={[
                        fonts.size_14,
                        fonts.gray400,
                        gutters.marginTop_12,
                        fonts.textAlignJustify,
                      ]}
                    >
                      {selectedMovie.review.reviewBody}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )
        )}
      </ScrollView>
    </SafeScreen>
  );
});

export default MovieDetail;
