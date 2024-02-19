import axios from "axios";

export const commonAPI = async(httprequest,url,reqBody)=>{
    let reqConfig={
        method:httprequest,
        url:url,
        data:reqBody,
        headers:{
            "Content-Type":"multipart/form-data"
    }
    }
    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })

}