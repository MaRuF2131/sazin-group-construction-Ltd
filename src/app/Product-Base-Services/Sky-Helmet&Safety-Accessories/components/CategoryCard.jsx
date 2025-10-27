import Image from "next/image";
import MotionCard from "../../../../utils/MotionForCategory";
import Link from "next/link";

export default function CategoryCard({  subCategories = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {subCategories.map((cat,indx) => (
        <MotionCard key={indx}>
                <Link
                    key={indx}
                    href={`/Product-Base-Services/Sky-Helmet&Safety-Accessories/${encodeURIComponent(cat?.category)}`}
                    prefetch={false}
                >
                    <Image
                        src={cat?.imageUrl}
                        alt={cat?.category}
                        width={500} // এখানে একটা width দিতে হবে
                        height={256} // height ও দিতে হবে (Next.js Image এর জন্য বাধ্যতামূলক)
                        className="w-full h-64 object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/10  flex items-center justify-center ">
                    <h3 className="text-white text-2xl font-bold group-hover:text-red-500">
                        {cat?.category?.toUpperCase()}
                    </h3>
                    </div>
                </Link>
            </MotionCard>
        ))}
   </div>
  );
}
