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
        // $this->sendMessage($code,$phone);
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
    
          $hash=$this->random(6);
          db("member")->insert(['mobile'=>input("userPhone"),
           'password'=>md5(input("password")),
           'username'=> input("username"),
           'passport'=>input("username"),
           'email'=>input("username "), 
           'passsalt'=>$hash
           ]);


/*发送邮件内容*/
          $content=' <table cellpadding="0" cellspacing="0" width="700" align="center">
<tr>
<td><a href="http://localhost/destoon/" target="_blank"><img src="../../../../images/logo2.png" style="margin:10px 0;border:none;" alt="DESTOON B2B网站管理系统 LOGO" title="DESTOON B2B网站管理系统"/></a></td>
</tr>
<tr>
<td style="border-top:solid 1px #DDDDDD;border-bottom:solid 1px #DDDDDD;padding:10px 0;line-height:200%;font-family:Microsoft YaHei,Verdana,Arial;font-size:14px;color:#333333;">
尊敬的会员：<br/>
恭喜您成功注册成为DESTOON B2B网站管理系统会员！<br/>
以下为您的会员帐号信息：<br/>
<strong>户名：</strong>'.input("username").'<br/>
<strong>密码：</strong>'.input("password").'<br/>
请您妥善保存，切勿告诉他人。<br/>
如果您在使用过程中遇到任何问题，欢迎随时与我们取得联系。<br/>
</td>
</tr>
<tr>
<td style="line-height:22px;padding:10px 0;font-family:Microsoft YaHei,Verdana,Arial;font-size:12px;color:#666666;">
请注意：此邮件系 <a href="http://localhost/destoon/" target="_blank" style="color:#005590;">DESTOON B2B网站管理系统</a> 自动发送，请勿直接回复。如果此邮件不是您请求的，请忽略并删除
</td>
</tr>
</table>';

             db("message")->insert(['title'=>'欢迎加入DESTOON B2B网站管理系统',
           'content'=>$content,
           'addtime'=> time(),
           'touser'=>input("username"),
           ]);
          return "1";
      }
  }
//随机生成passsalt
function random($length, $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz') {
  $hash = '';
  $max = strlen($chars) - 1;
  for($i = 0; $i < $length; $i++) {
    $hash .= $chars[mt_rand(0, $max)];
  }
  return $hash;
}

}



?>    