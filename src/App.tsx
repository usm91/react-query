import { useQuery, useMutation } from "@tanstack/react-query"

const POSTS = [
  { id: 1, title: "POST 1" },
  { id: 2, title: "POST 2" }
]

function App() {
  const postQuery = useQuery({
    // query key is a unique identifier which we provide and has to be an array
    queryKey: ["posts"],
    // function which we want to run with query
    // this can be fetch/axios whatever we want to use to fetch data
    queryFn: () => wait(1000).then(() => [...POSTS])
    // throwing error intentionally to check the error state defined in pre tag
    // react query retries the function 3 times , if it fails to fetch data
    // than it will throw the error
    // queryFn: () => Promise.reject("Some Error")
  })
  // Here we can write if checks to get isLoading and hasError States
  if (postQuery.isLoading) return <h1>Loading data...</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>
  return (
    <>
      {postQuery.data.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </>
  )
}

function wait(duration: number) {
  return new Promise((resolve) => setTimeout(resolve, duration))
}

export default App
