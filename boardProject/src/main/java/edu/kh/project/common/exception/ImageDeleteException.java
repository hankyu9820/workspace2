package edu.kh.project.common.exception;

public class ImageDeleteException extends RuntimeException{

	public ImageDeleteException() {
		super("이미지 삭제 실패");
	}
	
	public ImageDeleteException(String message) {
		super(message);
	}
}
