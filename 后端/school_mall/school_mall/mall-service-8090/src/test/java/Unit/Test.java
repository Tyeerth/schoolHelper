package Unit;

import cdtu.mall.service.CdtuMallServiceApplication;
import cdtu.mall.service.service.UnitService;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@SpringBootTest(classes = CdtuMallServiceApplication.class)
@RunWith(SpringRunner.class)
public class Test {
    @Autowired
    private UnitService unitService;

    @org.junit.Test
    public void test1()
    {
//        System.out.println(unitService.utterance());
    }

}
