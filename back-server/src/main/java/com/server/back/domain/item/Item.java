package com.server.back.domain.item;

import com.server.back.domain.user.User;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id")
    private Long itemId;
    @Column(nullable = false)
    private String itemName;
    @Column(nullable = false)
    private Integer itemType;
    @Column(nullable = false)
    private Integer itemPrice;
    @Column(nullable = false)
    private String itemDetail;


    @Builder
    public Item(Long itemId,String itemName,Integer itemType, Integer itemPrice, String itemDetail) {
        this.itemId = itemId;
        this.itemName = itemName;
        this.itemType = itemType;
        this.itemPrice = itemPrice;
        this.itemDetail = itemDetail;
    }
}
