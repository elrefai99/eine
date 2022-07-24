import mongo from 'mongoose';

export default (app) =>{
    const port = process.env.PORT || 1999;
    mongo.connect(process.env.mongodb, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            app.listen(port, () => {
                console.log(`Server started on port ${process.env.ApiHostUrl}`);
            })
        }).catch(err => console.log(err));
}