/**
 * 
 */
$(function() {
	$("#registBtn").click(function() {
		var elmErrorMsg = $("#errorMsg");
		elmErrorMsg.text("");
		//false(入力値エラー)だった場合、falseを返却。
		if (!inputCheck()) {
			return false;	
		}
		
		
		$.ajax({
			type:  "post",
			url:   "http://localhost:8080/userRegist",
			data:  $("form").serialize(),
			dataType:"json",
		})
		//正常終了した際の処理。
		//dataの中にControllerクラスから渡された情報（JSON）が入っている。
		.done(function(data) {
			//data内のuserListがnullの場合
			if (data.userList == null) {
				//エラーメッセージを出力。
				elmErrorMsg.text(data.errorMsg);
				//後続の処理を辞める。
				return false;
			}
			
			var viewUser = "";
			//userListが空でなかった場合、userListの情報を出力
			data.userList.forEach((user, index) => {
				//indexはその場の番号　userID = ユーザーID　userName = ユーザー名
				viewUser = viewUser + index + " : " + user.userId + "," + user.userName + "<br>";
			});
			//Ajaxリクエストが成功した後に、userList というIDを持つHTML要素の中身を動的に更新するためのコード
			$("#userList").html(viewUser);
		})
		//HTTPステータスが200(成功)以外で帰ってきた場合に実行
		.fail(function() {
			elmErrorMsg.text("※予期せぬエラーが発生しました");
		});
	});
});

/**
 * 画面項目の入力チェック
 */
function inputCheck() {
	var elmErrorMsg = $("#errorMsg");
	var userId = $("#userId").val();
	if (userId.length == 0) {//入力値がなかった時エラーメッセージを出力する。
		elmErrorMsg.text("※ユーザーIDが入力されていません。");
		return false;
	}

	var userName = $("#userName").val();
	if (userName.length == 0) {
		elmErrorMsg.text("※ユーザー名が入力されていません。");
		return false;
	}
	//両方とも値が入っている場合、trueを返却。
	return true;
}