package edu.kh.community.member.model.service;

import static edu.kh.community.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.List;

import edu.kh.community.member.model.dao.MemberDAO;
import edu.kh.community.member.model.vo.Member;

public class MemberService {

	private MemberDAO dao = new MemberDAO();
	
	/** 로그인 서비스
	 * @param mem
	 * @return loginMember
	 * @throws Exception
	 */
	public Member login(Member mem) throws Exception{

		// Connection 얻어오기
		Connection conn = getConnection();
		
		// DAO 수행
		Member loginMember = dao.login(mem, conn);
		
		// Connection 반환 (DAO에서 돌아왔을 때)
		close(conn);
		
		// 결과 반환
		return loginMember;
	}

	/** 회원가입 Service
	 * @param mem
	 * @return result
	 * @throws Exception
	 */
	
	public int signUp(Member mem) throws Exception{
		Connection conn = getConnection();
		
		int result = dao.signUp(mem, conn);
		
		// 트랜잭션 처리
		// result가 0인경우 -> DAO return 잘못쓰거나 insert 잘못하거나
		if (result > 0) conn.commit();
		else conn.rollback();
		
		close(conn);
		
		return result;
		
	}

	/** 회원 정보 수정 Service
	 * @param mem
	 * @return result
	 * @throws Exception
	 */
	public int updateMember(Member mem) throws Exception{

		Connection conn = getConnection();
		
		int result = dao.updateMember(conn, mem);
		
		if(result > 0 ) commit(conn);
		else 			rollback(conn);
		
		close(conn);
		
		return result;
	
	}


	/** 비밀번호 변경 Service
	 * @param currentPw
	 * @param newPw
	 * @param memberNo
	 * @return result
	 * @throws Exception
	 */
	public int changePw(String currentPw, String newPw, int memberNo) throws Exception{

		Connection conn = getConnection();
		
		int result = dao.changePw(conn, currentPw, newPw, memberNo);
		
		if(result > 0 ) commit(conn);
		else 			rollback(conn);
		
		close(conn);
		
		return result;
	}

	/** 회원 탈퇴 Service
	 * @param memberNo
	 * @param memberPw
	 * @return result
	 * @throws Exception
	 */
	public int secession(int memberNo, String memberPw) throws Exception {

		Connection conn = getConnection();

		int result = dao.secession(conn, memberNo, memberPw);

		if(result > 0) commit(conn);
		else         rollback(conn);

		close(conn);

		return result;
	}

	/** 이메일 중복 검사 서비스
	 * @param memberEmail
	 * @return result
	 * @throws Exception
	 */
	public int emailDupCheck(String memberEmail) throws Exception{
		
		Connection conn = getConnection();
				
		int result = dao.emailDupCheck(conn, memberEmail);
		
		close(conn);
		
		return result;
	
	}

	/** 닉네임 중복 검사 서비스
	 * @param memberNickname
	 * @return result
	 * @throws Exception
	 */
	public int nicknameDupCheck(String memberNickname) throws Exception{
		
		Connection conn = getConnection();
		
		int result = dao.nicknameDupCheck(conn, memberNickname);
		
		close(conn);
		
		return result;
		
	}

	/** 이메일로 정보 조회 서비스
	 * @param mem
	 * @return loginMember
	 * @throws Exception 
	 */

	public Member selectOne(String memberEmail) throws Exception{
		
		Connection conn = getConnection();
		
		Member member = dao.selectOne(conn, memberEmail);
		
		close(conn);
		
		return member;
	}

	/** 전체 회원 조회
	 * @return  memberList
	 * @throws Exception
	 */
	public List<Member> selectAll() throws Exception{
		
		Connection conn = getConnection();
		
		List<Member> memberList = dao.selectAll(conn);
		
		close(conn);
		
		return memberList;
		
	}

	/** 프로필 이미지 변경 Service
	 * @param memberNo
	 * @param profileImage
	 * @return result
	 * @throws Exception
	 */
	
	public int updateProfileImage(int memberNo, String profileImage) throws Exception {
		
		Connection conn = getConnection();
		
		int result = dao.updateProfileImage(conn, memberNo, profileImage);
		
		
		if(result > 0) commit(conn);
		else         rollback(conn);
		
		close(conn);
		
		return result;
	}	
	
}