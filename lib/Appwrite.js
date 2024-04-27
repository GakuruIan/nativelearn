import { Client ,Account,ID, Avatars, Databases, Query,Storage} from 'react-native-appwrite';
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
const storage = new Storage(client)


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

export const Getcurrentuser=async()=>{
    try {
        const currentAccount = await account.get()

        if(!currentAccount) throw new Error("No account")

        const currentUser = await databases.listDocuments(Config.databaseId,
            Config.usersCollectionId,
            [Query.equal('accountId',currentAccount.$id)])

        if(!currentUser) throw new Error("No user found")
        
        return currentUser.documents[0]
    } catch (error) {
        console.log(error);
    }
}

export const GetVideos =async()=>{
   try {
    const videos = await databases.listDocuments(Config.databaseId,Config.videosCollectionId, [Query.orderDesc('$createdAt')])

    return videos.documents;
   } catch (error) {
     console.log(error);
   }
}

export const GetLatestVideos =async()=>{
    try {
     const videos = await databases.listDocuments(
        Config.databaseId,
        Config.videosCollectionId,
        [Query.orderDesc('$createdAt',Query.limit(7))]
        )
 
     return videos.documents;
    } catch (error) {
      console.log(error);
    }
 }

 export const searchVideos =async(query)=>{
    try {
     const videos = await databases.listDocuments(
        Config.databaseId,
        Config.videosCollectionId,
        [Query.search('title',query)]
        )
 
     return videos.documents;
    } catch (error) {
      console.log(error);
    }
 }

 export const UserVideos =async(userId)=>{
    try {
     const videos = await databases.listDocuments(
        Config.databaseId,
        Config.videosCollectionId,
        [Query.equal('users',userId)]
        )

     return videos.documents;
    } catch (error) {
      console.log(error);
    }
 }

 export const SignOut =async()=>{
    try {
        const session = await account.deleteSession('current')

        return session;
    } catch (error) {
        throw new Error(error)
    }
 }

const FilePreview =async(fileId,type)=>{
   let fileUrl

   try {
    if(type === 'image'){
        fileUrl = storage.getFileView(Config.storageBucketId,fileId)
    }
    else if(type === 'video'){
        fileUrl = storage.getFilePreview(Config.storageBucketId,fileId,2000,2000,'top',100)
    }
    else{
        throw new Error("Invalid file type")
    }
    if(!fileUrl) throw Error
    return fileUrl
   } 
   catch (error) {
     throw new Error(error)
   }

}

const uploadFile =async(file,fileType)=>{
    if(!file) return
   
    const asset = {
        name:file.fileName,
        type:file.mimeType,
        size:file.filesize,
        uri:file.uri
    }

    try {
        const uploadedFile = await storage.createFile(
            Config.storageBucketId,
            ID.unique(),
            asset
            )
        const fileUrl = await FilePreview(uploadedFile.$id,fileType)
     
        return fileUrl
    } catch (error) {
        throw new Error(error)
    }
}

 export const Createvideo =async(form)=>{
    console.log(form);
    try {
        const [thumbnailURL,videoURL] = await Promise.all([
            uploadFile(form.thumbnail,'image'),
            uploadFile(form.video,'video')
        ])

        const newPost = await databases.createDocument(
                Config.databaseId,
                Config.videosCollectionId,
                ID.unique(),
                {title:form.title,
                video:videoURL,
                thumbnail:thumbnailURL,
                users:form.userID}
            )

        return newPost
    } catch (error) {
        throw new Error(error)
    }
 }