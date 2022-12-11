package vn.codegym.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.backend.model.Customer;

import java.util.Optional;

public interface ICustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByEmail(String email);
}
