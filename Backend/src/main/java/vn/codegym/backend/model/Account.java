package vn.codegym.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Entity
@Table(name = "account")
public class Account {
    @Id
    @Column(name = "username")
    private String username;
    @Column(name = "password")
    private String password;
    @ManyToMany
    @JoinTable(name = "account_role", joinColumns = @JoinColumn(name = "username"),
                inverseJoinColumns = @JoinColumn(name = "role_id"))
    private List<Role> roles;
    @OneToOne
    @JsonBackReference
    private Customer customer;
}
