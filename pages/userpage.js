import React,{useState,useEffect,useContext} from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
import { collection,   onSnapshot,query } from "firebase/firestore";
import {firebaseapp} from "./components/firebase"
import {getFirestore} from "firebase/firestore"
import { Auth } from './components/Context';
import Link from "next/link"

function Userpage() {
  const [posts,setPosts] = useState([])
  const [loading,setLoading] = useState(false)
  const {user} = useContext(Auth)

  const getUserPost = async ()=>{
    setLoading(true)
    try{
      await onSnapshot(doc(projectfirestore, "singleUserPosts", `${user?.email}`), (doc) => {
          
           setLoading(false)
            setPosts(doc.data()?.savedPosts)
          
        });
          } 
         catch(err){
          console.log(err.message)
        }
  }

  useEffect(()=>{
    getUserPost();
  },[])
  return (
   <>
   <div className='grid grid-cols-2 '>

    <div className='bg-[#BB49B0] w-[150px] h-[100vh] p-2 relative' style={{zIndex:33}}>
      <h1 className="font-bold text-2xl text-white">MELODAX</h1>

      <div className="text-white flex items-center justify-center p-2 mt-[100px]">
        <ul className='flex flex-col gap-[20px]'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/melodax'>Community</Link></li>
          <li>Preview Contents</li>
          <li>Archived</li>
          <li>Starred</li>
          <li><Link href='/createpost'>Post Content</Link></li>
        </ul>
      </div>

      <div className='bottom-[50px] absolute text-center text-white flex items-center justify-center border-[1px] border-white p-2 w-[100px] left-[10px]'>Logout</div>
    </div>
    <div>
      <div className='shadow-md h-[50px] w-[100%]  absolute left-0 right-0'></div>
      <div className='mt-[100px]'><h1 className='font-bold'>Your Stories</h1></div>


{
  posts < 1 ? (<div className='mt-[150px]'>No stories added<br/><span className="text-[#BB49B0]"><Link href='/createpost'>Create a story</Link></span></div>):(
    <div className='mt-[50px]   '>

    {
      loading ? (<div className=" text-2xl"><p>Loading stories...</p></div>):(
        <div className=' md:ml-[150px] grid grid-cols-1 md:grid-cols-4 gap-[30px]'>
  {posts.map((item)=>{
    return(
   <div  key={item.id} className=" w-[300px]"> <h1 className="text-2xl font-bold">
  
    {item?.title}</h1>
    <div><Image src={item.Imageurl? item.imageUrl : null} width={300} height={300} alt="image"/></div>
   <p className="text-sm w-[100px] ">{item?.post.substring(0,100)}....</p>
   <span className="cursor-pointer text-[#E23972]"><Link href={`/singlepost/${item?.id}`}>Read more</Link></span></div>
    )
  })}
  </div>
      )
}

  </div>
  )
}
     
    </div>
   </div>
   </>
  )
}

export default Userpage