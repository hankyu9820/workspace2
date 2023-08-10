package edu.kh.community.board.model.service;

import static edu.kh.community.common.JDBCTemplate.*;

import java.sql.Connection;
import java.util.List;

import edu.kh.community.board.model.dao.ReplyDAO;
import edu.kh.community.board.model.vo.Reply;
import edu.kh.community.common.Util;

public class ReplyService {

	private ReplyDAO dao = new ReplyDAO();

	/** 댓글 목록 조회 service
	 * @param boardNo
	 * @return replyList
	 * @throws Exception
	 */
	public List selectReplyList(int boardNo) throws Exception{
		
		Connection conn = getConnection();
		
		List<Reply> replyList = dao.selectReplyList(conn, boardNo);
		
		close(conn);
		
		return replyList;
	}

	
	
	/** 댓글 작성 service
	 * @param reply
	 * @return result
	 * @throws Exception
	 */
	public int insertReply(Reply reply) throws Exception {
		
		Connection conn = getConnection();
		
		// XSS : 관리자가 아닌 이용자가 악성 스크립트를 삽입해서 공격할 수 있다.
		// Cross Site Scripting(XSS, 크로스 사이트 스크럽팅) 공격 방지 처리
		reply.setReplyContent( Util.XSSHandling( reply.getReplyContent()) );
		
		// - 개행문자 변경 처리
		// textarea에 줄바꿈 문자 입력 시 \n, \r, \r\n, \n\r 중 하나로 입력된다.(브라우저, 운영체제마다 다름)
		// 이 문자들을 HTML에서 줄바꿈으로 인식할 수 있도록 "<br>" 태그로 변경
		//reply.getReplyContent().replaceAll("정규표현식", "바꿀문자열");
		
		// 댓글 등록, 수정 / 게시글 등록, 수정에서 사용할거라 별도로 분류
		//reply.setReplyContent(reply.getReplyContent().replaceAll("\n|\r|\r\n|\n\r", "<br>"));
		
		// static으로 선언해 둔 개행문자 변경 메소드 사용 <br>이라 xss핸들링 먼저 실행해야 함.
		reply.setReplyContent( Util.newLineHandling(reply.getReplyContent()) );
		
		
		int result = dao.insertReply(conn, reply);
		
		if(result == 1) conn.commit();
		else conn.rollback();
		
		close(conn);
		
		return result;
	}



	/** 댓글 삭제 service
	 * @param replyNo
	 * @return replyNo
	 * @throws Exception
	 */
	public int deleteReply(int replyNo) throws Exception{
		
		Connection conn = getConnection();
		
		int result = dao.deleteReply(conn, replyNo);
		
		if(result > 0) conn.commit();
		else conn.rollback();
		
		close(conn);
		
		return result;
	}



	/** 댓글 수정 service
	 * @param replyNo
	 * @param replyContent
	 * @return result
	 * @throws Exception
	 */
	public int updateReply(int replyNo, String replyContent) throws Exception{
		
		Connection conn = getConnection();
		
		// XSS 처리
		replyContent = Util.XSSHandling(replyContent);
		
		// 개행문자 처리
		replyContent = Util.newLineHandling(replyContent);
		
		int result = dao.updateReply(conn, replyNo, replyContent);
		
		if(result > 0) conn.commit();
		else conn.rollback();
		
		close(conn);
		
		return result;
		
		
	}

	
	
}
