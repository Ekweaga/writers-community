import React,{useState} from 'react'
import {useRouter} from "next/router"
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import {createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import {firebaseapp} from "./components/firebase"
import {getFirestore} from "firebase/firestore"
import {getAuth} from  "firebase/auth";
import {setDoc,doc} from "firebase/firestore"
import{FcGoogle} from 'react-icons/fc'

function Signup() {

  const [error,setError] = useState(null)
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [success,setSuccess] = useState(null)
    const [name,setName] = useState('')
    const router = useRouter();
    const provider = new GoogleAuthProvider();
    const projectfirestore = getFirestore(firebaseapp)
    const auth = getAuth(firebaseapp)

    const signUpGoogle = async ()=>{
      await signInWithPopup(auth,provider).then((result)=>{
        router.push("melodax")
      }).catch((err)=>{
        setError(err.message)
      })
    }
    const  signupUser = async (e)=>{
      e.preventDefault();
     // setLoading(true)
  
      if(email === "" || password === "" || name === ""){
        setError("Fields are empty")
      
    
        //setLoading(false)
      }
      else if(password.length < 6){
        setError("Password characters must be greater than 6")
       // setLoading(false)
      }
     else{
      try{
         // setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password).then((response)=>{
          console.log(response.user.refreshToken)
        //  localStorage.setItem('token', JSON.stringify(response.user.refreshToken))
        console.log(response)
     setDoc(
          doc(projectfirestore, "users",response.user.uid),{
            Name:name,
            Email:email,
            id:response.user.uid
          });
          
        });
      setDoc(doc(projectfirestore,'singleUser', `${email}`),{
        saveShows:[]
       })
      
     //  setLoading(false)
       setSuccess("Your Account is created successfully")
          setEmail('')
          setPassword('')
       setTimeout(()=>{
       router.push('login')
       },1000)
     }
     catch(err){
     setError(err.message)
     console.log(err)
    // setLoading(false)
     }
     }
  
  }


  return (
    <>
     <Head>
        <title>Our Sign Up Page </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className="h-[100vh] mt-[160px] relative">
           
           <div className="flex items-center flex-col justify-center mt-[80px] w-full">
           {error?(<div className='flex items-center justify-center text-red-600 border border-red-600  w-[300px] p-2'><p>{error}</p></div>):null}
                   {success?(<div className="text-green-300 flex items-center justify-center"><p>{success}</p></div>):null}
           <h2 className="text-black p-3 text-3xl text-left">Sign Up</h2>
               <form className="flex flex-col gap-4" onSubmit={signupUser}>

               <div className="w-full"><input type="text" placeholder="Your Name" value={name} className='p-2 w-[300px] rounded focus:outline-none text-black  border-[#FFFF] border-2 mb-[20px] shadow'  onChange={(e)=>setName(e.target.value)}/></div>
                   <div className="w-full"><input type="email" placeholder="Email" value={email} className='p-2 w-[300px] rounded focus:outline-none text-black  border-[#FFFF] border-2 mb-[20px] shadow'  onChange={(e)=>setEmail(e.target.value)}/></div>
                   <div><input type="password" placeholder="Password" value={password} className='p-2 w-[300px] rounded focus:outline-none text-black shadow  border-[#FFFF] border-2'  onChange={(e)=>setPassword(e.target.value)}/></div>
                
                   <div><button className="bg-[#D1358F] p-2 w-[300px] rounded mt-[15px] text-white">Submit</button></div>
                   <div className='flex items-center justify-center '>
                    Or
                   </div>
                  
               </form>
               <div className='flex items-center justify-center  border-2 border-[#D1358F] p-2'>
                    <button className="flex flex-row-reverse gap-[0px]cursor-pointer justify-center items-center" onClick={signUpGoogle}>SignInWithGoogle <FcGoogle className='w-[50px]'/></button>
                   </div>
              
           
               <div className='py-2'>Already have an account? <span className="text-[#D1358F]"><Link href="login">Login</Link></span> <span></span> </div>
           </div>

          

        

       </div>
       </>
  )
}

export default Signup
