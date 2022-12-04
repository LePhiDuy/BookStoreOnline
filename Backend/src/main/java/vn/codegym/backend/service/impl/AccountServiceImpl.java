package vn.codegym.backend.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import vn.codegym.backend.model.Account;
import vn.codegym.backend.repository.IAccountRepository;
import vn.codegym.backend.service.IAccountService;

import java.util.Optional;

@Service
public class AccountServiceImpl implements IAccountService {
    @Autowired
    private IAccountRepository accountRepository;
    @Override
    public Optional<Account> findByUsername(String username) {
        return accountRepository.findByUsername(username);
    }
}
