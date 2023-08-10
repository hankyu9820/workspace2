package edu.kh.jsp.controller;

import java.io.IOException;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import edu.kh.jsp.common.JDBCTemplate;
import edu.kh.jsp.model.service.MemberService;
import edu.kh.jsp.model.vo.Member;

@WebServlet ("/member/selectAll")
public class SelectAllServlet extends HttpServlet{

		@Override
		protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		
			// view -> service -> dao -> db -> dao -> service -> view
			// view를 HTML, JSP로 쓸거임
			// 어떤 요청이 오면 어떤 서비스를 호출할지 제어할거임 Controller (servlet)
			
			try {
				/* System.out.println(JDBCTemplate.getConnection()); */
				MemberService service = new MemberService(); // 서비스 호출을 위한 객체 생성
				
				// 회원 목록 조회 service 호출 후 결과 반환 받기
				List<Member> memberList = service.selectAll();
				
				// 응답 화면을 만들 JSP로 요청 위임하기
				
				String path = "/WEB-INF/views/selectAll.jsp";
				
				RequestDispatcher dispatcher = req.getRequestDispatcher(path);
				
				req.setAttribute("list", memberList);
				
				dispatcher.forward(req, resp);
				
				
				
				
			}catch(Exception e) {
				e.printStackTrace();
				
			}		
		}
}
