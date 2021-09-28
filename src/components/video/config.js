const cf = {
	ver:'debug',
	q2http_url: 'http://127.0.0.1:9585/icvs2/',// 连接icvs平台地址,如果是https协议,地址为'https://ip:port/icvs2/',ip为视频转码服务部署所在服务器的ip地址,port为q2http转码服务端口
	flv_url:'http://127.0.0.1:9585/',
  websocket_url: 'ws://127.0.0.1:9585/',// websocket地址,如果是https协议,地址为'wss://ip:sslPort/wss',ip为视频转码服务部署所在服务器的ip地址,sslPort为SSL协议的监听端口，如果是http协议，sslPort和q2http_url使用ip和端口一致
	
	// connParams : {
	// 	// - 登录平台IP
	// 	address: "60.168.132.97",
  //   // - 端口
	// 	port : "49988",
	// 	// - 登录平台用户名
	// 	user : "zwtest",
	// 	// - 登录平台密码
	// 	password :"Zwtest123456",
	// 	// - 登录平台企业ID
	// 	epid : "system",
	// 	// - 登录平台是否通过网闸模式
	// 	bfix :0
	// }
	
		connParams : {
		// - 登录平台IP
		address: "220.248.233.105",

		port : "9988",
		// - 登录平台用户名
		user : "admin",
		// - 登录平台密码
		password :"",
		// - 登录平台企业ID
		epid : "system",
		// - 登录平台是否通过网闸模式
		bfix :1
	}	
}

export default cf