package com.example.demo.form;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

/**
 * ユーザー登録画面 Form
 * 
 * @author ys-fj
 *
 */
@Data
public class UserRegistForm {

	/** ユーザーID */
	@Length(min = 1)
	private String userId;

	/** ユーザー名 */
	@Length(min = 1)
	private String userName;
}
