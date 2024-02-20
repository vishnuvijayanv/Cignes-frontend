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
    <div className='bg-primary p-5'>
      <div >
        <a href="/" className='btn text-light bg-info ' ><i class="fa-solid fa-arrow-left me-3"></i>Back</a>
          <Table responsive="lg" className='container border rounded shadow mt-4' style={{borderCollapse: 'collapse'}}>
          <thead style={{backgroundColor: 'aqua'}}>
            <tr >
              <th>SNO</th>
              <th>Photo</th>

              <th>Student Name</th>
              <th>Phone </th>
              <th>Email</th>
              <th>Gender</th>
              <th>Course</th>
              <th>Course Method</th>
              <th>D.O.B</th>
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
              <td><img src={`${serverurl}/uploads/${item.profilePicture}`} width={'50px'} height={'50px'} style={{borderRadius:'50%'}} alt="Loading.." /></td>

              <td>{item.studentname}</td>
              <td>{item.phone}</td>
              <td>{item.email}</td>
              <td>{item.gender}</td>
              <td>{item.Courses[0]}</td>
              <td>{item.courseMethod}</td>
              <td>{item.dob.split("T")[0]}</td>
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
    </div>
  )
}

export default Student_Details