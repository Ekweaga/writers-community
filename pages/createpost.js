import React,{useContext,useState} from 'react'
import Head from 'next/head'
import {firebaseapp} from "./components/firebase"
import {getFirestore} from "firebase/firestore"
import {getAuth} from  "firebase/auth";
import {setDoc,doc} from "firebase/firestore"
import { updateDoc,arrayUnion, onSnapshot } from "firebase/firestore"; 
import { getStorage, ref, getDownloadURL, deleteObject, uploadBytesResumable } from "firebase/storage";
import { Auth } from './components/Context';

function Createpost() {
const [title,setTitle] = useState('')
const [post,setPost] = useState('')
const projectfirestore = getFirestore(firebaseapp)
const auth = getAuth(firebaseapp)
 
const [url,setUrl] = useState('')
const [loading,setLoading] = useState(false)
const [progress,setProgress] = useState(null)
const [count,setCount] = useState(0)


const Upload = (e)=>{
  setLoading(true);
  const file = e.target.files[0]
  const storageref = ref(projectstorage,`images/${user?.email}-${file.name}`);
  const uploadTask = uploadBytesResumable(storageref, file);
  
  uploadTask.on("state_changed", (snapshot)=>{
    const uploadprogress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setProgress(uploadprogress)
  },  (error) => {
    // Handle unsuccessful uploads
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      setUrl(downloadURL)
      setLoading(false)
    });
  }
  )
}

  const posts = async ()=>{
    const postCount = 0
    if(!url){
      setError("Upload an image to content");
      retun;
    }
    updateDoc(doc(projectfirestore,"singleUserPosts",`${user?.email}`),{
      savePosts:arrayUnion({
          title:title,
          post:post,
          imageUrl:url,
          count:postCount + 1,
          userId:user.id
      })
    })
    setDoc(
      doc(projectfirestore, "posts",user.uid),{
       title:title,
       post:post,
        id:user.uid,
        imageUrl:url
      });
      setPost('')
      setTitle('')
    }
  
  

  return (
  <>
    <Head>
        <title>Create a story </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
  <div className='h-[100vh] flex flex-col items-center justify-center gap-[30px]'>
    <div className='flex flex-col gap-[10px]  '>
        <label className="text-1xl font-bold">Title</label>
        <input type="text" placeholder='Give a Title' className='border border-2-gray p-2 md:w-[600px] focus:outline-[#D1358F] w-[330px]' value={title} onChange={(e)=>setTitle(e.target.value)}/>
    </div>

    <div className='flex flex-col gap-[10px]  '>
        <label className="text-1xl font-bold">Write your story</label>
       <textarea  placeholder="Create a Post"  className='border border-2-gray p-2 md:w-[600px] focus:outline-[#D1358F] h-[300px] w-[350px]' value={post} onChange={(e)=>setPost(e.target.value)}/>
    </div>

    <div className='md:-ml-[450px] bg-[#BB49B0] text-white rounded p-2'>
      <input type="file" id="for" className="hidden" onChange={Upload}/>
      <label for="for" className="cursor-pointer">Add Image To Content</label>
    </div>
<div>
<button className="bg-[#D1358F] p-2 w-[300px] rounded mt-[15px] text-white" onClick={posts}>Submit</button>
</div>
  </div>
  
  </>
  )
}

export default Createpost