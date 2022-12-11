package vn.codegym.backend.service;

import vn.codegym.backend.model.Customer;

import java.util.Optional;

public interface ICustomerService {
    Optional<Customer> findByEmail(String email);
}
