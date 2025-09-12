import { useEffect, useState } from "react"
import { useParams } from "react-router"

const PostDetail = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)

    useEffect(()=>{
        fetch(`http://localhost:3000/posts/${id}`)
        .then(res => res.json())
        .then(data => setPost(data))
    },[id])

    return(
        <div className='p-4'>
          {!post ? (
            <p>Carregando...</p>
          ) : (
            <>
            <p> <img src={post.image} /> </p>
            <h1 className="text-xl font-bold">{post.title}</h1>
            <p>Views: {post.views}</p>
            <p>{post.description}</p>
            </>
          )}
        </div>
    )
}

export default PostDetail;