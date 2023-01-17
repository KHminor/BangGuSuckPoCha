package com.project.pocha.domain.user;

import lombok.Data;
import org.hibernate.boot.registry.selector.spi.StrategySelector;

import javax.persistence.*;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;
    private String userName;
    private String password;
    private String role;
}