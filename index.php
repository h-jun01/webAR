<?php
//プログラムのエラー表示を抑止
ini_set("display_errors", 0);

session_start();
//メッセージ
$Msg = "";
$tb = "";
//ユーザID
$user = "";
//パスワード
$passwd = "";

//データベース接続
//接続DBサーバ,ユーザ,パスワード
$con = mysqli_connect("mariadb", "root", "password");
//コネクションに失敗したエラー番号を取得
if (mysqli_connect_errno($con)) {
	$Msg = "データベースの接続に失敗しました。";
} else {
	//DB接続の文字コード設定
	mysqli_set_charset($con, "utf8");
	//データベースの選択
	if (mysqli_select_db($con, "hew")) {
		//ログインボタン押下処
		if (isset($_POST["login"])) {
			//入力ユーザID取得
			if (!empty($_POST["user"])) {
				//入力ユーザID取得
				$user = $_POST["user"];
				if (!empty($_POST["passwd"])) {
					//入力パスワード取得
					$passwd = $_POST["passwd"];
					//ログインチェックSQL
					$sql = "select count(*) from t_user where USERID='" . $user . "' and PASSWD='" . $passwd . "';";
					//SQL実行
					$result = mysqli_query($con, $sql);
					//ログインチェック
					$cnt = mysqli_fetch_array($result);
					if ($cnt["count(*)"] == 1) {
						//ログイン成功
						//セッションを作る
						session_start();
						//ログインユーザ名を設定
						$_SESSION["LOGINUSER"] = $user;
						header('Location:main.php');
						exit();
					} else {
						//ログイン失敗
						$Msg = "ユーザIDまたはパスワードが違います。";
					}
				} else {
					$Msg = "パスワードが未入力です。";
				}
			}
			//ユーザID未入力
			else {
				$Msg = "ユーザIDが未入力です。";
			}
		} //ログインボタン押下処理終了
		//ユーザ登録処理
		else if (isset($_POST["regist"])) {
			//ユーザID取得
			if (!empty($_POST["name"])) {
				$user = $_POST["name"];
				//パスワード取得
				if (!empty($_POST["pass"])) {
					$passwd = $_POST["pass"];
					//SQL生成(挿入)
					$sql = "insert into t_user values('" . $user . "','" . $passwd . "');";
					//実行
					$result = mysqli_query($con, $sql);
					if (!$result) {
						//挿入SQLが失敗
						$Msg = "既に登録済みです。";
					} else {
						//SQL実行成功時
						$Msg = "登録が完了しました。";
						header('Location:index.php');
						exit();
					}
				} else {
					//パスワード未入力
					$Msg = "パスワードが未入力です。";
				}
			} else {
				//ユーザID未入力
				$Msg = "ユーザIDが未入力です。";
			}
		} //ユーザ登録処理終了
		//ログアウト処理
		else if (isset($_POST["logout"])) {
			//セッション破棄
			session_destroy();
			$Msg = "ログアウトしました。";
		} //ログアウト処理
	} else {
		//データベースの選択に失敗時
		$Msg = "データベースの選択に失敗しました";
	}

	//データベース切断
	mysqli_close($con);
}
?>

<!DOCTYPE html>
<html lang="ja">

<head>
	<meta charset="utf-8">
	<title>輝夜月AR</title>
	<link rel="stylesheet" href="./css/login.css">
	<script src="js/jquery-1.11.0.min.js"></script>
	<script src="js/login.js"></script>
</head>

<body>

	<!-- 地球 -->
	<p class="earth"><img src="images/img5.png" class="img_box"></p>

	<!-- ログイン画面 -->
	<form action="" method="post" class="login-form">
		<div class="materialContainer">
			<div class="box">
				<div class="title">輝夜月AR</div>
				<!-- ユーザ名 -->
				<p id="error"><?php print $Msg; ?></p>
				<div class="input">
					<label for="user">ユーザID</label>
					<input type="text" name="user" id="user">
					<span class="spin"></span>
				</div>
				<!-- パスワード -->
				<div class="input">
					<label for="passwd">パスワード</label>
					<input type="password" name="passwd" id="passwd">
					<span class="spin"></span>
				</div>
				<!-- ログインボタン -->
				<div class="button login">
					<input type="submit" name="login" value="ログイン" class="btn">
				</div>
			</div>

			<!-- 新規登録 -->
			<div class="overbox">
				<div class="material-button alt-2"><span class="shape"></span></div>
				<div class="title">新規登録</div>
				<!-- ユーザ名 -->
				<div class="input">
					<label for="regname">ユーザID</label>
					<input type="text" name="name" id="regname">
					<span class="spin"></span>
				</div>
				<!-- パスワード -->
				<div class="input">
					<label for="regpass">パスワード</label>
					<input type="password" name="pass" id="regpass">
					<span class="spin"></span>
				</div>
				<!-- 登録ボタン -->
				<div class="button">
					<input type="submit" name="regist" value="登録" class="btn touroku">
				</div>
			</div>
		</div>
	</form>
	<!-- 流れ星 -->
	<div style="width:1200px; height:1000px;"></div>
	<script src="js/star.js"></script>
</body>

</html>