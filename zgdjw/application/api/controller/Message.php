<?php
namespace app\api\controller;

class Message extends \think\Controller
{
    public function getMessage()
    {
        $username=input("username");
    	 $message=db("message")
        ->where("touser='$username'")
        ->select();
        return  json($message);
    }
}
?>    
