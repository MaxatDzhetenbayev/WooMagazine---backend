export const template = ({ name, phone, message }) => {
	return `
	<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
		  <style>
		  *{
			margin: 0;
			padding: 0;
		  }
		 	.header{
				width: 100%;
				padding: 20px 0;
				background-color: #FF6600;
				border-radius-top-left: 10px;
				border-radius-top-rigth: 10px;

			}
			h1{
				text-align: center;
				color: #fff;
			}
			.container{
				width: 100%;
				min-height: 100px;	
				padding: 15px;
				
				background-color: #ff59;
				
				border-radius-bottom-left: 10px;
				border-radius-bottom-rigth: 10px;
			}
			.item{
				display: flex;
				align-items: center;
			}
			p{
				margin-left: 10px;
			}

		  </style>
		</head>
		<body>
			<div class="header">
				<h1>WOOMAGAZINE ОБРАТНАЯ СВЯЗЬ</h1>
			</div>
			<div class="container">
				<div class="item">
					<h3>Имя пользователя: </h3>
					<p>${name}</p>
				</div>	
				<div class="item">
					<h3>Телефон пользователя: </h3>
					<p>${phone}</p>
				</div>	
				<div class="item">
					<h3>Сообщение пользователя: </h3>
					<p>${message}</p>
				</div>	

			</div>
		</body>
	</html>
	`
}