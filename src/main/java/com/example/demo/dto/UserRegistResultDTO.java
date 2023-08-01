package com.example.demo.dto;

import java.util.List;

import lombok.Data;

/**
 * ユーザー登録結果 DTO
 * 
 * @author ys-fj
 *
 */
@Data
public class UserRegistResultDTO {

	/** ユーザー情報リスト */
	private List<UserRegistDTO> userList;

	/** エラーメッセージ */
	private String errorMsg;

}
