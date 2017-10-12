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
          ->field("a.areaid,a.catid,a.itemid,a.title,c.catname,d.content,a.username,a.introduce,a.company,a.addtime,a.mobile,a.email,a.address,a.telephone,a.truename,a.msn,a.tag,c.catname,c.parentid,a.catid")
         ->join("category c","c.catid = a.catid")
          ->join("buy_data_6 d","d.itemid=a.itemid")
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
       $other_list=db("buy_6")
        ->alias("a")
                         ->field("a.areaid,a.catid,a.itemid,a.title,c.catname,d.content,a.username,a.introduce,a.company,a.addtime,a.mobile,a.email,a.address,a.telephone,a.truename,a.msn,a.tag,c.catname,c.parentid,a.catid")
         ->join("category c","c.catid = a.catid")
          ->join("buy_data_6 d","d.itemid=a.itemid")
                        ->order("addtime asc")
                        ->limit(4)
                        ->select();
        return json($other_list);
    }
    
}
?>    