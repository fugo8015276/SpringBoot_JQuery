/**
 * 
 */
$(function() {
	$("#registBtn").click(function() {
		var elmErrorMsg = $("#errorMsg");
		elmErrorMsg.text("");
		if (!inputCheck()) {
			return false;	
		}
		
		$.ajax({
			type:  "post",
			url:   "http://localhost:8080/userRegist",
			data:  $("form").serialize(),
			dataType:"json",
		})
		.done(function(data) {
			if (data.userList == null) {
				elmErrorMsg.text(data.errorMsg);
				return false;
			}
			
			var viewUser = "";
			data.userList.forEach((user, index) => {
				viewUser = viewUser + index + " : " + user.userId + "," + user.userName + "<br>";
			});
			$("#userList").html(viewUser);
		})
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
	if (userId.length == 0) {
		elmErrorMsg.text("※ユーザーIDが入力されていません。");
		return false;
	}

	var userName = $("#userName").val();
	if (userName.length == 0) {
		elmErrorMsg.text("※ユーザー名が入力されていません。");
		return false;
	}
	
	return true;
}