<?php
namespace app\api\controller;

class Category extends \think\Controller
{
    public function getFirst()
    {
    	$moduleid=input('moduleid');
    	$Category=db("category")
        ->field("catname,arrchildid,moduleid")
        ->where("moduleid='$moduleid' and parentid= '0' ")
        ->select(); 
        return json($Category);
    }
    //获取二级分类
    public function getSecond()
    {
    	$arraychildId=input('arrayId');
    	$Category=db("category")
        // ->field("catname,parentid,catid")
        ->where("arrchildid in($arraychildId) and parentid !='0'")
        ->select(); 
        return json($Category);
    }
}
?>    