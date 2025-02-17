package com.bookmymovie.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userid;
	private String userName;
	private boolean isAdmin;
	private String mobile;
	private String email;
	private String password;
	
	
	@Enumerated(EnumType.STRING)                            // create column of typebb// varchar to store the name of constant
	@Column(length = 30)                                   // varchar(30)
	private UserRole role = UserRole.ROLE_USER;
	
	
	@Override
	public String toString() {
		return "User [userid=" + userid + ", userName=" + userName + ", isAdmin=" + isAdmin + ", mobile=" + mobile
				+ ", email=" + email + "]";
	}
	
	
}
