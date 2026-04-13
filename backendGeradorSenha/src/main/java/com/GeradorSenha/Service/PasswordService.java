package com.GeradorSenha.Service;

import com.GeradorSenha.Entity.PasswordRecord;
import com.GeradorSenha.Entity.User;
import com.GeradorSenha.Repository.PasswordRecordRepository;
import com.GeradorSenha.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;

@Service
public class PasswordService {

    @Autowired
    private PasswordRecordRepository passwordRepository;

    @Autowired
    private UserRepository userRepository;

    private static final String CHAR_LOWER = "abcdefghijklmnopqrstuvwxyz";
    private static final String CHAR_UPPER = CHAR_LOWER.toUpperCase();
    private static final String NUMBER = "0123456789";
    private static final String OTHER_CHAR = "!@#$%&*()_+-=[]?";

    private static final String PASSWORD_ALLOW_BASE = CHAR_LOWER + CHAR_UPPER + NUMBER;
    private static final String PASSWORD_ALLOW_BASE_SHUFFLE = shuffleString(PASSWORD_ALLOW_BASE);
    private static final String PASSWORD_ALLOW_ALL = CHAR_LOWER + CHAR_UPPER + NUMBER + OTHER_CHAR;
    private static final String PASSWORD_ALLOW_ALL_SHUFFLE = shuffleString(PASSWORD_ALLOW_ALL);

    private static final SecureRandom random = new SecureRandom();

    public String generatePassword(int length, boolean includeSymbols) {
        if (length < 1) throw new IllegalArgumentException();

        StringBuilder sb = new StringBuilder(length);
        String allow = includeSymbols ? PASSWORD_ALLOW_ALL_SHUFFLE : PASSWORD_ALLOW_BASE_SHUFFLE;

        for (int i = 0; i < length; i++) {
            int rndCharAt = random.nextInt(allow.length());
            char rndChar = allow.charAt(rndCharAt);
            sb.append(rndChar);
        }

        return sb.toString();
    }

    private static String shuffleString(String string) {
        List<String> letters = java.util.Arrays.asList(string.split(""));
        java.util.Collections.shuffle(letters);
        return String.join("", letters);
    }

    public PasswordRecord savePassword(String email, String senha, String descricao) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        PasswordRecord record = new PasswordRecord();
        record.setSenha(senha);
        record.setDescricao(descricao);
        record.setUser(user);

        return passwordRepository.save(record);
    }

    public List<PasswordRecord> getUserPasswords(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        return passwordRepository.findByUserOrderByDataCriacaoDesc(user);
    }

    public void deletePassword(String email, Long passwordId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        PasswordRecord record = passwordRepository.findById(passwordId)
                .orElseThrow(() -> new RuntimeException("Senha não encontrada"));

        if (!record.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Acesso negado");
        }

        passwordRepository.delete(record);
    }
}
