package com.kh.opendata.model.vo;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class tsunami {
	
	private String sido_name; // 시도명
	private String sigungu_name; // 시군구명
	private String remarks; // 대피지구명
	private String shel_nm; // 대피장소명
	private String address; // 주소
	private String lon; // 경도
	private String lat; // 위도
	private String shel_av; // 수용가능인원수
	private String shel_div_type; // 대피소 분류명
	
	
	
	

}
