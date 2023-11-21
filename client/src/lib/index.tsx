import { Wrapper } from "../components";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Wrapper variant="regular">
      <div>Hellwefwefo</div>
      {!data ? (
        <div>Loading...</div>
      ) : (
        data.posts.map((p) => <div key={p.id}>{p.title}</div>)
      )}
    </Wrapper>
  );
};

export default Index;
