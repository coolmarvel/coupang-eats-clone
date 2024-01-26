import { useSession } from 'next-auth/react';

export default function Home() {
  // const { data } = useSession();

  return (
    <>
      <div className="pb-16">
        <h3 className="pl-8 text-xl font-bold">골라먹는 맛집</h3>
      </div>
    </>
  );
}
