const leaders = [
  {
    name: "Afroza Pervin",
    role: "Chairman, Sazin Construction Ltd.",
    bio: `Afroza Pervin is an accomplished business leader with more than 15 years of experience in guiding organizational growth and development. Known for her modest personality and strong educational background, she brings a thoughtful and insightful approach to business leadership.
         Her strengths include exceptional communication skills, a deep understanding of corporate culture, and the ability to create a productive and positive work environment. Under her leadership, Sazin Construction Ltd. maintains a culture that supports efficiency, professionalism, and sustainable business expansion. Her strategic focus on new business development drives the company toward continuous improvement and long-term success.
        `,
    img: "/farjana.jpeg",
  },
  {
    name: "Md. Shahadut Hossain",
    role: "Managing Director, Sazin Construction Ltd.",
    bio: `Md. Shahadut Hossain is a visionary entrepreneur who began his construction career in 2007 through small government tenders. Over the years, he has expanded his expertise and built a strong reputation by successfully delivering numerous large-scale government infrastructure projects.
          His strategic thinking, strong leadership, and deep industry knowledge have been instrumental in the steady growth of Sazin Construction Ltd. Beyond construction, he has diversified his business portfolio into various sectors, including agro-based industries, reflecting his entrepreneurial foresight and commitment to national development.
       `,
    img: "/Md.ShahadutHossain.jpeg",
  },
  {
    name: "Engr. R.K. Azad (B.Sc. Engg. (EEE), RUET)",
    role: "Director, Sazin Construction Ltd.",
    bio: `Engr. R.K. Azad is a highly skilled electrical and electromechanical engineering professional, holding his B.Sc. in Electrical & Electronic Engineering from RUET, one of Bangladesh’s leading engineering institutions.
          He has extensive experience in managing and executing complex electromechanical projects across both government and private sectors. With strong engineering expertise, project management capability, and leadership qualities, he contributes significantly to the successful delivery of the company’s technical and infrastructure projects. His commitment to quality and innovation strengthens the technical backbone of Sazin Construction Ltd.
         `,
    img: "/Hossain.avif",
  },
  {
    name: "Engr. Sabbir Ahmed, BSc (IPE), MBA, CSCA",
    role: "Director, Business Development",
    bio: `Sabbir Ahmed is a strategic business development professional with strong expertise in manufacturing operations, supply chain management, and organizational efficiency. With a BSc in Industrial & Production Engineering (IPE) and an MBA, he combines technical insight with strategic leadership to drive sustainable growth.
          He has led major operational improvements, executed detailed feasibility studies, and supported business expansion across sectors including manufacturing, smart technology, energy, agro-industry, and industrial solutions. His strengths include building strategic partnerships, identifying new market opportunities, and guiding projects that enhance long-term value for the organization.
          As Director of Business Development, Sabbir plays a key role in shaping the company’s growth strategy and supporting its continued expansion into new and emerging markets.
          `,
    img: "/Hossain.avif",
  },
];

import Image from "next/image";

export default function Profiles() {
  return (
    <section className="bg-white dark:bg-neutral-950 py-16 px-6 lg:px-8">
      <h2 className="text-3xl font-semi-bold text-center dark:text-white">Our <span className="text-red-600">Leadership Team</span></h2>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {leaders.map((leader) => (
          <div
            key={leader.name}
            className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl p-6 shadow-sm hover:shadow-lg transition text-center"
          >
            <Image
              src={leader.img}
              alt={leader.name}
              width={200}
              height={200}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-red-600">{leader.name}</h3>
            <p className="font-medium text-neutral-700 dark:text-neutral-300">
              {leader.role}
            </p>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {leader.bio}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}