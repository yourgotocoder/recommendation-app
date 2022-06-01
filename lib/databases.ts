import { MongoClient } from "mongodb";

async function connectToDatabase(): Promise<MongoClient> {
    const client = await MongoClient.connect(
        `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@cluster0.i5fq9.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`
    );
    return client;
}

export default connectToDatabase;
