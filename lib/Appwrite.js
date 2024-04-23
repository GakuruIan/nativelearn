import { Client ,Account,ID, Avatars, Databases} from 'react-native-appwrite';
import env from '../Config/development'

export const Config= {
    endpoint :env.ENDPOINT,
    platform:env.PLATFORM,
    projectId:env.PROJECTID,
    databaseId:env.DATABASEID,
    usersCollectionId:env.USERSCOLLECTIONID,
    videosCollectionId:env.VIDEOSCOLLECTIONID,
    storageBucketId:env.STORAGEBUCKETID
}


const client = new Client();

client
    .setEndpoint(Config.endpoint)
    .setProject(Config.projectId) 
    .setPlatform(Config.platform);

const account = new Account(client);
const avatar = new Avatars(client)
const databases = new Databases(client)


// Register User
export const CreateUser=async(username,email,password)=>{
    try {
        const newAccount = await  account.create(ID.unique(), email, password, username)

        if(!newAccount) throw Error

        const avatarUrl = avatar.getInitials(username)

        const newUser = await databases.createDocument(
            Config.databaseId,
            Config.usersCollectionId,
            ID.unique(),
            {
                accountId : newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            })
        
            return newUser
    } catch (error) {
        console.log(error);
        throw new Error (error)
    }
    
}

export async function  signIn(email,password) {
    try {
        const session = await account.createEmailSession(email,password)

        return session
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
} 