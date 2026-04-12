package com.GeradorSenha.Controller;

import com.GeradorSenha.Service.AuthService;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/")
public class AuthController {

    @Autowired
    private AuthService service;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody Map<String, String> body) {

        service.signup(
                body.get("nome"),
                body.get("email"),
                body.get("senha"),
                body.get("repetirSenha")
        );

        return ResponseEntity.ok("Usuário criado");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody Map<String, String> body) {

        String token = service.signin(
                body.get("email"),
                body.get("senha")
        );

        return ResponseEntity.ok(Map.of("token", token));
    }

    @GetMapping("/signout")
    public ResponseEntity<?> signout() {
        return ResponseEntity.ok("Logout feito");
    }
    @GetMapping("/api/teste")
    public String teste() {
        return "Você está autenticado";
    }
}