package cdtu.mall.service.pojo;

import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "lose")
public class Lose {

    @Id
    private String id;
    private String name;
    private String desc;
    private String time;
    private int flag;
    private String address;
}
