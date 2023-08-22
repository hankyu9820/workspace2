package com.ncs.test.member.model.service;

import org.springframework.stereotype.Service;

import com.ncs.test.member.model.vo.Member;

@Service
public interface MemberService {


	Member loginMember(Member inputMember);

}
