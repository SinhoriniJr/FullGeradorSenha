package com.GeradorSenha.Controller;

import com.GeradorSenha.Entity.PasswordRecord;
import com.GeradorSenha.Service.PasswordService;
import com.GeradorSenha.Util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/passwords")
public class PasswordController {

    @Autowired
    private PasswordService passwordService;

    @Autowired
    private JwtUtil jwtUtil;

    private String getEmailFromHeader(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Token inválido ou não fornecido");
        }
        String token = authHeader.substring(7);
        return jwtUtil.getEmail(token);
    }

    @GetMapping("/generate")
    public ResponseEntity<?> generatePassword(
            @RequestParam(defaultValue = "12") int length,
            @RequestParam(defaultValue = "true") boolean symbols) {
        try {
            String senha = passwordService.generatePassword(length, symbols);
            return ResponseEntity.ok(Map.of("senha", senha));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping
    public ResponseEntity<?> savePassword(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Map<String, String> body) {
        try {
            String email = getEmailFromHeader(authHeader);
            PasswordRecord record = passwordService.savePassword(
                    email,
                    body.get("senha"),
                    body.get("descricao")
            );
            Map<String, Object> responseMap = new java.util.HashMap<>();
            responseMap.put("id", record.getId());
            responseMap.put("senha", record.getSenha());
            responseMap.put("descricao", record.getDescricao());
            responseMap.put("dataCriacao", record.getDataCriacao().toString());
            return ResponseEntity.ok(responseMap);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getUserPasswords(@RequestHeader("Authorization") String authHeader) {
        try {
            String email = getEmailFromHeader(authHeader);
            List<PasswordRecord> records = passwordService.getUserPasswords(email);
            
            List<Map<String, Object>> response = records.stream().map(record -> {
                Map<String, Object> map = new java.util.HashMap<>();
                map.put("id", record.getId());
                map.put("senha", record.getSenha());
                map.put("descricao", record.getDescricao() != null ? record.getDescricao() : "");
                map.put("dataCriacao", record.getDataCriacao().toString());
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePassword(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id) {
        try {
            String email = getEmailFromHeader(authHeader);
            passwordService.deletePassword(email, id);
            return ResponseEntity.ok(Map.of("message", "Senha excluída com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
