package vn.codegym.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Data;

import javax.persistence.*;
import java.util.Date;
import java.util.Set;

@Entity
@Data
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "date_order")
    private Date dateOrder;
    @Column(name = "date_delivery")
    private Date dateDelivery;
    @Column(name = "date_receipt")
    private Date dateReceipt;
    @Column(name = "totel_price")
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    @JsonBackReference
    private Customer customer;

    @OneToMany(mappedBy = "order")
    @JsonManagedReference
    private Set<OrderDetail> orderDetails;
}
