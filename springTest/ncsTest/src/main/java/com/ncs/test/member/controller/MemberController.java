package com.ncs.test.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.ncs.test.member.service.MemberService;
import com.ncs.test.member.vo.Member;


@SessionAttributes({"loginMember"})
@Controller
public class MemberController {
	
	
	@Autowired
	private MemberService service;
	@RequestMapping("/")
	public String main() {
		return "index";
	}
	

	@PostMapping("login")
	public String login(Member inputMember, Model model, RedirectAttributes ra ) {
		
		Member loginMember = service.login(inputMember);
		
		String path = null;
		
		if(loginMember != null) {
			model.addAttribute("loginMember", loginMember);
			
			path = "redirect:/";
			
		}else {

			model.addAttribute("message","로그인 실패");
			path = "errorPage";
			
			
		}
		
		
		
		return path;
	}

}
