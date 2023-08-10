package edu.kh.servlet;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class ServletEx3 extends HttpServlet{

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String id = req.getParameter("inputId");
		String pw1 = req.getParameter("inputPw1");
		String pw2 = req.getParameter("inputPw2");
		String name = req.getParameter("inputName");
		String email = req.getParameter("inputEmail");
		
		String[] colors = req.getParameterValues("color");
		
		
		resp.setContentType("text/html; charset=UTF-8");
		PrintWriter out = resp.getWriter();
		
		if(!pw1.equals(pw2)) {
			
			out.println("비밀번호가 일치하지 않습니다.");
			
		}else {
			
			out.println("<!DOCTYPE html>");
			out.println("<html>");
			
			out.println("<head>");
			out.println("<title>회원 정보 제출 결과</title>");
			out.println("</head>");
			
			out.println("<body>");
			
			out.println("<ul>");
			
			out.println("<li>");
			out.println("아이디 : " + id);
			out.println("</li>");
			
			out.println("<li>");
			out.println("이름 : " + name);
			out.println("</li>");
			
			out.println("<li>");
			out.println("이메일 : " + email);
			out.println("</li>");
			
			if(colors == null) {
				out.println("<li>좋아하는 색 : 없습니다. </li>");
			}else {
				
				out.print("<li>좋아하는 색 : ");
				for(String col : colors) {
				out.print(col + " ");
				}
				out.print("</li>");
			}
			
			out.println("</ul>");
				
			out.println("</body>");
			
			out.println("</html>");
			
		}
		
	}
	
}
