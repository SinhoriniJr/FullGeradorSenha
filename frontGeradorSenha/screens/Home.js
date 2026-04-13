import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Modal,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { generatePassword, savePassword } from "../service/passwordService";
import { useEffect } from "react";

export default function Home({ navigation, onLogout }) {
  const [senha, setSenha] = useState("");
  const [modal, setModal] = useState(false);
  const [nome, setNome] = useState("");

  const gerar = () => setSenha(generatePassword());

  const salvar = async () => {
    try {
      await savePassword(senha, nome);
      setModal(false);
      setNome("");
      navigation.navigate("Historico");
    } catch (error) {
      alert("Erro ao salvar: " + (error.response?.data || error.message));
    }
  };

  const copiar = async () => {
    await Clipboard.setStringAsync(senha);
    alert("Copiado");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");

    onLogout();

    alert("Logout realizado");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GERADOR DE SENHA</Text>

      <Text style={styles.password}>{senha || "********"}</Text>

      <Pressable style={styles.button} onPress={gerar}>
        <Text style={styles.btnText}>GERAR SENHA</Text>
      </Pressable>

      <Pressable
        style={[styles.button, !senha && styles.disabled]}
        disabled={!senha}
        onPress={() => setModal(true)}
      >
        <Text style={styles.btnText}>SALVAR</Text>
      </Pressable>

      <Pressable
        style={[styles.button, !senha && styles.disabled]}
        disabled={!senha}
        onPress={copiar}
      >
        <Text style={styles.btnText}>COPIAR</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={logout}>
        <Text style={styles.btnText}>SAIR</Text>
      </Pressable>

      <Pressable onPress={() => navigation.navigate("Historico")}>
        <Text style={styles.link}>Ver Senhas</Text>
      </Pressable>

      <Modal visible={modal} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>CADASTRO DE SENHA</Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do aplicativo"
              value={nome}
              onChangeText={setNome}
            />

            <TextInput
              style={[styles.input, { backgroundColor: "#eee" }]}
              value={senha}
              editable={false}
            />

            <Pressable
              style={[styles.modalBtn, !nome && styles.disabled]}
              disabled={!nome}
              onPress={salvar}
            >
              <Text style={styles.modalText}>CRIAR</Text>
            </Pressable>

            <Pressable style={styles.modalBtn} onPress={() => setModal(false)}>
              <Text style={styles.modalText}>CANCELAR</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: {
    fontSize: 22,
    color: "#1e40af",
    fontWeight: "bold",
    marginBottom: 20,
  },
  password: { fontSize: 20, marginBottom: 20, letterSpacing: 2 },
  button: {
    backgroundColor: "#1e3a8a",
    padding: 15,
    width: "80%",
    marginBottom: 10,
  },
  btnText: { color: "#fff", textAlign: "center" },
  disabled: { opacity: 0.5 },
  link: { marginTop: 10 },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
  },
  modalTitle: { textAlign: "center", marginBottom: 10 },
  input: { borderWidth: 1, marginBottom: 10, padding: 8 },
  modalBtn: { backgroundColor: "#3b82f6", padding: 10, marginTop: 5 },
  modalText: { textAlign: "center", color: "#fff" },
});