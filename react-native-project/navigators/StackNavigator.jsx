import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomePage from '../components/HomePage';
import Detail from '../components/Detail'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import SearchPage from '../components/SearchPage';

const client = new ApolloClient({
  uri: `http://13.229.120.212/`,
  cache: new InMemoryCache(),
})

export default function StackNavigation() {
  const Stack = createNativeStackNavigator();

  return (
  <ApolloProvider client={client}>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={HomePage}/>
      <Stack.Screen name="Detail" component={Detail}/>
      <Stack.Screen name="Search" component={SearchPage}/>
    </Stack.Navigator>
  </ApolloProvider>
  );
}