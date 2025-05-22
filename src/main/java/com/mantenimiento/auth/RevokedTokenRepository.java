package com.mantenimiento.auth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RevokedTokenRepository extends JpaRepository<RevokedToken, String> {
    boolean existsByToken(String toeken);
}
