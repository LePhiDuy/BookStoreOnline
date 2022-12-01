package vn.codegym.backend.service;

import vn.codegym.backend.model.Category;

import java.util.List;

public interface ICategoryService {
    List<Category> findAll();
}
