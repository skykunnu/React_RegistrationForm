import { useState } from "react";

function App() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    aadhaarFront: null,
    aadhaarBack: null,
    parentName: "",
    parentPhone: "",
    localAddress: "",
    permanentAddress: "",
    sameAsLocal: false,
    status: "Student",
    qualification: "",
    year: "",
    college: "",
    course: "",
    source: "",
    friendName:"",
  });

  const [isChecked,setIsChecked]=useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const [aadhaarPreviews, setAadhaarPreviews] = useState({
    front: null,
    back: null,
  });

  function handleInputChange(e){

    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files?.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setAadhaarPreviews((prev) => ({
          ...prev,
          [name === "aadhaarFront" ? "front" : "back"]: reader.result,
        }));
      };

      reader.readAsDataURL(file);
    }



    if (type === "checkbox") {
      setFormValues((prev) => ({
        ...prev,
        [name]: checked,
        ...(name === "sameAsLocal" && checked && { permanentAddress: prev.localAddress }),
      }));
    } else if (type === "file") {
      setFormValues((prev) => ({
        ...prev,
        [name]: files[0], 
      }));
    } else {
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  function handleToggleChange(){
    setIsChecked((prev) => !prev); 
    setShowPopup(true); 

  };

  function handleSubmit(e){
    e.preventDefault();
    console.log("Form Values:", formValues);

  };


  function handlePopupAgree(){
    setIsChecked(true); 
    setShowPopup(false); 
  };

  function handlePopupCancel(){
    setIsChecked(false); 
    setShowPopup(false); 
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="personal-details border-gray-400 border-2 mx-2 mt-2 mb-5 rounded-lg">
          <h1 className="px-2 text-lg font-semibold bg-gray-400">Personal Details</h1>
          <hr />
          <div className="flex gap-8 my-4">
            <label htmlFor="name" className="w-36 mx-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="border w-[40rem] px-1"
              value={formValues.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="email" className="w-36 mx-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="border w-[40rem] px-1"
              value={formValues.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="phone" className="w-36 mx-2">
              Phone
            </label>
            <input
              type="number"
              name="phone"
              placeholder="Enter your Phone number"
              className="border w-[40rem] px-1"
              value={formValues.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="dob" className="w-36 mx-2">
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              className="border w-[40rem] px-1"
              value={formValues.dob}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="gender" className="w-36 mx-2">
              Gender
            </label>
            <div className="flex gap-10">
              <span className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formValues.gender === "Male"}
                  onChange={handleInputChange}
                />
                <label htmlFor="male">Male</label>
              </span>
              <span className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formValues.gender === "Female"}
                  onChange={handleInputChange}
                />
                <label htmlFor="female">Female</label>
              </span>
              <span className="flex gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formValues.gender === "Other"}
                  onChange={handleInputChange}
                />
                <label htmlFor="other">Other</label>
              </span>
            </div>
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="aadhaar1" className="w-36 mx-2">
              Aadhaar Card
            </label>
            <span className="flex gap-2">
            <div>
              <input
                type="file"
                name="aadhaarFront"
                className="border w-[20rem]"
                accept='images/*'
                onChange={handleInputChange}
              />
                 {aadhaarPreviews.front && (
                <img
                  src={aadhaarPreviews.front}
                  alt="Aadhaar Front Preview"
                  className="mt-2 w-[200px] h-[15rem]"
                />
              )}
            </div>
            <div>
              <input
                type="file"
                name="aadhaarBack"
                className="border w-[20rem]"
                accept='images/*'
                onChange={handleInputChange}
              />
              {aadhaarPreviews.back && (
                <img
                  src={aadhaarPreviews.back}
                  alt="Aadhaar Back Preview"
                  className="mt-2 w-[200px] h-[15rem]"
                />
              )}
            </div>
            </span>
          </div>
        </div>

        {/* Parent/Guardian Details */}
        <div className="parent/gaurdian-details border-gray-400 border-2 mx-2 mt-2 mb-5 rounded-lg">
          <h1 className="px-2 text-lg font-semibold bg-gray-400">Parent/ Guardian Details</h1>
          <hr />
          <div className="flex gap-8 my-4">
            <label htmlFor="parentName" className="w-36 mx-2">
              Parent/ Guardian Name
            </label>
            <input
              type="text"
              name="parentName"
              placeholder="Enter your parent's name"
              className="border w-[40rem] px-1 h-7"
              value={formValues.parentName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="parentPhone" className="w-36 mx-2">
              Parent/ Guardian Phone
            </label>
            <input
              type="number"
              name="parentPhone"
              placeholder="Enter parent's phone number"
              className="border w-[40rem] px-1 h-7"
              value={formValues.parentPhone}
              onChange={handleInputChange}
            />
          </div>
        </div>

        {/* Residential Details */}
        <div className="Residential-details border-2 border-gray-400 mx-2 mt-2 mb-5 rounded-lg">
          <h1 className="px-2 text-lg font-semibold bg-gray-400">Residential Details</h1>
          <hr />
          <div className="flex gap-8 my-4">
            <label htmlFor="localAddress" className="w-36 mx-2">
              Local Address
            </label>
            <textarea
              name="localAddress"
              placeholder="Enter your Local address"
              className="border w-[40rem] px-1"
              value={formValues.localAddress}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <div className="ml-[12rem] flex gap-2">
            <input
              type="checkbox"
              name="sameAsLocal"
              checked={formValues.sameAsLocal}
              onChange={handleInputChange}
            />
            <label htmlFor="sameAsLocal">
              Permanent address is the same as local address
            </label>
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="permanentAddress" className="w-36 mx-2">
              Permanent Address
            </label>
            <textarea
              name="permanentAddress"
              placeholder="Enter your permanent address"
              className="border w-[40rem] px-1"
              value={formValues.permanentAddress}
              onChange={handleInputChange}
              disabled={formValues.sameAsLocal}
            ></textarea>
          </div>
        </div>

        {/* Education Details */}
        <div className="Education-details border-2 border-gray-400 mx-2 mt-2 mb-5 rounded-lg">
          <h1 className="px-2 text-lg font-semibold bg-gray-400">Education Details</h1>
          <hr />
          <div className="flex gap-8 my-4">
            <label htmlFor="status" className="w-36 mx-2">
              Are you a
            </label>
            <div className="flex gap-10">
              <span className="flex gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Student"
                  checked={formValues.status === "Student"}
                  onChange={handleInputChange}
                />
                <label htmlFor="student">Student</label>
              </span>
              <span className="flex gap-2">
                <input
                  type="radio"
                  name="status"
                  value="Working Professional"
                  checked={formValues.status === "Working Professional"}
                  onChange={handleInputChange}
                />
                <label htmlFor="workingProfessional">Working Professional</label>
              </span>
            </div>
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="qualification" className="w-36 mx-2">
              Last Attended Qualification
            </label>
            <input
              type="text"
              name="qualification"
              placeholder="Enter your qualification"
              className="border w-[40rem] px-1 h-7"
              value={formValues.qualification}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="year" className="w-36 mx-2">
              Year
            </label>
            <input
              type="number"
              name="year"
              placeholder="Enter your completion year"
              className="border w-[40rem] px-1"
              value={formValues.year}
              onChange={handleInputChange}
            />
          </div>
          {formValues.status==="Student" && (<div className="flex gap-8 my-4">
            <label htmlFor="college" className="w-36 mx-2">
              College / University
            </label>
            <input
              type="text"
              name="college"
              placeholder="College / University"
              className="border w-[40rem] px-1"
              value={formValues.college}
              onChange={handleInputChange}
            />
          </div>)}
          
        </div>

        {/* Course Details */}
        <div className="Course-details border-2 border-gray-400 mx-2 mt-2 mb-5 rounded-lg">
          <h1 className="px-2 text-lg font-semibold bg-gray-400">Course Details</h1>
          <hr />
          <div className="flex gap-8 my-4">
            <label htmlFor="course" className="w-36 mx-2">
              Course
            </label>
            <select
              name="course"
              className="w-[40rem] border py-1"
              value={formValues.course}
              onChange={handleInputChange}
            >
              <option value="">Select</option>
              <option value="Full-Stack">Full-Stack</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="UI/UX">UI/UX</option>
            </select>
          </div>
          <div className="flex gap-8 my-4">
            <label htmlFor="source" className="mx-2">
              How did you come to <br /> know about us?
            </label>
            <div className="flex gap-10">
            <span className="flex gap-2 py-3">
                <input
                  type="radio"
                  name="source"
                  value="LinkedIn"
                  checked={formValues.source === "Google"}
                  onChange={handleInputChange}
                />
                <label htmlFor="Google">Google</label>
              </span>
              <span className="flex gap-2 py-3">
                <input
                  type="radio"
                  name="source"
                  value="LinkedIn"
                  checked={formValues.source === "LinkedIn"}
                  onChange={handleInputChange}
                />
                <label htmlFor="linkedin">LinkedIn</label>
              </span>
              <span className="flex gap-2 py-3">
                <input
                  type="radio"
                  name="source"
                  value="Instagram"
                  checked={formValues.source === "Instagram"}
                  onChange={handleInputChange}
                />
                <label htmlFor="instagram">Instagram</label>
              </span>
              <span className="flex gap-2 py-3">
                <input
                  type="radio"
                  name="source"
                  value="Friend"
                  checked={formValues.source === "Friend"}
                  onChange={handleInputChange}
                />
                <label htmlFor="friend">Friend</label>
              </span>
             
              
              <span className="flex gap-2 py-3">
                <input
                  type="radio"
                  name="source"
                  value="Other"
                  checked={formValues.source === "collegeTPO"}
                  onChange={handleInputChange}
                />
                <label htmlFor="other">College TPO</label>
              </span>
            </div>
          </div>

          <div>
              {formValues.source === "Friend" && (
            <span className="flex  gap-2 py-3">
              <label htmlFor="friendName" className="w-[10rem] mx-2">
                Friends Name
              </label>
              <input
                type="text"
                name="friendName"
                placeholder="Enter your friend's name"
                className="border w-[15rem]  h-7 ml-2"
                value={formValues.friendName}
                onChange={handleInputChange}
              />
            </span>
          )}
              </div>
              
<div className='flex gap-2'>
<p className='mx-2'>Do you agree to the terms and conditions?</p>


 <label className=" relative w-16 h-8 mb-2">
    <input
        type="checkbox"
        id="agree"
        name="agree"
        className="opacity-0 w-0 h-0"
        checked={isChecked}
        onChange={handleToggleChange}
    />
    <span
        className={`absolute top-0 left-0 w-full h-full rounded-full transition-all duration-300 ${isChecked ? 'bg-green-500' : 'bg-gray-400'
            }`}
    ></span>
    <span
        className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full transition-all duration-300 ${isChecked ? 'transform translate-x-8' : ''
            }`}
    ></span>
</label>
</div>

{showPopup && (
          <div className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="popup bg-white p-6 rounded shadow-lg text-center">
              <h2 className="text-3xl font-semibold mb-4">Terms and Conditions</h2>
              <p className=" text-xl my-1  text-left">
                You agree to the following :-
              </p>
              <div className='w-50 my-10 text-left'>
                
                  <li>You have understood the course content.</li>
                  <li>You have understood the course duration.</li>
                  <li>You have cleared all your doubts regarding the course,the content,and the duration.</li>
                  <li>Fees once paid is not refundable.</li>
                  <li>In case of uninformed leave, I will not be eligible for a backup.</li>
                  <li>7 days or more of leave without prior permission would result in termination of registration.</li>
        
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded"
                  onClick={handlePopupAgree}
                >
                  Agree
                </button>
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
                  onClick={handlePopupCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        </div>

        {/* Submit Button */}
        <div className="mx-4 text-center bg-sky-500 text-black my-4 rounded-lg">
        <button
    type="submit"
    value="Submit"
    disabled={!isChecked}
    className={`px-4 py-2 rounded ${isChecked
        ? 'bg-green-500 cursor-pointer w-full'
        : 'cursor-not-allowed'
        } text-white`}
          >Submit</button>
        </div>
      </form>
    </>
  );
}
export default App;




