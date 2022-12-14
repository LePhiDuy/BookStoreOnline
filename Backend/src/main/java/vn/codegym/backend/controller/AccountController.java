package vn.codegym.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.codegym.backend.model.Account;
import vn.codegym.backend.security.JwtUtil;
import vn.codegym.backend.service.IAccountService;

import java.util.Optional;

@RestController
@RequestMapping("/api/account")
@CrossOrigin
public class AccountController {
    @Autowired
    private IAccountService accountService;
    @Autowired
    private JwtUtil jwtUtil;
    @GetMapping("/getAccountFromToken")
    public ResponseEntity<Account> getAccountFromToken(@RequestParam String token)  {
        String username = jwtUtil.getUsernameFromToken(token);
        Optional<Account> accountOptional = accountService.findByUsername(username);

        if(!accountOptional.isPresent())
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        return new ResponseEntity<>(accountOptional.get(), HttpStatus.OK);
    }
}
