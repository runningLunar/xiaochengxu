<?php
namespace app\api\controller;

class Area extends \think\Controller {
    
    public function get(){

    		$parentid=input('parentid');
    		$area_list=db("area")
    					->field("parentid,areaname,areaid,arrchildid")
    					->where("parentid=$parentid")
    					->select();
    		return json($area_list);
    }
    public function getCity(){
    	$arraychildId=input('arrchildid');
    		$area_list=db("area")
        // ->field("catname,parentid,catid")
        ->where("arrchildid in($arraychildId)")
        ->select(); 
        return json($area_list);
    }
}
?>