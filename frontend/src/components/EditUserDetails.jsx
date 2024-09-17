import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import taost from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { setUser } from '../utils/userSlice'
import UploadFile from '../helpers/UploadFile'


const EditUserDetails = ({onClose,user}) => {
    const dispatch = useDispatch()
    const [profilePic, setProfilePic] = useState(null);
    const [data,setData] = useState({
        
        name : user?.name,
        profile_pic_url : user?.profile_pic_url
    })
    const profilePicRef = useRef(data?.profile_pic_url);
    const nameRef = useRef(null);
    
    useEffect(()=>{
        setData((preve)=>{
            return{
                ...preve,
            }
        })
    },[user])

    const handleOnChange = (e)=>{

        setData((preve)=>{
            return{
                ...preve,
                name : nameRef.current.value
            }
        })
    }
    const handleProfilePicChange = async(e) => {
        const file =  e.target.files[0]
        const uploadPhoto = await UploadFile(file)
        setProfilePic(URL.createObjectURL(e.target.files[0]))
        setData((preve)=>{
            return{
                ...preve,
                profile_pic_url: uploadPhoto?.url
            }
            })
      };

    const handleSubmit = async(e)=>{
        e.preventDefault()
        e.stopPropagation()
        try {
            const url = `${process.env.REACT_APP_BACKEND_URL}/api/update-user` 

            const response = await axios({
                method : 'post',
                url : url,
                data : data,
                withCredentials : true
            })

            console.log('response',response)
            taost.success(response?.data?.message)
            
            if(response.data.success){
                dispatch(setUser(response.data.data))
                onClose()
            }
         
        } catch (error) {
            console.log(error)
            taost.error()
        }
    }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex justify-center items-center z-10'>
        <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>
            <h2 className='font-semibold'>Profile Details</h2>
            <p className='text-sm '>Edit user details</p>

            <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='name'>Name:</label>
                    <input
                        type='text'
                        name='name'
                        ref={nameRef}
                        value={data.name}
                        onChange={handleOnChange}
                        className='w-full py-1 px-2 focus:outline-primary border-0.5'
                    />
                </div>

                <div>
                   
          <div className="flex flex-col">
            <label htmlFor="profilePic" className="text-sm font-medium text-gray-700">Profile Picture</label>
            <input
              id="profilePic"
              type="file"
              ref={profilePicRef} 
              accept="image/*"
              onChange={handleProfilePicChange}
              className="mt-1"
            />
            {profilePic && (
               
              <img
                src={profilePic}
                alt="Profile Preview"
                className="mt-2 w-24 h-24 object-cover rounded-full border border-gray-300"
              />
            )}
          </div>
                </div>

                <div className='flex gap-2 w-fit ml-auto '>
                    <button onClick={onClose} className='border-primary border text-primary px-4 py-1 rounded hover:bg-primary hover:text-white'>Cancel</button>
                    <button onClick={handleSubmit} className='border-primary bg-primary text-white border px-4 py-1 rounded hover:bg-secondary'>Save</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditUserDetails