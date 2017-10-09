<?php
namespace app\api\controller;

class   Buy extends \think\Controller
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
           $zixun_list=db("buy_6")
                ->alias("a")
         ->where($where_sql)
         ->join("category c","c.catid = a.catid")
         ->join("area r","r.areaid = a.areaid")
        ->order("itemid asc")
        ->paginate(10);
        // 分页 
        // 查询分类
       return json($zixun_list);
    }
}
?>    