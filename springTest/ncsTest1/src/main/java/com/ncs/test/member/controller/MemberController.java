package com.ncs.test.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

import com.ncs.test.member.model.service.MemberService;
import com.ncs.test.member.model.vo.Member;

@Controller
public class MemberController {

   @Autowired
   private MemberService service;

   @PostMapping("/login")
   public String memberLogin(String memberId, String memberPwd) {

      Member mem = service.loginMember(memberId, memberPwd);
      
      if(mem != null) {
         return "redirect:/";
      }else {
         return "redirect:/error";
      }

      
   }

}