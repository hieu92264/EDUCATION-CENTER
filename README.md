1.	npm init -y
2.	npm i express
3.	npm I -D nodemon
4.	npm I mongoose
5.	npm I -D dotenv
6.	npm install --save-dev babel-plugin-module-resolver
7.	npm i -D @babel/core @babel/cli @babel/node @babel/preset-env (https://trungquandev.com/cau-hinh-babel-cho-mot-du-an-nodejs-thuan-javascript/)
8.	init file .babelrc
9.	init file jsconfig.json
10.	init src/main.js
11.	init .env and .env.example
12.	cp .env.example .env
13.	init folder database and file database.module.js (tao 1 connection den mongoose voi mongodb_uri va db_name)
14.	call module database in main.js
15.	create route module to import routes of  any module
16.	create folder modules and create any module, create files model, controller, route, service
17.	init method static register in file modulename.route.js and return variable router
18.	import from modulename.route.js to route.module.js
19.	call RouteModule.init({prefix, app}) in main.js
20.	check route
21.	init schema in moduleName.model.js
22.	init services in moduleName.service.js
23.	init controller in moduleName.controller.js

app.METHOD(PATH, [MIDDLEWARE...], HANDLER)

Trong Express, **req, res, và next là 3 tham số mặc định được tự động truyền vào cho mọi hàm callback mà bạn gắn vào route hoặc middleware. Không cần khai báo gì thêm cả.
 
Init folder filter, file exception.filter.js: Khởi tạo 1 hàm useExceptionFilter(executionHandler) nhận vào tham số là 1 function và trả về 1 function mới; 
Function useExceptionFilter kế thừa req, res, next được truyền từ các method http get, post, delete….
UserExceptionFilter(executionHandler) return về 1 callback
 return async function (req, res, next) {
    try {
      return await executionHandler(req, res, next);
    } catch (error) {
      if (createHttpError.isHttpError(error)) {
        return res.status(error.statusCode).json({
          message: error.message,
          statusCode: error.statusCode,
          stack: error.stack,
        });
      }
      return res
        .status(500)
        .json(createHttpError.InternalServerError(error.message));
    }
  };
Các chức năng của dự án education_center
•	Auth(login logout hasRole) done
•	User: C(admin), R(admin, teacher), U(admin), D(admin) done
•	Course: CUD(admin, teacher) done
•	Category: CUD(admin, teacher) done
•	Class: CUD(Admin, teacher) done
•	Thêm danh sách học sinh vào lớp học done 
•	Xoá học sinh or list học sinh khỏi lớp học done
