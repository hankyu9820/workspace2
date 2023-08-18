package edu.kh.project.myPage.model.service;

import java.util.List;

import edu.kh.project.member.model.dto.Member;

public interface AjaxService {

	/** 이메일로 닉네임 조회
	 * @param email
	 * @return nickname
	 */
	String selectNickname(String email);

	/** 닉네임으로 전화번호 조회
	 * @param inputNickname
	 * @return tel
	 */
	String selectTel(String nickname);

	/** 이메일 중복확인
	 * @param email
	 * @return count
	 */
	int dupCheck(String email);

	/** 닉네임 중복확인
	 * @param nickname
	 * @return count
	 */
	int dupChecknick(String nickname);

 	/** 이메일로 회원 정보 조회
	 * @param email
	 * @return member
	 */
	Member selectMember(String email);

	List<Member> selectMemberList(String input);

}
