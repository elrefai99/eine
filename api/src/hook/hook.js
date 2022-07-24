import Auth from '../routers/Auth.routes.js';
import User from '../routers/User.routes.js';
import Post from '../routers/Post.routes.js';

export default (app) => {
    app.use(Auth);
    app.use(User);
    app.use(Post);
}