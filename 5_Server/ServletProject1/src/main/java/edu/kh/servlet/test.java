package edu.kh.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class test extends HttpServlet {

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

		String[] test = req.getParameterValues("test");
		
		resp.setContentType("text/html; charset=UTF-8");
		
	for(String s : test) {
		System.out.println(s);
		resp.getWriter().println(s);
	}

	}
	
}
