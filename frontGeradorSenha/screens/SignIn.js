import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signin } from "../service/authService";

export default function SignIn({ navigation, route, onLogin }) {
  const initialEmail = route.params?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [senha, setSenha] = useState("");

  const ativo = email !== "" && senha !== "";

  const handleLogin = async () => {
    try {
      const response = await signin({ email, senha });

      const token = response.data.token;

      await AsyncStorage.setItem("token", token);

      onLogin();

      alert("Login feito!");
    } catch (e) {
      console.log("ERRO LOGIN:", e.response || e);

      let msg = "Erro no login";
      const status = e.response?.status;

      if (status === 404) {
        msg = "Email não existente";
      } else if (status === 401) {
        msg = "Senha inválida";
      } else if (status === 400) {
        msg = "Dados inválidos";
      } else if (e.response?.data?.message) {
        msg = e.response.data.message;
      }

      alert(msg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SIGN IN</Text>

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Pressable
        style={[styles.button, !ativo && styles.disabled]}
        disabled={!ativo}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>ENTRAR</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.link}>Não possui conta ainda? Crie agora.</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: "#3b82f6",
    marginBottom: 30,
    fontWeight: "bold",
  },
  label: { marginBottom: 5 },
  input: {
    backgroundColor: "#5bc0eb",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    marginBottom: 15,
    padding: 10,
  },
  button: {
    backgroundColor: "#ccc",
    padding: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  disabled: { opacity: 0.5 },
  buttonText: { fontWeight: "bold" },
  link: { marginTop: 20, textAlign: "center" },
});