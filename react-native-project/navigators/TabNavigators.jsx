import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, Feather } from "@expo/vector-icons";
import SearchPage from "../components/SearchPage";
import StackNavigation from "./StackNavigator";

export default function MainTab() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: 'black' },
      }}
    >
      <Tab.Screen
        name="StackNavigation"
        component={StackNavigation}
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color="white" />
          ),
          tabBarLabelStyle: { color: 'white' },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchPage}
        options={{
          headerShown: false,
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Feather name="search" size={size} color="white" />
          ),
          tabBarLabelStyle: { color: 'white' },
        }}
      />
    </Tab.Navigator>
  );
}
