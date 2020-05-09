package com.kru.rest.webservices.restfulwebservices.jwt.resource;

import java.io.Serializable;

public class JwtTokenRequest implements Serializable {

	private static final long serialVersionUID = -5616176897013108345L;

	private String username;
	private String password;

//	{
//	    "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJrcnUiLCJleHAiOjE1ODk2MDg5NzAsImlhdCI6MTU4OTAwNDE3MH0.Yg1xu5gGoUW40K0k2zRV_QndOhz6x1BADq3eMQVEuI7o9P-L72vUC5KsCzqqeHfVqV1t8F77OUT2sP_r_zeuMA"
//	}

	
	public JwtTokenRequest() {
		super();
	}

	public JwtTokenRequest(String username, String password) {
		this.setUsername(username);
		this.setPassword(password);
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}