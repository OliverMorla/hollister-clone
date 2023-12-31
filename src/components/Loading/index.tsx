import Image from "next/image";

const Loading = () => {
  return (
    <main className="flex justify-center items-center h-screen bg-white absolute w-full z-20">
      <Image
        src="/assets/loading/loading.svg"
        alt=""
        width={255}
        height={255}
      />
    </main>
  );
};

const LoadingWithoutBg = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white relative w-full z-20">
      <Image
        src="/assets/loading/loading.svg"
        alt=""
        width={255}
        height={255}
      />
    </div>
  );
};

export { Loading, LoadingWithoutBg };
