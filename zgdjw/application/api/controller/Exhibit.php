<?php
namespace app\api\controller;

class Exhibit extends \think\Controller
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
    				$where_sql="a.keyword  LIKE '%$keyword%' and a.catid like '%$catId%'";
    	}else if ($keyword && !empty($arraychildId)&& !empty($catId)) {
    		$where_sql="a.keyword  LIKE '%$keyword%' and like '%$catId%' and a.areaid in($arraychildId)";
    	}
    	else{
    		$where_sql='';
    	}
    	   $zixun_list=db("exhibit")
     			->alias("a")
         ->where($where_sql)
        ->field("a.areaid,a.catid,a.itemid,a.title,c.areaname,d.content,a.sponsor,a.telephone,a.truename,a.mobile,a.addr,a.address,a.postcode,a.city,a.totime,a.fromtime,a.addtime,a.undertaker,g.catname,a.fax,a.email,a.qq")
         ->join("area c","c.areaid = a.areaid")
        ->join("exhibit_data d","d.itemid=a.itemid")
        ->join("category g","a.catid=g.catid")
        ->order("addtime desc")
        ->paginate(10);
    	// 分页
    	// 查询分类
       return json($zixun_list);
    }
     //获取同类
        public function getOther()
    {
        $catid = input('catid');
       $other_list=db("exhibit")
        ->alias("a")
                       ->field("a.areaid,a.catid,a.itemid,a.title,c.areaname,d.content,a.sponsor,a.telephone,a.truename,a.mobile,a.addr,a.address,a.postcode,a.city,a.totime,a.fromtime,a.addtime,a.undertaker,g.catname,a.fax,a.email,a.qq")
         ->join("area c","c.areaid = a.areaid")
        ->join("exhibit_data d","d.itemid=a.itemid")
        ->join("category g","a.catid=g.catid")
                        ->order("addtime asc")
                        ->limit(4)
                        ->select();
        return json($other_list);
    }
}
?>    