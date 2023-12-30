import {
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import {
  Center,
  Container,
  Heading,
  Text,
  NativeBaseProvider,
  View,
} from "native-base";
import MyCard from "./Card";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query FetchMovies {
    movies {
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

export default function HomePage() {
  const { loading, error, data } = useQuery(GET_MOVIES);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <NativeBaseProvider>
          <ScrollView>
            <Image
              style={{
                flex: 1,
                resizeMode: "cover",
                width: "100%",
                height: 350,
              }}
              source={{
                uri: "https://images7.alphacoders.com/740/740446.jpg",
              }}
            />

            <Center>
              <Container>
                <Heading color="white" style={styles.heading}>
                  Welcome to Dapow Movies Apps
                </Heading>
                <Text style={styles.textStyles}>
                  Dapow Movies is an immersive cinematic experience that brings
                  together a diverse selection of films catering to all tastes
                  and preferences. With a user-friendly interface and
                  cutting-edge design, Dapow Movies offers a seamless platform
                  for movie enthusiasts to explore and enjoy a vast collection
                  of titles. From gripping dramas to heartwarming comedies,
                  Dapow Movies curates an extensive library, ensuring there's
                  something for everyone. The platform's commitment to providing
                  high-quality content is reflected in its attention to detail,
                  making it a go-to destination for those seeking an enriching
                  and entertaining movie-watching journey. Dive into the world
                  of Dapow Movies, where cinematic excellence meets the
                  convenience of modern streaming, promising an unparalleled and
                  delightful entertainment experience.
                </Text>
                <Heading color="white" style={styles.heading}>
                 Popular Movies
                </Heading>
                <FlatList
                  style={{ paddingBottom: 25}}
                  data={data?.movies || []}
                  renderItem={({ item }) => <MyCard item={item} />}
                  horizontal={true}
                />
              </Container>
            </Center>
          </ScrollView>
        </NativeBaseProvider>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  heading: {
    marginTop: 20,
    marginBottom: 20,
  },
  textStyles: {
    marginBottom: 20,
    fontWeight: "medium",
    color: "white",
  },
});
