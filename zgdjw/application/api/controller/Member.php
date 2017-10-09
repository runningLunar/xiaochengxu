<?php
namespace app\api\controller;

class Member extends \think\Controller
{
    public function getMember()
    {
    	$keyWord=input('keyword');
        $member=db("member")
        ->where("username='$keyWord' or mobile='$keyWord' or email='$keyWord'")
        ->find(); 

        return json($member);
    }
}
?>    