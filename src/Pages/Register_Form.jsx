import React, { useEffect, useState } from 'react'
import {Row ,Col} from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import {Multiselect} from 'multiselect-react-dropdown'
import { studentRegisterAPI } from '../APISERVICES/apiFunctions'
import {useNavigate} from 'react-router-dom'
function Register_Form() {

    const [profile,setProfile] = useState("")
    const [StudentDetails,setStudentDetails]=useState({
        studentname:"",
        phone:"",
        email:"",
        gender:"",
        Courses:[],
        courseMethod:"",
        profilePicture:"",
        dob:"",
        idImages:[] ,
        Country:""
    })
    console.log(StudentDetails);


    //useNavigate() for navigate to studentDetails Page

    const Navigate = useNavigate()
    //used to create image url to show preview
    useEffect(()=>{
        if (StudentDetails.profilePicture) {
            setProfile(URL.createObjectURL(StudentDetails.profilePicture))
           
        }
        else{
            setProfile("")
        }
    },[StudentDetails.profilePicture])



    //multiselcetion dropdown

    const data = [
        {Courses:'React js',id:1},
        {Courses:'Angular',id:2},
        {Courses:'Node js',id:3},
        {Courses:'Express js',id:4},
        {Courses:'Javascript',id:5},
        {Courses:'Html',id:6},

    ]

    const [options] = useState(data)
    const handleCourseSelection = (selectedList, selectedItem) => {
        // Extracting the course names from the selected items
        const selectedCourses = selectedList.map(course => course.Courses);
        setStudentDetails({ ...StudentDetails, Courses: selectedCourses });
    }

    
    //function to register a student
    const studentRegister = async(e)=>{
        e.preventDefault()
        const {studentname,phone,email,gender,Courses,courseMethod,profilePicture,dob,idImages,Country} = StudentDetails

        if (!studentname || !phone || !email || !gender || !Courses || !courseMethod || !profilePicture || !dob || !idImages || !Country) {
            console.log("Please Fill All Details To Continue");
            alert("Please Fill All Details To Continue!")
        }

        else{

            const reqBody = new FormData()

            reqBody.append("studentname",studentname)
            reqBody.append("phone",phone)
            reqBody.append("email",email)
            reqBody.append("gender",gender)
            reqBody.append("Courses",Courses)
            reqBody.append("courseMethod",courseMethod)
            reqBody.append("profilePicture",profilePicture)
            reqBody.append("dob",dob)
            for (let i = 0; i < idImages.length; i++) {
                reqBody.append("idImages", idImages[i]);
            }
            
            reqBody.append("Country",Country)

            const result = await studentRegisterAPI(reqBody)
            console.log(result);

            if (result.status ===200){
                alert("Student Registration Successfull")

                setStudentDetails({
                    studentname:"",
                    phone:"",
                    email:"",
                    gender:"",
                    Courses:[],
                    courseMethod:"",
                    profilePicture:"",
                    dob:"",
                    idImages:[] ,
                    Country:""
                })


                Navigate('/student-details')


            }else{
                alert(result.response.data)
            }



        }
    }

    //function to clear the form

    const handleClear=()=>{
        setStudentDetails({
            studentname:"",
            phone:"",
            email:"",
            gender:"",
            Courses:[],
            courseMethod:"",
            profilePicture:"",
            dob:"",
            idImages:[] ,
            Country:""
        })
    }


  return (
    <div className='bg-primary p-3'>
        <div className="container ">
            <div >
                <div className='d-flex justify-content-between mt-3'>
                    <h4 className='ms-4 text-light'>Student Registeration Form</h4>
                    <a href="/student-details " className='btn btn-info m-3'>View All Students<i class="fa-solid fa-graduation-cap ms-2 me-4"></i></a>
                </div>
                <hr />
            
               <Form   >
                    <Row className=' border rounded shadow ' style={{backgroundColor:'aliceblue'}}>
                        <Col md={6} className='p-5'>
                            <label className=' mb-2 fw-bold' htmlFor="student_Name">Student Name :
                            </label>
                            <input  type="text"  id='student_Name' placeholder='Enter Student Name' required className='form-control w-100 mb-3' onChange={(e)=>setStudentDetails({...StudentDetails,studentname:e.target.value})} />
    
    
    
                            <label className='d-flex mb-2 fw-bold' htmlFor="phone">Phone :
                            </label>
                            <input  type="number"  id='phone' placeholder='Enter Phone Number' required pattern="[0-9]{10}" className='form-control mb-3' onChange={(e)=>setStudentDetails({...StudentDetails,phone:e.target.value})} />
    
                            <label className='d-flex mb-2 fw-bold' htmlFor="email">Email:
                            </label>
                            <input  type="email"  id='email' placeholder='Enter Email' required className='form-control mb-3' onChange={(e)=>setStudentDetails({...StudentDetails,email:e.target.value})} />
                            <div>
                                <h6 className='fw-bold'>Select Gender</h6>
                                <input type="radio"  name="gender" onChange={(e)=>setStudentDetails({...StudentDetails,gender:e.target.value})} value="male"/>Male
                                <input type="radio" name="gender" onChange={(e)=>setStudentDetails({...StudentDetails,gender:e.target.value})} value="fmale" className='ms-3'/>Female
                            </div>
                            
    
                            <Multiselect
                                    options={options}
                                    displayValue='Courses'
                                    placeholder='Select Courses'
                                    className='mt-4'
                                    onSelect={handleCourseSelection}
                                    onRemove={handleCourseSelection}
                                />
    
    
                               <div className='d-flex mt-4'>
                                <h6 className='me-4 fw-bold'>Course Mode:</h6>    
                                {['checkbox'].map((type) => (
                                        <div key={`default-${type}`} className="mb-3">
                                        <Form.Check 
                                            type={type}
                                            id={`Online`}
                                            label={`Online`}  
                                            value={'online'}
                                            checked={StudentDetails.courseMethod === 'online'}
                                            onChange={(e)=>setStudentDetails({...StudentDetails,courseMethod:e.target.checked?'online':''})}
            
                                        />
                                        <Form.Check 
                                            type={type}
                                            id={`Offline`}
                                            label={`Offline`}  
                                            value={'Offline'}
                                            checked={StudentDetails.courseMethod === 'offline'}
                                            onChange={(e)=>setStudentDetails({...StudentDetails,courseMethod:e.target.checked?'offline':''})}
            
                                        />
                                        <Form.Check 
                                            type={type}
                                            id={`Hybrid`}
                                            label={`Hybrid`}  
                                            value={'Hybrid'}
                                            checked={StudentDetails.courseMethod === 'hybrid'}
                                            onChange={(e)=>setStudentDetails({...StudentDetails,courseMethod:e.target.checked?'hybrid':''})}
            
                                        />
                                        </div>
                                    ))}
                               </div>
    
    
                            
    
                            
                        </Col>
    
                        <Col md={6} className='p-5'>
                        <label className=' d-flex justify-content-center ' htmlFor="profile">
                            <input id="profile" type="file" style={{display:'none' }} onChange={(e)=>setStudentDetails({...StudentDetails,profilePicture:e.target.files[0]})} />
                            <img width={'200px'} height={'200px'} src={profile?profile:`https://cdn0.iconfinder.com/data/icons/facebook-ui-glyph/48/Sed-10-256.png`} className='rounded-circle justify-content-center border ' alt="" />
                        </label>
    
                        <Form.Group className="mb-3">
                            <label className='d-flex flex-column mb-2 me-2 mt-3 fw-bold' htmlFor="dob">Date of Birth :</label>
                            <input  type="date"  id='dob'  required className='form-control mb-3'  onChange={(e)=>setStudentDetails({...StudentDetails,dob:e.target.value})} />
                        </Form.Group>
    
                        <Form.Group controlId="formFile" className="mb-3 d-flex flex-column">
                            <Form.Label className='fw-bold'>Upload Your Student Id (Both Sides)</Form.Label>
                            <span style={{fontSize:'10px'}}>*use shift+select to select multiple files</span>
                            <Form.Control type="file" multiple size="md" onChange={(e)=>setStudentDetails({...StudentDetails,idImages:e.target.files})} />
                        </Form.Group>
    
                        <select name="country" class="form-control mt-3" id="country" onChange={(e)=>setStudentDetails({...StudentDetails,Country:e.target.value})}>
                            <option value="0" label="Select a country ... " selected="selected">Select a country ... </option>
                            <option value="Afghanistan">Afghanistan</option>
                            <option value="Albania">Albania</option>
                            <option value="Algeria">Algeria</option>
                            <option value="American Samoa">American Samoa</option>
                            <option value="Andorra">Andorra</option>
                            <option value="Angola">Angola</option>
                            <option value="Anguilla">Anguilla</option>
                            <option value="Antartica">Antarctica</option>
                            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                            <option value="Argentina">Argentina</option>
                            <option value="Armenia">Armenia</option>
                            <option value="Aruba">Aruba</option>
                            <option value="Australia">Australia</option>
                            <option value="Austria">Austria</option>
                            <option value="Azerbaijan">Azerbaijan</option>
                            <option value="Bahamas">Bahamas</option>
                            <option value="Bahrain">Bahrain</option>
                            <option value="Bangladesh">Bangladesh</option>
                            <option value="Barbados">Barbados</option>
                            <option value="Belarus">Belarus</option>
                            <option value="Belgium">Belgium</option>
                            <option value="Belize">Belize</option>
                            <option value="Benin">Benin</option>
                            <option value="Bermuda">Bermuda</option>
                            <option value="Bhutan">Bhutan</option>
                            <option value="Bolivia">Bolivia</option>
                            <option value="Bosnia and Herzegowina">Bosnia and Herzegowina</option>
                            <option value="Botswana">Botswana</option>
                            <option value="Bouvet Island">Bouvet Island</option>
                            <option value="Brazil">Brazil</option>
                            <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                            <option value="Brunei Darussalam">Brunei Darussalam</option>
                            <option value="Bulgaria">Bulgaria</option>
                            <option value="Burkina Faso">Burkina Faso</option>
                            <option value="Burundi">Burundi</option>
                            <option value="Cambodia">Cambodia</option>
                            <option value="Cameroon">Cameroon</option>
                            <option value="Canada">Canada</option>
                            <option value="Cape Verde">Cape Verde</option>
                            <option value="Cayman Islands">Cayman Islands</option>
                            <option value="Central African Republic">Central African Republic</option>
                            <option value="Chad">Chad</option>
                            <option value="Chile">Chile</option>
                            <option value="China">China</option>
                            <option value="Christmas Island">Christmas Island</option>
                            <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                            <option value="Colombia">Colombia</option>
                            <option value="Comoros">Comoros</option>
                            <option value="Congo">Congo</option>
                            <option value="Congo">Congo, the Democratic Republic of the</option>
                            <option value="Cook Islands">Cook Islands</option>
                            <option value="Costa Rica">Costa Rica</option>
                            <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                            <option value="Croatia">Croatia (Hrvatska)</option>
                            <option value="Cuba">Cuba</option>
                            <option value="Cyprus">Cyprus</option>
                            <option value="Czech Republic">Czech Republic</option>
                            <option value="Denmark">Denmark</option>
                            <option value="Djibouti">Djibouti</option>
                            <option value="Dominica">Dominica</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="East Timor">East Timor</option>
                            <option value="Ecuador">Ecuador</option>
                            <option value="Egypt">Egypt</option>
                            <option value="El Salvador">El Salvador</option>
                            <option value="Equatorial Guinea">Equatorial Guinea</option>
                            <option value="Eritrea">Eritrea</option>
                            <option value="Estonia">Estonia</option>
                            <option value="Ethiopia">Ethiopia</option>
                            <option value="Falkland Islands">Falkland Islands (Malvinas)</option>
                            <option value="Faroe Islands">Faroe Islands</option>
                            <option value="Fiji">Fiji</option>
                            <option value="Finland">Finland</option>
                            <option value="France">France</option>
                            <option value="France Metropolitan">France, Metropolitan</option>
                            <option value="French Guiana">French Guiana</option>
                            <option value="French Polynesia">French Polynesia</option>
                            <option value="French Southern Territories">French Southern Territories</option>
                            <option value="Gabon">Gabon</option>
                            <option value="Gambia">Gambia</option>
                            <option value="Georgia">Georgia</option>
                            <option value="Germany">Germany</option>
                            <option value="Ghana">Ghana</option>
                            <option value="Gibraltar">Gibraltar</option>
                            <option value="Greece">Greece</option>
                            <option value="Greenland">Greenland</option>
                            <option value="Grenada">Grenada</option>
                            <option value="Guadeloupe">Guadeloupe</option>
                            <option value="Guam">Guam</option>
                            <option value="Guatemala">Guatemala</option>
                            <option value="Guinea">Guinea</option>
                            <option value="Guinea-Bissau">Guinea-Bissau</option>
                            <option value="Guyana">Guyana</option>
                            <option value="Haiti">Haiti</option>
                            <option value="Heard and McDonald Islands">Heard and Mc Donald Islands</option>
                            <option value="Holy See">Holy See (Vatican City State)</option>
                            <option value="Honduras">Honduras</option>
                            <option value="Hong Kong">Hong Kong</option>
                            <option value="Hungary">Hungary</option>
                            <option value="Iceland">Iceland</option>
                            <option value="India">India</option>
                            <option value="Indonesia">Indonesia</option>
                            <option value="Iran">Iran (Islamic Republic of)</option>
                            <option value="Iraq">Iraq</option>
                            <option value="Ireland">Ireland</option>
                            <option value="Israel">Israel</option>
                            <option value="Italy">Italy</option>
                            <option value="Jamaica">Jamaica</option>
                            <option value="Japan">Japan</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Kazakhstan">Kazakhstan</option>
                            <option value="Kenya">Kenya</option>
                            <option value="Kiribati">Kiribati</option>
                            <option value="Democratic People's Republic of Korea">Korea, Democratic People's Republic of</option>
                            <option value="Korea">Korea, Republic of</option>
                            <option value="Kuwait">Kuwait</option>
                            <option value="Kyrgyzstan">Kyrgyzstan</option>
                            <option value="Lao">Lao People's Democratic Republic</option>
                            <option value="Latvia">Latvia</option>
                            <option value="Lebanon" >Lebanon</option>
                            <option value="Lesotho">Lesotho</option>
                            <option value="Liberia">Liberia</option>
                            <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                            <option value="Liechtenstein">Liechtenstein</option>
                            <option value="Lithuania">Lithuania</option>
                            <option value="Luxembourg">Luxembourg</option>
                            <option value="Macau">Macau</option>
                            <option value="Macedonia">Macedonia, The Former Yugoslav Republic of</option>
                            <option value="Madagascar">Madagascar</option>
                            <option value="Malawi">Malawi</option>
                            <option value="Malaysia">Malaysia</option>
                            <option value="Maldives">Maldives</option>
                            <option value="Mali">Mali</option>
                            <option value="Malta">Malta</option>
                            <option value="Marshall Islands">Marshall Islands</option>
                            <option value="Martinique">Martinique</option>
                            <option value="Mauritania">Mauritania</option>
                            <option value="Mauritius">Mauritius</option>
                            <option value="Mayotte">Mayotte</option>
                            <option value="Mexico">Mexico</option>
                            <option value="Micronesia">Micronesia, Federated States of</option>
                            <option value="Moldova">Moldova, Republic of</option>
                            <option value="Monaco">Monaco</option>
                            <option value="Mongolia">Mongolia</option>
                            <option value="Montserrat">Montserrat</option>
                            <option value="Morocco">Morocco</option>
                            <option value="Mozambique">Mozambique</option>
                            <option value="Myanmar">Myanmar</option>
                            <option value="Namibia">Namibia</option>
                            <option value="Nauru">Nauru</option>
                            <option value="Nepal">Nepal</option>
                            <option value="Netherlands">Netherlands</option>
                            <option value="Netherlands Antilles">Netherlands Antilles</option>
                            <option value="New Caledonia">New Caledonia</option>
                            <option value="New Zealand">New Zealand</option>
                            <option value="Nicaragua">Nicaragua</option>
                            <option value="Niger">Niger</option>
                            <option value="Nigeria">Nigeria</option>
                            <option value="Niue">Niue</option>
                            <option value="Norfolk Island">Norfolk Island</option>
                            <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                            <option value="Norway">Norway</option>
                            <option value="Oman">Oman</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="Palau">Palau</option>
                            <option value="Panama">Panama</option>
                            <option value="Papua New Guinea">Papua New Guinea</option>
                            <option value="Paraguay">Paraguay</option>
                            <option value="Peru">Peru</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Pitcairn">Pitcairn</option>
                            <option value="Poland">Poland</option>
                            <option value="Portugal">Portugal</option>
                            <option value="Puerto Rico">Puerto Rico</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Reunion">Reunion</option>
                            <option value="Romania">Romania</option>
                            <option value="Russia">Russian Federation</option>
                            <option value="Rwanda">Rwanda</option>
                            <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option> 
                            <option value="Saint LUCIA">Saint LUCIA</option>
                            <option value="Saint Vincent">Saint Vincent and the Grenadines</option>
                            <option value="Samoa">Samoa</option>
                            <option value="San Marino">San Marino</option>
                            <option value="Sao Tome and Principe">Sao Tome and Principe</option> 
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Senegal">Senegal</option>
                            <option value="Seychelles">Seychelles</option>
                            <option value="Sierra">Sierra Leone</option>
                            <option value="Singapore">Singapore</option>
                            <option value="Slovakia">Slovakia (Slovak Republic)</option>
                            <option value="Slovenia">Slovenia</option>
                            <option value="Solomon Islands">Solomon Islands</option>
                            <option value="Somalia">Somalia</option>
                            <option value="South Africa">South Africa</option>
                            <option value="South Georgia">South Georgia and the South Sandwich Islands</option>
                            <option value="Span">Spain</option>
                            <option value="SriLanka">Sri Lanka</option>
                            <option value="St. Helena">St. Helena</option>
                            <option value="St. Pierre and Miguelon">St. Pierre and Miquelon</option>
                            <option value="Sudan">Sudan</option>
                            <option value="Suriname">Suriname</option>
                            <option value="Svalbard">Svalbard and Jan Mayen Islands</option>
                            <option value="Swaziland">Swaziland</option>
                            <option value="Sweden">Sweden</option>
                            <option value="Switzerland">Switzerland</option>
                            <option value="Syria">Syrian Arab Republic</option>
                            <option value="Taiwan">Taiwan, Province of China</option>
                            <option value="Tajikistan">Tajikistan</option>
                            <option value="Tanzania">Tanzania, United Republic of</option>
                            <option value="Thailand">Thailand</option>
                            <option value="Togo">Togo</option>
                            <option value="Tokelau">Tokelau</option>
                            <option value="Tonga">Tonga</option>
                            <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                            <option value="Tunisia">Tunisia</option>
                            <option value="Turkey">Turkey</option>
                            <option value="Turkmenistan">Turkmenistan</option>
                            <option value="Turks and Caicos">Turks and Caicos Islands</option>
                            <option value="Tuvalu">Tuvalu</option>
                            <option value="Uganda">Uganda</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="United Arab Emirates">United Arab Emirates</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="United States">United States</option>
                            <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                            <option value="Uruguay">Uruguay</option>
                            <option value="Uzbekistan">Uzbekistan</option>
                            <option value="Vanuatu">Vanuatu</option>
                            <option value="Venezuela">Venezuela</option>
                            <option value="Vietnam">Viet Nam</option>
                            <option value="Virgin Islands (British)">Virgin Islands (British)</option>
                            <option value="Virgin Islands (U.S)">Virgin Islands (U.S.)</option>
                            <option value="Wallis and Futana Islands">Wallis and Futuna Islands</option>
                            <option value="Western Sahara">Western Sahara</option>
                            <option value="Yemen">Yemen</option>
                            <option value="Serbia">Serbia</option>
                            <option value="Zambia">Zambia</option>
                            <option value="Zimbabwe">Zimbabwe</option>
                            
                        </select>
                        <div className='d-flex'>
    
                            <button onClick={handleClear} className='form-control btn btn-light border mt-3 me-3'>Clear</button>
                            <button onClick={(e)=>studentRegister(e)} type='submit' className='form-control btn btn-primary mt-3'>Submit</button>
    
                        </div>
                        </Col>
                    </Row>
               </Form>
            </div>
    
        </div>
    </div>
  )
}

export default Register_Form