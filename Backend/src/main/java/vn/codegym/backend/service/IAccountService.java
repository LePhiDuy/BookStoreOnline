package vn.codegym.backend.service;

import vn.codegym.backend.model.Account;

import java.util.Optional;

public interface IAccountService {
    Optional<Account> findByUsername(String username);
}
