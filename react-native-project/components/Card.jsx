import {
  Box,
  AspectRatio,
  Stack,
  Heading,
  HStack,
  Text,
  Image,
} from "native-base";
import { StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function MyCard({ item }) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() =>
        navigation.navigate("Detail", {
          id: item.id, 
        })
      }
    >
      <Box
        width="200"
        bg="black"
        borderColor="gray.700"
        borderWidth={2}
        borderRadius={14}
        overflow="hidden"
        marginRight={2}
        backgroundColor={"pink"}
      >
        <AspectRatio ratio={16 / 9}>
          <Image source={{ uri: item.imgUrl }} alt={item.title} />
        </AspectRatio>
        <Stack space={4} p={3}>
          <Heading size="md" color="white">
            {item.title}
          </Heading>
          <HStack justifyContent="space-between">
              <Text color="gray.400">Genre: {item?.Genre?.name}</Text>
              <Text color="gray.400">Rating: {item.rating}</Text>
          </HStack>
        </Stack>
      </Box>
    </Pressable>
  );
}

