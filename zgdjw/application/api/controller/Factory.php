<?php
namespace app\api\controller;

class Factory extends \think\Controller
{
    public function get()
    {
    	$catId=input('catid');
    	 $arraychildId=input('arrchildid');
    	  $keyword=input('keyword');
    	if($catId && empty($arraychildId) &&empty($keyword)){
    		$where_sql="a.catid like '%$catId%'";
    	}else if($arraychildId&& empty($catId) &&empty($keyword)){
    			$where_sql="a.areaid in($arraychildId)";
    	}else if(!empty($arraychildId) && !empty($catId) &&empty($keyword)){
    		$where_sql="a.areaid in($arraychildId) and a.catid like '%$catId%'";
    	}else if($keyword && empty($arraychildId)&& empty($catId)){
    		$where_sql="a.keyword  LIKE '%$keyword%'";
    	}else if($keyword && !empty($arraychildId)&& empty($catId)){
				$where_sql="a.keyword  LIKE '%$keyword%' and a.areaid in($arraychildId)";
    	}else if($keyword && empty($arraychildId)&& !empty($catId)){
    				$where_sql="a.keyword  LIKE '%$keyword%' and a.catid Like '%$catId%'";
    	}else if ($keyword && !empty($arraychildId)&& !empty($catId)) {
    		$where_sql="a.keyword  LIKE '%$keyword%' and a.catid Like '%$catId%' and a.areaid in($arraychildId)";
    	}
    	else{
    		$where_sql='';
    	}
    	   $zixun_list=db("company")
     			->alias("a")
         ->where($where_sql)
         ->field("a.areaid,a.catid,a.userid,a.company,d.content,a.sell,a.address,a.telephone,a.username")
          ->join("area c","c.areaid = a.areaid")
        ->join("company_data d","d.userid=a.userid")
        ->order("userid desc")
        ->paginate(10);
    	// 分页
    	// 查询分类
       return json($zixun_list);
    }
}
?>    