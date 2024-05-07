import React, { useRef } from 'react';
import Progress from './Progress';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';

const Form2 = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  handleFormChange,
  form,
  profilePicture,
  setProfilePicture,
  securityQuestion1,
  setSecurityQuestion1,
  securityQuestion2,
  setSecurityQuestion2,
  securityQuestion3,
  setSecurityQuestion3,
  securityAnswer1,
  setSecurityAnswer1,
  securityAnswer2,
  setSecurityAnswer2,
  securityAnswer3,
  setSecurityAnswer3,
}) => {
  const fileInputRef = useRef(null);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    fileInputRef.current.click();
  };

  const validateForm = () => {
    if (profilePicture === '' || firstName === '' || lastName === '' || securityQuestion1 === '' || securityQuestion2 === '' || securityQuestion3 === '' || securityAnswer1 === '' || securityAnswer2 === '' || securityAnswer3 === '') {
      alert('Please fill out all fields');
    } else {
      handleFormChange('next');
    }
  };

  const securityQuestions = [
    "What was the name of your first pet?",
    "In which city were you born?",
    "What is your favorite movie?",
    "What is the name of your maternal grandmother?",
    "What was the make and model of your first car?",
    "What is your favorite food?",
    "What street did you grow up on?",
    "What is the name of your favorite teacher?",
    "What is the name of your childhood best friend?",
    "What is your favorite vacation destination?",
  ];

  return (
    <div>
      <div>
        <p className="text-h3 mb-6 font-bold text-white text-center">Setup Profile</p>
        <Progress form={form} />
        <div className="text-center relative">
          <label htmlFor="file-input">
            <div className="relative inline-block">
              <img
                src={profilePicture || 'placeholder.jpg'}
                alt="Profile Picture"
                className="editable-image w-48 h-48 rounded-full mx-auto mb-4 cursor-pointer transition duration-300 ease-in-out transform"
                onClick={handleImageClick}
              />
              <div className="absolute bottom-5 right-2">
                <div className="bg-gray-500 rounded-full w-10 h-10 flex items-center justify-center cursor-pointer">
                  <AddAPhotoIcon style={{ color: 'white' }} />
                </div>
              </div>
            </div>
          </label>
          <input
            id="file-input"
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileInputChange}
          />
        </div>
        <input type="text" placeholder="First Name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        <input type="text" placeholder="Last Name" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={lastName} onChange={(e) => setLastName(e.target.value)} />

        {/* Selector for Security Question 1 */}
        <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setSecurityQuestion1(e.target.value)}>
          <option disabled={securityQuestion1 !== ""} selected={securityQuestion1 === ""}>Select Security Question 1</option>
          {securityQuestions.map((question, index) => (
            question !== securityQuestion2 && question !== securityQuestion3 && (
              <option key={index} value={question}>{question}</option>
            )
          ))}
        </select>
        {/* Input for Security Question 1 Answer */}
        <input type="text" placeholder="Answer to Security Question 1" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={securityAnswer1} onChange={(e) => setSecurityAnswer1(e.target.value)} />

        {/* Selector for Security Question 2 */}
        <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setSecurityQuestion2(e.target.value)}>
          <option disabled={securityQuestion2 !== ""} selected={securityQuestion2 === ""}>Select Security Question 2</option>
          {securityQuestions.map((question, index) => (
            question !== securityQuestion1 && question !== securityQuestion3 && (
              <option key={index} value={question}>{question}</option>
            )
          ))}
        </select>
        {/* Input for Security Question 2 Answer */}
        <input type="text" placeholder="Answer to Security Question 2" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={securityAnswer2} onChange={(e) => setSecurityAnswer2(e.target.value)} />

        {/* Selector for Security Question 3 */}
        <select className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" onChange={(e) => setSecurityQuestion3(e.target.value)}>
          <option disabled={securityQuestion3 !== ""} selected={securityQuestion3 === ""}>Select Security Question 3</option>
          {securityQuestions.map((question, index) => (
            question !== securityQuestion1 && question !== securityQuestion2 && (
              <option key={index} value={question}>{question}</option>
            )
          ))}
        </select>
        {/* Input for Security Question 3 Answer */}
        <input type="text" placeholder="Answer to Security Question 3" className="w-full p-2 border border-gray-300 rounded-lg mb-4 text-black" value={securityAnswer3} onChange={(e) => setSecurityAnswer3(e.target.value)} />

        <div className='flex'>
          <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" onClick={() => handleFormChange('back')}>
            Go Back
          </button>
          <button className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateForm}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Form2;
