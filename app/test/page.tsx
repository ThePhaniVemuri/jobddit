// import { testapi, RedditPost } from "../../libs/test-helper";

// export default async function Page() {
//   const data = await testapi()
//   const posts = data.body
//   console.log(posts[0])
//   console.log("length of posts:", posts.length)

//   return (
//     <div>
//       <h1>Reddit API Test</h1>

//       {posts.map((post: RedditPost) => (
//         <li key={post.title}>
//           <h3>Title: {post.title}</h3>
//           <p>Description: {post.selftext}</p>
//           <p>Author: {post.author}</p>
//           <p>URL: {post.url}</p>
//           <br></br>
//         </li>
//       ))}
//     </div>
//   )
// }