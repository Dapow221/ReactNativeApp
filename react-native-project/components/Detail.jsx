import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { View, Text, NativeBaseProvider, Box } from "native-base";
import { gql, useQuery } from "@apollo/client";
import { useRoute } from "@react-navigation/native";

const GET_MOVIES_DETAIL = gql`
  query FetchMoviesDetail($moviesId: ID!) {
    moviesById(id: $moviesId) {
      id
      title
      synopsis
      trailerUrl
      imgUrl
      rating
      Genre {
        name
      }
    }
  }
`;

export default function DetailPage() {
  const route = useRoute();
  const { error, loading, data } = useQuery(GET_MOVIES_DETAIL, {
    variables: {
      moviesId: route.params.id,
    },
  });

  if (loading) {
    return (
      <NativeBaseProvider>
        <View style={[styles.containerLoading, styles.horizontal]}>
          <ActivityIndicator size="large" />
        </View>
      </NativeBaseProvider>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <NativeBaseProvider>
        <ScrollView>
          <Box style={styles.cardContainer}>
            <Image
              style={styles.image}
              source={{
                uri: data?.moviesById?.imgUrl,
              }}
            />
            <View style={{ padding: 18 }}>
              <Text style={styles.title}>{data?.moviesById?.title}</Text>
              <Text style={styles.genre}>
                Genre: {data?.moviesById?.Genre.name}
              </Text>
              <Text style={styles.genre}>
                Rating: {data?.moviesById?.rating}
              </Text>
              <Text style={styles.synopsis}>
                Synopsis: {data?.moviesById?.synopsis}
              </Text>
            </View>
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </SafeAreaView>
  );
}

const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  cardContainer: {
    flex: 1,
    backgroundColor: "black",
    margin: 18,
    borderRadius: 14,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: windowHeight / 2,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 14,
    color: "white",
  },
  genre: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 10,
    color: "white",
  },
  synopsis: {
    color: "white",
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
