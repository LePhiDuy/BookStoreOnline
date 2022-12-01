package vn.codegym.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import vn.codegym.backend.model.Category;

public interface ICategoryRepository extends JpaRepository<Category, Long> {
}
