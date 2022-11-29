package vn.codegym.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(name = "customer")
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "birthday")
    private Date birthday;
    @Column(name = "email")
    private String email;
    @Column(name = "gender")
    private boolean gender;
    @Column(name = "img_url")
    private String imgUrl;
    @Column(name = "phone")
    private String phone;
    @Column(name = "address")
    private String address;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "username")
    private Account account;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonBackReference
    private Cart cart;

    @OneToMany(mappedBy = "customer")
    private Set<Order> orders;
}
