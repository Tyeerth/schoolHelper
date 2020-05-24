package mySearch;


import cdtu.mall.CdtuMallGoodsApplication;
import cdtu.mall.search.pojo.Goods;
import cdtu.mall.search.repository.GoodsRepository;
import cdtu.mall.search.service.imp.SearchServiceImp;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.elasticsearch.core.ElasticsearchTemplate;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@SpringBootTest(classes = CdtuMallGoodsApplication.class)
@RunWith(SpringRunner.class)
public class Test {

    @Autowired
    private ElasticsearchTemplate elasticsearchTemplate;
    @Autowired
    private GoodsRepository goodsRepository;

    @Autowired
    private SearchServiceImp searchServiceImp;

    int flag=0;
    @org.junit.Test
    public void createIndex()
    {
        //1.分批查询skus，category,shop数据

        //2.将以上数据整合成goods结果集
        //3.利用goodsReposiyory将goods结果集导入索引库
        // 创建索引
        this.elasticsearchTemplate.createIndex(Goods.class);
        // 配置映射
        this.elasticsearchTemplate.putMapping(Goods.class);
        Integer page = 0;
        Integer rows = 100;

        do {

            List<Goods> goodsList = searchServiceImp.buildGoodsList(page, rows);
            if(goodsList.size()>0)
            {
                this.goodsRepository.saveAll(goodsList);
            }
            // 获取当前页的数据条数，如果是最后一页，没有100条
            rows =goodsList.size();
            System.out.println(rows);
            // 每次循环页码加1
            page=page+100;
            flag++;

            System.out.println(flag+"次");
        } while (rows==100);
   }

//   @org.junit.Test
//    public void test()
//   {
//       String s="你的答案我的密码他说";
//       int lastIndexOf = s.lastIndexOf(" ");
//       System.out.println(lastIndexOf);
//       System.out.println("11");
//       String substring = s.substring(lastIndexOf);
//       System.out.println(substring);
//   }
}
