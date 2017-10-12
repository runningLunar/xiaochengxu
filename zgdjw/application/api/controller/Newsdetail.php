<?php
namespace app\api\controller;

class Newsdetail extends \think\Controller {
    
    public function get(){

    		$newsid=input('newsid');
    		$news=db("article_21 a")
    					->join("article_data_21 b","a.itemid=b.itemid")
    					->field("a.title,a.hits,a.addtime,a.catid,b.content")
    					->where("a.itemid=$newsid")
    					->select();
    		return json($news);
    }

    public function getOther()
    {
    	$catid = input('catid');
    	$other_list = db("article_21")
    					->field("title,itemid")
    					->where("catid=$catid")
    					->limit(4)
    					->select();
    	return json($other_list);
    }
}
?>