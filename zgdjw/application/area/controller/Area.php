<?php
namespace app\area\controller;

class Area extends \think\Controller {
    
    public function get(){
    		$parentid=input('parentid');
    		$area_list=db("area")
    					->field("parentid,areaname")
    					->where("parentid=$parentid")
    					->select();
    		return json($area_list);
    }
}
?>