package vn.codegym.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.codegym.backend.model.Category;
import vn.codegym.backend.service.ICategoryService;

import java.util.List;

@RestController
@RequestMapping("api/category")
@CrossOrigin
public class CategoryController {
    @Autowired
    private ICategoryService categoryService;
    @GetMapping
    public ResponseEntity<List<Category>> findAll() {
        return new ResponseEntity<>(categoryService.findAll(), HttpStatus.OK);
    }
}
