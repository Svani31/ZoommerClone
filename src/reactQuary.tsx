import {useQuery} from "@tanstack/react-query";

const Users = [
  { id: 0, name: "giorgi" },
  { id: 1, name: "vato" },
  { id: 2, name: "zura" },
];

const wait = (duration: any) => {
  return new Promise((resolve) => setTimeout(resolve, duration));
};

const React = () => {
  const postUser = useQuery({
    queryKey: ["users"],
    queryFn: () => wait(1000).then(() => [...Users]),
  });


  if (postUser.isLoading) return <h1>Loading...</h1>;
  if (postUser.error) return <h1>Error</h1>;

  return (
    <div>
      {postUser.data?.map((user) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </div>
  );
};

export default React;
