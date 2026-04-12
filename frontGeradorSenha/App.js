import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import HistoricoSenha from "./screens/HistoricoSenha";

const Stack = createNativeStackNavigator();

export default function App() {
  const [logado, setLogado] = useState(null);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem("token");
    setLogado(!!token);
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (logado === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
        {!logado ? (
          <>
            <Stack.Screen name="SignIn">
              {(props) => <SignIn {...props} onLogin={checkToken} />}
            </Stack.Screen>

            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home">
              {(props) => <Home {...props} onLogout={checkToken} />}
            </Stack.Screen>

            <Stack.Screen name="Historico" component={HistoricoSenha} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}