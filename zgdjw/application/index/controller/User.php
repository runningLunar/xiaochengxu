<?php
namespace app\index\controller;
use \think\Controller;
use \think\captcha\Captcha;

class User extends Controller
{
    public function index()
    {
        return $this->fetch();
    }

    public function login()
    {
    	// 分答欢迎你
    	$this->assign("project_name","分答欢迎你");
    	return $this->fetch();
    }

     public function reg()
    {
    	// 分答欢迎你
    	$this->assign("project_name","分答欢迎你");
    	return $this->fetch();
    }

    public function doReg()
    {
        // 第一步：验证 马是否一样
        $captcha = new Captcha();
        // check:校验验证码是否一样，返回boolean。成功后则会删除之前验证码
        if (!$captcha->check(input("captcha_code"))) {
            // error错误提示函数
            $this->error("验证码输入不正确");
        }

    	// input助手函数 :获取变量 支持过滤和默认值
    	// 在thinkphp\library\think\Request.php
    	$add_data['user_name'] = input("user_name");
        $add_data['user_pwd'] = input("user_pwd");
        $add_data['user_repwd'] = input("user_repwd");
    	 

    	// validate实例化验证器
    	$user_validate = validate("User");
    	// check数据自动验证：返回boolean
    	if(!$user_validate->check($add_data)){
             $this->error($user_validate->getError());
    	}

    	// 用户名不能重复
    	// 密码和重复密码必须一样
    	unset($add_data['user_repwd']);//销毁定义的变量
        $add_data['user_pwd'] = md5($add_data['user_pwd']);

    	// db实例化一个没有模型的表
        
        // 自动完成时间特点：
        // 1、需用save方法
        // 2、必须用model方法 
    	model("user")->save($add_data);

        // 成功提示函数
        // 第一个参数：提示信息
        // 第二个参数：跳转后的下一个地址
        $this->success("注册成功！",url('login'));
    }

    // 生成验证码
    public function setCapche()
    {
        // 必须先use
        $captcha = new Captcha();
        // 没有混淆线
        $captcha->useCurve = false;
        // 验证码数量
        $captcha->length = 2;
        // 生成
        return $captcha->entry();
    }

    // 异步登录
    public function doLoginAjax()
    {
        $user_name = input("user_name");
        $user_pwd = md5(input("user_pwd"));
        // find查询一条记录
        $info = db('user')->where("user_name='$user_name' and user_pwd='$user_pwd'")->find();

        // ajax默认返回值就是json，无需加json_encode
        return $info;
    }
}
