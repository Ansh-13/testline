import QuizHome from "./QuizHome";

async function getdata() {
  const res = await fetch("https://api.jsonserve.com/Uw5CrX");
  return res.json();
}

export default async function Home() {
  const post = await getdata();
  return <QuizHome post={post} />;
}
