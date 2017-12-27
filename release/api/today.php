<?php
	
	// phpinfo();

	// exit();

	$today = $_GET['today'];

	// ssl 安全
	$url = 'https://moment.douban.com/api/stream/date/'.$today.'?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&format=full&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6';

	// 通过php可以访问豆瓣数据，再返回给自已前端
	$result = file_get_contents($url);

	echo $result;







