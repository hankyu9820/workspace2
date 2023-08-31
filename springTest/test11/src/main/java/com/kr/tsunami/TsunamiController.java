package com.kr.tsunami;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TsunamiController {
	
	public static final String SERVICEKEY = "V3jvxyOnOLlUObad39uyNG5guH5GS0C8lUQy3fJJsjJ%2F9HQzRBzN%2F5RtgJ4gwgCTjRFWGpEjWrpObPKzNvM0tQ%3D%3D";
	
	@ResponseBody
	@RequestMapping(value="tsunami" , produces = "text/xml; charset=UTF-8")
	public String shelterList(String location) throws IOException {
		
		String url = "http://apis.data.go.kr/1741000/TsunamiShelter3/getTsunamiShelter1List";
		url += "?serviceKey=" + SERVICEKEY; 
		url += "&pageNo";
		url += "&Type=xml"; 
		url += "&numOfRows=2"; 
		
		URI requestUrl = new URI(url);
		
		HttpURLConnection urlConnection = (HttpURLConnection) requestUrl.openConnection();
		
		urlConnection.setRequestMethod("GET");
		
		BufferedReader br = new BufferedReader(new InputStreamReader(urlConnection.getInputStream() ) );
		
		String line = null;
		
		while( ( line = br.readLine()) != null) {
			 
		}
		
		br.close();
		
		urlConnection.disconnect();
		
		return line;
	}	
	
	

}
