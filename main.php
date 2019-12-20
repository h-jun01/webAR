<?php
session_start();
?>
<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <title>操作説明</title>
    <link rel="stylesheet" href="./css/main.css">
    <script src="js/jquery-1.11.0.min.js"></script>
    <script src="js/common.js"></script>
</head>

<body>
    <!-- ロードアニメーション -->
    <div id="loadingAnim" class="loadingAnim"><i class="loadingAnim_line"></i></div>

    <!-- 地球 -->
    <p class="earth"><img src="images/img5.png" class="img_box"></p>

    <!-- ドロワーメニュー -->
    <input type="checkbox" class="check" id="checked">
    <label class="menu-btn" for="checked">
        <span class="bar top"></span>
        <span class="bar middle"></span>
        <span class="bar bottom"></span>
        <span class="menu-btn__text">MENU</span>
    </label>
    <label class="close-menu" for="checked"></label>
    <nav class="drawer-menu">
        <form action="./index.php" method="post">
            <p class="runa"><img src="./images/img6.png" alt="輝夜月"></p>
            <p class="u_name"><?php print 'ようこそ ' . $_SESSION['LOGINUSER'] . ' さん'; ?></p>
            <ul>
                <li><a href="./ar.html">ARplay</a></li>
                <li><a href="https://www.sonymusicshop.jp/m/sear/groupLis.php?site=S&ima=3221&cd=G001059">OfficialGoods</a></li>
                <li><a href="https://www.youtube.com/channel/UCQYADFw7xEJ9oZSM5ZbqyBw">YoutubeChannel</a></li>
                <li><input type="submit" name="logout" value="ログアウト"></li>
            </ul>
        </form>
    </nav>
    <!-- 表示ページ -->
    <div class="contents">
        <div class="contents__inner">
            <!-- 操作説明 -->
            <div class="wrapper">
                <div class="container">
                    <p class="logo"><img src="./images/img7.png" alt="操作説明"></p>
                    <div class="flex">
                        <p class="left"><img src="images/img9.png" alt=""></p>
                        <p class="right">カメラの中にマーカーを合わせて<br>輝夜月を表示させよう！</p>
                    </div>
                    <p><a href="./ar.html" class="start">カメラを起動する</a></p>
                </div>
            </div>
        </div>
    </div>

    <!-- えび -->
    <script src="js/star.js"></script>
</body>

</html>