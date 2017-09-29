<?php
namespace app\api\controller;

require_once ROOT_PATH . '/vendor/Aliyun/vendor/autoload.php';
use Aliyun\Core\Config;
use Aliyun\Core\Profile\DefaultProfile;
use Aliyun\Core\DefaultAcsClient;
use Aliyun\Api\Sms\Request\V20170525\SendSmsRequest;
use Aliyun\Api\Sms\Request\V20170525\QuerySendDetailsRequest;

// 加载区域结点配置
Config::load();
class Reg extends \think\Controller{   

    //手机端获取验证码
    public function getCode(){
        $code=input("code");
        $phone=input("userPhone");
        $this->sendMessage($code,$phone);
    }
    public function sendMessage($code,$phone){
        //  此处需要替换成自己的AK信息
        $accessKeyId = "LTAIxacGzyqdCXOv";//参考本文档步骤2
         $accessKeySecret = "m03ASrjHvsJVbn5VC5ACV3p54aORdg";//参考本文档步骤2
         //短信API产品名（短信产品名固定，无需修改）
         $product = "Dysmsapi";
         //短信API产品域名（接口地址固定，无需修改）
         $domain = "dysmsapi.aliyuncs.com";
        // //暂时不支持多Region（目前仅支持cn-hangzhou请勿修改）
         $region = "cn-hangzhou";
         //初始化访问的acsCleint
         $templateParam = array("$code"=>$code);  
         $profile = DefaultProfile::getProfile($region, $accessKeyId, $accessKeySecret);
         DefaultProfile::addEndpoint("cn-hangzhou", "cn-hangzhou", $product, $domain);
         $acsClient= new DefaultAcsClient($profile);
         $request = new SendSmsRequest();
         //必填-短信接收号码。支持以逗号分隔的形式进行批量调用，批量上限为1000个手机号码,批量调用相对于单条调用及时性稍有延迟,验证码类型的短信推荐使用单条调用的方式
         $request->setPhoneNumbers($phone);
        // //必填-短信签名
         $request->setSignName("钟旗");
         //必填-短信模板Code
         $request->setTemplateCode("SMS_99990027");
         //选填-假如模板中存在变量需要替换则为必填(JSON格式),友情提示:如果JSON中需要带换行符,请参照标准的JSON协议对换行符的要求,比如短信内容中包含\r\n的情况在JSON中需要表示成\\r\\n,否则会导致JSON在服务端解析失败
         $request->setTemplateParam("{\"code\":\"$code\",\"product\":\"云通信服务\"}");
            // 可选，设置模板参数
        // if($templateParam) {
        //     $request->setTemplateParam(json_encode($templateParam));
        // }
        // //发起访问请求
         $acsResponse = $acsClient->getAcsResponse($request);
     }

     public function reg(){
        $userdd=input('username');
        $user=db("member")
        ->field("username")
        ->where("username='$userdd'")
        ->find();
        if($user){
          return "2";
      }else{
          db("member")->insert(['mobile'=>input("userPhone"),
           'password'=>md5(input("pwd")),
           'username'=> input("username"),
           'passport'=>input("username"),
           'email'=>"1090018789@qq.com"
           ]);
          return "1";
      }
  }
}
?>    