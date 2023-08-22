package com.ncs.test.member.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ncs.test.member.vo.Member;

@Repository
public class MemberDAO {
	
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	

	public Member login(Member inputMember) {
		
		
		return sqlSession.selectOne("memberMapper.loginMember", inputMember);
	}

}
