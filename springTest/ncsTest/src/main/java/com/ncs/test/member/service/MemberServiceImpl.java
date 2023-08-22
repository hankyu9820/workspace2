package com.ncs.test.member.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ncs.test.member.dao.MemberDAO;
import com.ncs.test.member.vo.Member;

@Service
public class MemberServiceImpl implements MemberService {

	
	@Autowired
	private MemberDAO dao;
	
	@Override
	public Member login(Member inputMember) {
		
		return dao.login(inputMember);
	}

}
