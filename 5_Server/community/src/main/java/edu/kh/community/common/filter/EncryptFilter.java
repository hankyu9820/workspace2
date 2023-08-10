package edu.kh.community.common.filter;

import java.io.IOException;
import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpFilter;
import javax.servlet.http.HttpServletRequest;

import edu.kh.community.common.wrapper.EncryptWrapper;


// 암호화를 적용 해야되는 요청 : 로그인, 회원가입, 비밀번호 변경, 회원 탈퇴
// 	/member/login, /member/signUp, /member/...

// 우리프로젝트같은건 /member/* 하면 되긴 하지만 패턴이 일정하지 않은 url에서는 안됨.
// 필터가 적용될 url이 여러 개인 경우 : String[] 초기화 형태 {} 로 작성해야 한다. 

@WebFilter(filterName = "encryptFilter", 
			urlPatterns = {"/member/login",
							"/member/signUp",
						   "/member/myPage/changePw",
						   "/member/myPage/secession"}) //@WebFilter("/EncryptFilter")

public class EncryptFilter extends HttpFilter implements Filter {
       
	public void init(FilterConfig fConfig) throws ServletException {}
	
	public void destroy() {} // 위에 2개는 안쓸거여도 지우면 안됨.

	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {

		// 비밀번호는 파라미터 -> HttpServletRequest에 담겨있다.
		
		// doFilter 메소드 매개변수는 부모타입인 ServletRequest에 담겨있다.
		// -> 다운캐스팅 필요
		
		HttpServletRequest req = (HttpServletRequest)request;
		
		/*
		 * req.getParameter("memberPw") + "1234"; <<???
		 */
		
		// 클라이언트 -> 요청 ->HttpServletRequest (파라미터가 담겨있음)
		//						이상태에서 필터에서 다시 꺼내고 세팅하는게 안됨 
		//							-> Wrapper를 이용한다.
		
		// 파라미터를 다시 세팅하는 방법은 필터에서 불가능하다.
		// -> Servlet의 Wrapper 클래스를 이용해서
		// 	  HttpServletRequest의 메소드를 오버라이딩 할 수 있다.
		// 		-> 오버라이딩(재정의)를 통해서 비밀번호 암호화 진행

		// 객체로 만들어서 기존 HttpServletRequest 객체 역할을 대체한다. wrapper가 req를 대체한다?		
		EncryptWrapper wrapper = new EncryptWrapper(req); 

		
		// 다음 연결된 필터를 수행(없으면 Servlet으로 이동)
		/* chain.doFilter(request, response); */
		chain.doFilter(wrapper, response);
		
		
	}

}
