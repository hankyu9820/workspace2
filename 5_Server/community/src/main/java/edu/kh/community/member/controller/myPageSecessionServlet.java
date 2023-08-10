package edu.kh.community.member.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import edu.kh.community.member.model.service.MemberService;
import edu.kh.community.member.model.vo.Member;

@WebServlet("/member/myPage/secession")
public class myPageSecessionServlet extends HttpServlet {
   
   // 회원탈퇴 페이지로 전환
   @Override
   protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      
      String path = "/WEB-INF/views/member/myPage-secession.jsp";
      
      req.getRequestDispatcher(path).forward(req, resp);
   }
   
   
   // 회원 탈퇴
   @Override
   protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
      
      // 파라미터
      String memberPw = req.getParameter("memberPw");
      
      HttpSession session = req.getSession(); // 세션 얻어오기
      
      Member loginMember = (Member)(session.getAttribute("loginMember"));
      
      int memberNo = loginMember.getMemberNo();
      
      try {
         
         MemberService service = new MemberService();
         
         int result = service.secession(memberNo, memberPw);
         
         String path = null; // 리다이렉트 경로
         
         if(result > 0) {   // 성공
            
            // 로그아웃 방법 1
            //path = req.getContextPath() + "/member/logout"; // 로그아웃 요청으로 리다이렉트
            
            // 로그아웃 방법 2
            session.invalidate(); // 세션 무효화
            // -> 세션을 무효화 해버려서 메세지 전달이 되지 않는 문제가 발생
            
            // [해결방법]
            // 새로운 세션을 얻어와서 메세지를 세팅해준다.
            
            session = req.getSession();
            
            session.setAttribute("message", "회원탈퇴되었습니다.");
            
            path = req.getContextPath(); // 메인페이지
            
            Cookie c = new Cookie("saveId", ""); // 쿠키 생성
            c.setMaxAge(0); // 쿠키를 없애겠다.
            c.setPath(req.getContextPath()); // 쿠키 적용 경로 -> index.jsp
            resp.addCookie(c); // 쿠키 클라이언트에 전송
            
         }else {   // 실패
            session.setAttribute("message", "회원탈퇴 실패(비밀번호가 일치하지 않습니다.)");

            //path = req.getContextPath() + "/member/myPage/secession";
            
            // 상대 경로
            path = "secession";
         }
         
         resp.sendRedirect(path);
         
      }catch (Exception e) {
         e.printStackTrace();
      }
      
      
      
   }
}