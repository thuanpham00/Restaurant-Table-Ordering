import Image from "next/image";

export default function Home() {
  return (
    <div className="w-full space-y-4">
      <div className="relative w-full h-100 z-[-1]">
        <span className="absolute top-0 left-0 w-full h-full bg-black opacity-50 z-10"></span>
        <Image
          src="/images/restaurant_banner.png"
          width={800}
          height={400}
          quality={100}
          alt="Banner"
          className="absolute top-0 left-0 w-full h-full object-cover rounded-xl"
        />
        <div className="z-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white">
          <h1 className="text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold">
            Smart Restaurant
          </h1>
          <p className="text-center text-sm sm:text-base mt-4">Gọi món thông minh - trải nghiệm tinh tế</p>
        </div>
      </div>

      <section className="space-y-10 mt-16">
        <h2 className="text-center text-2xl font-bold">Đa dạng các món ăn</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {Array(4)
            .fill(0)
            .map((_, index) => (
              <div className="flex gap-4 w" key={index}>
                <div className="shrink-0">
                  <Image
                    alt={index.toString()}
                    src="/images/food_example.jpg"
                    width={150}
                    height={150}
                    className="object-cover w-37.5 h-37.5 rounded-md"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-semibold">Bánh mì</h3>
                  <p className="">Bánh mì sandwidch</p>
                  <p className="font-semibold">123,123đ</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
