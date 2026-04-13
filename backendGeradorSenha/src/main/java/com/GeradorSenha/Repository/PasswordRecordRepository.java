package com.GeradorSenha.Repository;

import com.GeradorSenha.Entity.PasswordRecord;
import com.GeradorSenha.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PasswordRecordRepository extends JpaRepository<PasswordRecord, Long> {
    List<PasswordRecord> findByUserOrderByDataCriacaoDesc(User user);
}
