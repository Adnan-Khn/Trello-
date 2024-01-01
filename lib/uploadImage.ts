
import {ID,storage} from "@/appwrite"

const uploadImage = async(file:File)=>{
    if(!file) return
    const fileUploaded = await storage.createFile(
        "6558cade476e9864c2c8",
        ID.unique(),
        file
    )
    return fileUploaded
}
export default uploadImage