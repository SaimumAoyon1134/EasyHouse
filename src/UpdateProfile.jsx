import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'
import "animate.css";
import toast, { Toaster } from "react-hot-toast";


const UpdateProfile = () => {
  const navigate = useNavigate()

  const {update,isLoading} =useContext(AuthContext)
  const handleSubmit = (e) => { 
    e.preventDefault()
    const name = e.target.name.value;
    const image = e.target.image.value;
    update(name, image)
    toast.success("Updated Successfully!!");
    e.target.reset()

   setTimeout(() => {
     navigate("/myprofile");
   }, 1000);



  }

  return (
    <div className="hero my-auto  animate__animated animate__fadeInDown">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className='text-2xl mt-2 text-center font-bold'>Update Your Profile</h1>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                className="input"
                placeholder="Your Name"
                name="name"
                required
              />
              <label className="label">Image</label>
              <input
                type="text"
                className="input"
                placeholder="Your Image URL"
                name="image"
                required
              />

              <button className="btn btn-neutral mt-4">Update </button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile
