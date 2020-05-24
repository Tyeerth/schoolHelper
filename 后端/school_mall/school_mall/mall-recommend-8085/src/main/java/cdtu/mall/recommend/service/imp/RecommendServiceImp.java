package cdtu.mall.recommend.service.imp;

import cdtu.mall.common.response.PageResult;
import cdtu.mall.recommend.pojo.Goods;
import cdtu.mall.recommend.repository.GoodsRepository;
import cdtu.mall.recommend.service.RecommendService;
import org.elasticsearch.index.query.QueryBuilders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.elasticsearch.core.query.NativeSearchQueryBuilder;
import org.springframework.stereotype.Service;

@Service
public class RecommendServiceImp implements RecommendService {

    @Autowired
    private GoodsRepository goodsRepository;

    private static int pageSize=10;
    @Override
    public PageResult<Goods> searchAll(int pageNum) {
        //1.构建查询器
        NativeSearchQueryBuilder queryBuilder = new NativeSearchQueryBuilder();
        //2.查询条件
        queryBuilder.withQuery(QueryBuilders.matchAllQuery());
//        queryBuilder.withQuery(QueryBuilders.fuzzyQuery("title",key));
//        queryBuilder.withQuery(QueryBuilders.multiMatchQuery(key,"title","shopName","cname"));
////        queryBuilder.withQuery(QueryBuilders.matchQuery("title",searchRequest.getKey()).operator(Operator.AND));
////        queryBuilder.withQuery(QueryBuilders.matchQuery("shopName",searchRequest.getKey()).operator(Operator.AND));
//        queryBuilder.withQuery(QueryBuilders.matchQuery("cname",searchRequest.getKey()).operator(Operator.AND));
        //3.分页条件
        queryBuilder.withPageable(PageRequest.of(pageNum,pageSize));
        //4.结果集过滤
        //queryBuilder.withFilter(new FetchSourceFilter(new String[]{""}))
        Page<Goods> goodsPage = goodsRepository.search(queryBuilder.build());
        PageResult<Goods> pageResult = new PageResult(new Long(goodsPage.getTotalElements()).intValue(),goodsPage.getTotalPages(),goodsPage.getContent());
        return pageResult;
    }
}
