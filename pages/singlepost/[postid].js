import React,{useEffect,useState} from 'react'
import {useRouter} from "next/router"
import {collection,doc,getDoc,getDocs,orderBy,query,getFirestore} from "firebase/firestore"
import {firebaseapp} from "../components/firebase"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function PostDetail() {
    const router = useRouter()
    const id = router.query.postid
    const [postDetails,setpostDetails] = useState({})
    const projectfirestore = getFirestore(firebaseapp)
    const [user, setUser] = useState({})

    const getUserInfo = async ()=>{
      if(id){
        const UserInfo = doc(projectfirestore,"users", id);
        const UserSnap = await getDoc(UserInfo)
  
        if(UserSnap.exists()){
          setUser(UserSnap.data())
                return UserSnap.data();
               
        }
  
        else{
              
                setUser({})
        }
      }

      else{
        alert("not found")
      }
    }
    const getPostInfo = async ()=>{
      if(id){
        const videoInfo = doc(projectfirestore,"posts", id);
        const videoSnap = await getDoc(videoInfo)
  
        if(videoSnap.exists()){
          setpostDetails(videoSnap.data())
                return videoSnap.data();
               
        }
  
        else{
              
                setpostDetails({})
        }
      }

      else{
        alert("not found")
      }
     
}


    useEffect(()=>{
           getPostInfo();
           getUserInfo();
    })
  return (
   <>
   <Navbar/>
   <div className='text-black h-[100vh] bg-white mt-[120px] ml-[150px] '>
    <div className='w-[700px]'>
  
   <h1 className="text-3xl font-bold mb-[20px]">{postDetails?.title}</h1>
   <div>
    <p>{postDetails?.post}</p>
   </div>
      </div>
      <div className='mt-[20px]'>
        <div>Author:
          <h3 className="font-bold">{user?.Name}</h3>
        <p>{user?.Email}</p>
        </div>
      </div>
   </div>

   <Footer/>
   </>
  )
}

export default PostDetail
