package cdtu.mall.service.pojo;


import lombok.Data;

import javax.persistence.Id;
import javax.persistence.Table;

@Data
@Table(name = "activity")
public class Activity {

    @Id
    private String id;
    private String name;
    private String time;
    private String content;
    private String address;

}
