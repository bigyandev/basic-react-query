
import './App.css';
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query';


const posts = [
  {id:1, title:"post 1"},
  {id:"2", title: "post 2"}
]
const wait = (duration) => {
  return new Promise(resolve => setTimeout(resolve, duration))
}
function App() {
  const queryClient = useQueryClient()
  const postQuery = useQuery({
    queryKey: ["post"],
    queryFn: () => wait(1000).then(() => [...posts]) 
  })

  const newPostMutation = useMutation({
    mutationFn: title => wait(1000).then(() => posts.push({id:crypto.randomUUID(),title})),
    onSuccess: () => {
      queryClient.invalidateQueries(["post"])
  }
  })

  if(postQuery.isLoading) return <h1>...loading</h1>
  if(postQuery.error) return <h1>{postQuery.error}</h1>
  return (
    <>
    {postQuery.data.map((post) => {
        return  <div key={post.id}>{post.title}</div>
    })}
    <button onClick={() => newPostMutation.mutate("new post")}>click</button>
    </>
  )
  
}

export default App;
