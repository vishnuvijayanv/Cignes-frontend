

//API function for student registration

import { commonAPI } from "./apiConfig"
import { serverurl } from "./serverUrl"


//API to student registration
export const studentRegisterAPI = async(student)=>{
    return await commonAPI('POST',`${serverurl}/students/add`,student)
}

//API Fn to get students details
export const getStudentsAPI = async()=>{
    return await commonAPI('GET',`${serverurl}/student/view`)
}

