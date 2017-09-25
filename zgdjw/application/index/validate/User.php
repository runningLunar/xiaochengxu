<?php
namespace app\index\validate;

 
class User extends \think\Validate
{	
	protected $rule = [ 
		"user_name" =>'require|length:2,12|unique:user',
		"user_pwd" => "confirm:user_repwd"
	];

	protected $message = [
		"user_name.unique" =>"该帐号已经存在！",
		"user_name.require" =>"帐号不能为空！",
	];
	 
}

?>