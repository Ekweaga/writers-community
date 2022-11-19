import React from 'react'
import {useRouter} from "next/router"

function PostDetail() {
    const router = useRouter()
    const id = router.query.postid
  return (
   <>
   <div className='text-black h-[100vh] bg-black'>{id}</div>
   </>
  )
}

export default PostDetail
