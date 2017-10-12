<?php
namespace app\api\controller;

class Gongyin extends \think\Controller
{
    public function get()
    {
    	$catId=input('catid');
    	 $arraychildId=input('arrchildid');
    	  $keyword=input('keyword');
    	if($catId && empty($arraychildId) &&empty($keyword)){
    		$where_sql="a.catid='$catId'";
    	}else if($arraychildId&& empty($catId) &&empty($keyword)){
    			$where_sql="a.areaid in($arraychildId)";
    	}else if(!empty($arraychildId) && !empty($catId) &&empty($keyword)){
    		$where_sql="a.areaid in($arraychildId) and a.catid='$catId'";
    	}else if($keyword && empty($arraychildId)&& empty($catId)){
    		$where_sql="a.keyword  LIKE '%$keyword%'";
    	}else if($keyword && !empty($arraychildId)&& empty($catId)){
				$where_sql="a.keyword  LIKE '%$keyword%' and a.areaid in($arraychildId)";
    	}else if($keyword && empty($arraychildId)&& !empty($catId)){
    				$where_sql="a.keyword  LIKE '%$keyword%' and a.catid='$catId'";
    	}else if ($keyword && !empty($arraychildId)&& !empty($catId)) {
    		$where_sql="a.keyword  LIKE '%$keyword%' and a.catid='$catId' and a.areaid in($arraychildId)";
    	}
    	else{
    		$where_sql='';
    	}
    	   $zixun_list=db("sell_5")
     			->alias("a")
         ->where($where_sql)
          ->field("a.areaid,a.catid,a.itemid,a.title,c.areaname,d.content,a.username,a.introduce,a.company,a.addtime,a.mobile,a.email,a.address,a.telephone,a.truename,a.msn,a.tag,g.catname,g.parentid")
         ->join("area c","c.areaid = a.areaid")
             ->join("sell_data_5 d","d.itemid=a.itemid")
              ->join("category g","g.catid=a.catid")
        ->order("itemid asc")
        ->paginate(10);
    	// 分页
    	// 查询分类
       return json($zixun_list);
    }
    //获取同类
        public function getOther()
    {
        $catid = input('catid');
        $other_list = db("sell_5")
        ->alias("a")
                        ->field("a.areaid,a.catid,a.itemid,a.title,c.areaname,d.content,a.username,a.introduce,a.company,a.addtime,a.mobile,a.email,a.address,a.telephone,a.truename,a.msn,a.tag,g.catname,g.parentid")
                        ->where("a.catid=$catid")
                        ->join("area c","c.areaid = a.areaid")
                         ->join("sell_data_5 d","d.itemid=a.itemid")
                         ->join("category g","g.catid=a.catid")
                        ->order("addtime asc")
                        ->limit(4)
                        ->select();
        return json($other_list);
    }
    
}
?>    