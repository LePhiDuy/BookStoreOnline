package vn.codegym.backend.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "order_detail")
public class OrderDetail {
    @Id
    private OrderItemKey id;
    private double price;
    private int amount;

    @MapsId("orderId")
    @ManyToOne(targetEntity = Order.class)
//    @JsonBackReference
    private Order order;

    @MapsId("bookId")
    @ManyToOne(targetEntity = Book.class)
//    @JsonBackReference
    private Book book;
}
