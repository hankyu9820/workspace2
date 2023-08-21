package com.ncs.test.member.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ncs.test.member.model.vo.Member;

@Repository
public class MemberDAO {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	
	public Member loginMember(String memberId, String memberPwd) {
	
		Member mem = new Member();
		
		mem.setMemberId(memberId);
	    mem.setMemberPwd(memberPwd);
		
	   return sqlSession.selectOne("memberMapper.memberLogin", mem);
	    
	}

}
