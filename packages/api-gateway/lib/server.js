"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@instagram-node/common");
const user_1 = require("./routes/user");
const port = 5000;
const app = new common_1.App(port).addBodyParser().addCors().addRoute('/users', user_1.userRouter);
app.listen();
//# sourceMappingURL=server.js.map