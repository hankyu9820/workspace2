package edu.kh.jsp.model.vo;

public class Person {

		private String name;
		private int age;
		private String address;
		
		public Person() {
			super();
		}

		public Person(String name, int age, String address) {
			super();
			this.name = name;
			this.age = age;
			this.address = address;
		}
		
		public String getName() { // 외부에서 현재 객체의 name을 얻어감
			return name;
		}
		
		public int getAge() { // 외부에서 전달받은 name을 현재 객체의 name에 대입
			return age;
		}
		
		public String getAddress() {
			return address;
		}

		
		public void setName(String name) {
			this.name = name;
		}
		
		public void setAge(int age) {
			this.age = age;
		}
		
		public void setAddress(String address) {
			this.address = address;
		}

		@Override
		public String toString() {
			return "Person [name=" + name + ", age=" + age + ", address=" + address + "]";
		}
		
		
	
}
