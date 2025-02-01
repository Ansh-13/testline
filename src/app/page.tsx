import QuizHome from "./QuizHome";

// fetching data from API
async function getdata() {
  const res = await fetch("https://api.jsonserve.com/Uw5CrX");
  return res.json();
}

export default async function Home() {
  const post = await getdata();
  //passing date fetch from api as props to the client component
  return <QuizHome post={post} />;
}
