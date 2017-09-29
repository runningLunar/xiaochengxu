<?php
namespace app\api\controller;

class Login extends \think\Controller
{
    public function keylogin()
    {
    	$psd=md5(input('password'));
    	$key=input('key');
    	$user=db("member")
        ->field("username")
        ->where("username='$key' or mobile='$key' or email='$key'  and password ='$psd' ")
        ->find();
        if($user){
        	 return "1";
        }else{
        	return "2";
        }
    }

    public function phoneLogin(){
    	$phone=input('phone');
    	$user=db("member")
        ->field("username")
        ->where("mobile='$phone'")
        ->find();
        if($user){
        	 return "1";
        }else{
        	return "2";
        }
    }
}
?>    