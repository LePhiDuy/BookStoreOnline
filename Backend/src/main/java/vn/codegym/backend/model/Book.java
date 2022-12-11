package vn.codegym.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "book")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "name")
    private String name;
    @Column(name = "author")
    private String author;
    @Column(name = "year_publish")
    private Date yearPublish;
    @Column(name = "img_url")
    private String imgUrl;
    @Column(name = "price")
    private double price;
    @Column(name = "amount")
    private int amount;
    @Column(name = "publisher")
    private String publisher;
    @Column(name = "language")
    private String language;
    @Column(name = "total_pages")
    private int totalPages;
    @Column(name = "number_rating")
    private int numberRating;
    @Column(name = "point_star")
    @Min(value = 0)
    @Max(value = 5)
    private int pointStar;
    @Column(name = "weight")
    private double weight;
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    @ManyToOne
    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private Category category;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    @JsonIgnore
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "book")
    @JsonManagedReference
    private List<OrderDetail> orderItems;
}
