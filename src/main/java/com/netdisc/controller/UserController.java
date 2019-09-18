package com.netdisc.controller;

import java.util.List;
import java.util.Map;

import javax.mail.MessagingException;
import javax.mail.internet.AddressException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.netdisc.pojo.User;
import com.netdisc.service.IUserService;
import com.netdisc.util.MailUtil;
import com.netdisc.util.RandomNumberUtil;

@Controller
@RequestMapping("/user")
public class UserController {

	/*@Autowired
	UserMapper userDao;*/
	@Autowired
	IUserService iUserService;
	/*
	 * @Autowired IUserService iUserService;
	 */
	
	private Boolean json;

	@RequestMapping("/register")
	public String register() {
		
		return "regist";
	}

	@ResponseBody
	@RequestMapping("/verifyUname")
	public boolean verifyUname(@RequestParam("uname") String uname) {
		System.out.println("verifyUname>>>>>");
		Boolean json = true;
		User user = new User();
		System.out.println("这个用户的uname是<<<" + uname);
		List<User> users = iUserService.getUserByUname(uname);
		if (users.size() > 0) {
			json = false;
		}
		return json;
	}

	@ResponseBody
	@RequestMapping("/verifyEmail")
	public boolean verifyEmail(@RequestParam("email") String email) {
		System.out.println("verifyEmail>>>>>");
		Boolean json = true;
		User user = new User();
		System.out.println("这个用户的email是<<<" + email);
		List<User> users = iUserService.getUserByEmail(email);
		if (users.size() > 0) {
			json = false;
		}
		return json;
	}

	@ResponseBody
	@RequestMapping("/sendEmail")
	public boolean sendEmail(@RequestParam("email") String email ,HttpSession session ) throws AddressException, MessagingException {
		System.out.println("sendEmail>>>>>");
		System.out.println("这个用户的email是" + email);
		Boolean json = true;
	
		int code = RandomNumberUtil.code();
		System.out.println("所以这个邮箱验证码是" + code);
		session.setAttribute("code", code);
		 MailUtil.sendMail(email,"尊敬的用户：您好！您的账户绑定的邮箱为" + email + ",验证码：" + code + "。此验证码三分钟内有效。如非本人操作,请忽略此邮件。", "绑定邮箱");
		return json;
	}

	@ResponseBody
	@RequestMapping("/verifyPhone")
	public boolean verifyPhone(@RequestParam("phone") String phone) {
		System.out.println("verifyPhone>>>>>");
		Boolean json = true;
		User user = new User();
		System.out.println("这个用户的phone是<<<" + phone);
		List<User> users = iUserService.getUserByPhone(phone);
		if (users.size() > 0) {
			json = false;
		}
		return json;
	}

	@ResponseBody
	@RequestMapping("/verifyCode")
	public boolean verifyCode(@RequestParam("verifyNo") Integer verifyNo ,HttpSession session) {
		System.out.println("verifyCode>>>>>");
		Boolean json = false;
		System.out.println("这个用户的verifyNo是" + verifyNo);
		Integer oldCode = (Integer) session.getAttribute("code");
		System.out.println("这个正确的验证码"+oldCode);
		
		if(verifyNo.equals(oldCode)){
			json = true;
		}
		

		return json;
	}

	@ResponseBody
	@RequestMapping("/regist")
	public boolean regist(@RequestParam("uname") String username, @RequestParam("email") String email,
			@RequestParam("phone") String phone, @RequestParam("password") String password,
			@RequestParam("sex") String sex) {
		
		
		System.out.println("regist>>>>>>>>>>");
		Boolean json = false;
		System.out.println("这个注册的信息" + username + ">>" + email + ">>" + phone + ">>" + password + ">>" + sex);
		/*User user = new User();
		user.setUsername(username);
		user.setEmail(email);
		user.setPhone(phone);
		user.setPassword(password);
		user.setSex(sex);*/

		iUserService.saveUserRegister(username,email,phone,password,sex);
		json = true;

		return json;
	}
	
	

	@RequestMapping("/login")
	@ResponseBody
	public String login(@RequestParam("userName") String username, @RequestParam("passWord") String password) {
		System.out.println("<<<<<<<login");

		String json="";
		User user = new User();
	
		
		user=iUserService.getUserByUserNamePass(username,password);
		System.out.println("这个user信息"+user.getUsername());
		if (user != null&&user.getStatus()!=0) {
				json = "1";
				return json;
			
			
		}
		else {
			json = "2";
			return json;
		}
		
		
		
	}

	
	@RequestMapping("/yunDisk")
	public String yunDisk(HttpSession session,String username,String password) {
		User user = new User();
		user=iUserService.getUserByUserNamePass(username,password);
		session.setAttribute("LOGIN_USER",user);
		return "yunDisk";
	}
	
	
	

}
