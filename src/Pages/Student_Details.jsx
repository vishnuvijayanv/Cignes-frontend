import React, { useEffect ,useState} from 'react'
import Table from 'react-bootstrap/Table';
import { getStudentsAPI } from '../APISERVICES/apiFunctions';
import { serverurl } from '../APISERVICES/serverUrl';
function Student_Details() {

  const [students,setStudents] = useState({})


  const getStudentsDetails=async()=>{
    const result = await  getStudentsAPI()
    console.log(result);
    setStudents(result.data)

  }


  console.log(students);
  useEffect(()=>{
    getStudentsDetails()
  },[])




  
  return (
    <div className='container border shadow mt-4'>
        <Table responsive="md">
        <thead>
          <tr>
            <th>SNO</th>
            <th>Student Name</th>
            <th>Phone </th>
            <th>Email</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Course Method</th>
            <th>D.O.B</th>
            <th>Photo</th>
            <th>Country</th>
            <th>ID Card</th>

          </tr>
        </thead>
        <tbody>
          {
            students?.length>0?
            students.map((item,index)=>(
            <tr>
            <td>{index+1}</td>
            <td>{item.studentname}</td>
            <td>{item.phone}</td>
            <td>{item.email}</td>
            <td>{item.gender}</td>
            <td>{item.Courses[0]}</td>
            <td>{item.courseMethod}</td>
            <td>{item.dob.split("T")[0]}</td>
            <td><img src={`${serverurl}/uploads/${item.profilePicture}`} width={'100px'} height={'100px'} style={{borderRadius:'50%'}} alt="Loading.." /></td>
            <td>{item.Country}</td>
            <td className='d-flex '>
              <img src={`${serverurl}/uploads/${item.idImages[0]}`} width={'100px'} height={'100px'} className='me-3'  alt="" />
              <img src={`${serverurl}/uploads/${item.idImages[1]}`} width={'100px'} height={'100px'}  alt="" />
            </td>


          </tr>
            )):
            <tr>
              <td>No Data Available Right Now</td>
            </tr>
            

          }
          
        </tbody>
      </Table>

      
        
    </div>
  )
}

export default Student_Details