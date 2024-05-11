const { MongoClient } = require('mongodb');
const md5 = require('md5');
const chalk = require('chalk');
const urii = `mongodb+srv://wibugacor:wibugacor@cluster0.jqfnmva.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const uri = 'mongodb+srv://user392:aisbirgaming@cluster0.3dweg2k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(uri);
const wibugacor = new MongoClient(urii);
async function deleteApiKey(apikey, apitype) {
await connectTodb();
const db = await client.db('asbir');
const collection = await db.collection('lisensi');
const find = await collection.findOne({ apikey: apikey, license: apitype });
if (find) {
    await collection.deleteOne({ apikey: apikey, license: apitype });
    client.close();
    return true;
}
else {
    client.close()
    return false;
}
}
async function apivalidator(apikey, apitype) {
    await connectTodb();
    const db = await client.db('asbir');
    const collection = await db.collection('lisensi');
    const find = await collection.findOne({ apikey: apikey, license: apitype });
    if (find) {
         client.close();
        return find;
    } else {
        client.close();
        return false;
    }
}
async function createApikey(name, licensetype) {
    await connectTodb();
    const ip = "192.168.100.1"
    const db = await client.db('asbir');
    const collection = await db.collection('lisensi');
    const apikey = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const data = {
        name: name,
        password: md5(apikey + name),
        apikey: apikey,
        license: licensetype,
        ip: ip
    }
    const dbfind = await collection.findOne({ apikey: apikey, license: licensetype});
    if (dbfind) {
        client.close();
        return false;
    }
   await collection.insertOne(data);
    client.close();
    return data;
}
async function getUpdateCo(apikey, apitype) {
   const cdata = await apivalidator(apikey, apitype);
   if(cdata) {
       await connectTodbWibu();
       const db = await wibugacor.db('version');
       const collection = await db.collection("co");
    const data = await collection.find().toArray();
   await wibugacor.close()
    return data;
   }
   else {
    return false;
   }
}
async function addUpdate(apitype, message, sha) {
    try{
    await connectTodbWibu();
    const db = await wibugacor.db('version');
    const collection = await db.collection(apitype);
    const data = await collection.insertOne({ message: message, sha: sha });
    await wibugacor.close();
    return data;
    }
    catch(e) {
        return false
    }
} 
async function validatebyip(apikey, apitype, ip) {
    await connectTodb();
    const db = await client.db('asbir');
    const collection = await db.collection('lisensi');
    const find = await collection.findOne({ apikey: apikey, license: apitype, ip: ip});
    if (find) {
        client.close();
       return find;
   } else {
       client.close();
       return false;
   }
}

async function changeIp(apikey, type, ip) {
    await connectTodb();
    const db = await client.db('asbir');
    const collection = await db.collection('lisensi');
    const find = await collection.findOne({ apikey: apikey, license: type });
    if(find) {
        const datash = await collection.updateOne({ apikey: apikey, license: type }, { $set: { ip: ip } }); 
        client.close();
return datash;
    }
    else {
        client.close();
        return false;
    }
    return false;
}
async function connectTodb() {

    try {
        await client.connect();
       console.log(chalk.green('[AUTH SERVER] ') + 'Connected to MongoDB (Auth)');

    } catch (error) {
        console.log(chalk.red('[AUTH SERVER] ') + 'Failed To connecting to MongoDB (Auth)');
    }
}
async function connectTodbWibu() {

    try {
        await wibugacor.connect();
       console.log(chalk.green('[AUTH SERVER] ') + 'Connected to MongoDB (Updater)');

    } catch (error) {
        console.log(chalk.red('[AUTH SERVER] ') + 'Failed To connecting to MongoDB (Updater)');
    }
}

module.exports = { 
    apivalidator,
    validatebyip,
    getUpdateCo,
    addUpdate,
    createApikey,
    deleteApiKey,
    changeIp
 };