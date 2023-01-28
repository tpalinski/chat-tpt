import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = "mongodb+srv://admin:Klopklop2@cluster0.ipgs6c8.mongodb.net/?retryWrites=true&w=majority";
//@ts-ignore
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

export function connectToDatabase(){
    client.connect(err => {
        const collection = client.db("test").collection("devices");
        // perform actions on the collection object
        console.log("Connected to the database");
        client.close();
      });
}
