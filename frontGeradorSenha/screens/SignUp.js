import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { signup } from "../service/authService";

export default function SignUp({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");

  const valido = nome && email && senha && senha === confirmar;
  const emailValido = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSignup = async () => {
    if (!emailValido(email)) {
      return alert("Email em formato inválido");
    }

    try {
      await signup({
        nome,
        email,
        senha,
        repetirSenha: confirmar,
      });

      alert("Cadastro realizado!");
      navigation.navigate("SignIn", { email });
    } catch (e) {
      console.log("ERRO SIGNUP:", e.response || e);

      let msg = "Erro no cadastro";

      const status = e.response?.status;

      if (status === 403) {
        msg = "Email já cadastrado";
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
      <Text style={styles.title}>SIGN UP</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput style={styles.input} value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Text style={styles.label}>Confirmar Senha</Text>
      <TextInput
        style={styles.input}
        secureTextEntry
        value={confirmar}
        onChangeText={setConfirmar}
      />

      <Pressable
        style={[styles.button, !valido && styles.disabled]}
        disabled={!valido}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>REGISTRAR</Text>
      </Pressable>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.link}>Voltar</Text>
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
  link: { marginTop: 15, textAlign: "center" },
});