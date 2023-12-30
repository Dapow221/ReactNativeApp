import { NavigationContainer } from "@react-navigation/native";
import TabNavigators from "./navigators/TabNavigators"

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigators />
    </NavigationContainer>
  );
}
