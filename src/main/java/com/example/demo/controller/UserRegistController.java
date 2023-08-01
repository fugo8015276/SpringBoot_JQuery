package com.example.demo.controller;

import java.util.ArrayList;
import java.util.List;

import org.dozer.Mapper;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.example.demo.dto.UserRegistDTO;
import com.example.demo.dto.UserRegistResultDTO;
import com.example.demo.form.UserRegistForm;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;

/**
 * ユーザー登録画面 Controller
 * 
 * @author ys-fj
 *
 */
@Controller
@RequiredArgsConstructor
public class UserRegistController {

	/** セッション情報 */
	private final HttpSession session;

	/** Dozer Mapper */
	private final Mapper mapper;

	/** セッション情報キー：ユーザー情報リスト */
	private static final String SESSEION_KEY_USER_LISTT = "userList";

	/**
	 * 初期表示
	 * 
	 * @return 表示画面
	 */
	@GetMapping("/userRegist")
	public String view() {
		return "userRegist";
	}

	/**
	 * ユーザー登録
	 * 
	 * @param form 入力情報
	 * @param bdResult 入力チェック結果
	 * @return 登録済みユーザー情報のリスト
	 */
	@PostMapping("/userRegist")
	@ResponseBody
	public UserRegistResultDTO register(@Validated UserRegistForm form, BindingResult bdResult) {
		var userRegistResult = new UserRegistResultDTO();
		if (bdResult.hasErrors()) {
			userRegistResult.setErrorMsg("※未入力の項目があります");
			return userRegistResult;
		}

		// 今回はDBの代わりにセッションを使ってデータを保管、取得しています
		@SuppressWarnings("unchecked")
		var userListOnSession = (List<UserRegistDTO>) session.getAttribute(SESSEION_KEY_USER_LISTT);
		List<UserRegistDTO> userList = new ArrayList<>();
		if (userListOnSession != null) {
			for (UserRegistDTO user : userListOnSession) {
				userList.add(user);
			}
		}

		userList.add(mapper.map(form, UserRegistDTO.class));
		userRegistResult.setUserList(userList);
		session.setAttribute(SESSEION_KEY_USER_LISTT, userList);

		return userRegistResult;
	}

}
