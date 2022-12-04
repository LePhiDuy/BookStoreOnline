package vn.codegym.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.backend.model.Account;

import java.util.Optional;

public interface IAccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findByUsername(String username);
}
