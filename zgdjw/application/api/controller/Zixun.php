<?php
namespace app\api\controller;

class Zixun extends \think\Controller
{
    public function index()
    {
    	// 查询列表
    	$zixun_list = db("article_21")->paginate(10);
    	// 分页
    	// 查询分类
       return json($zixun_list);
    }
}
?>    