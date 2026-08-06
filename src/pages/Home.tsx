import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  BadgeDollarSign,
  Building2,
  Globe2,
  Sprout,
  ShieldCheck,
  HeartHandshake,
  Warehouse,
  Megaphone,
} from "lucide-react";

import Banner from "../components/common/Banner";
import financeImg from "../assets/customer-img.png";

const businesses = [
  {
    name: "Indexia Finance",
    tag: "Financial Advisory",
    description:
      "Single-director financial consultancy focused on strategic planning, funding, and high-level financial decision-making.",
    color1: "#26ae90",
    color2: "#f2f231",
    image: financeImg,
    icon: BadgeDollarSign,
  },
  {
    name: "Indexia Finserve Pvt. Ltd.",
    tag: "Corporate Finance & Advisory",
    description:
      "Multi-director corporate finance arm offering investment planning, wealth management, and business solutions.",
    color1: "#f2f231",
    color2: "#7b7b7b",
    image: financeImg,
    icon: Building2,
  },
  {
    name: "Indexia Overseas Pvt. Ltd.",
    tag: "Global Trade & Logistics",
    description:
      "Cross-border trade and logistics solutions, symbolized by cargo ships and containers moving goods worldwide.",
    color1: "#7b7b7b",
    color2: "#26ae90",
    image: financeImg,
    icon: Globe2,
  },
  {
    name: "Indexia Agro Bio Fertilizers Pvt. Ltd.",
    tag: "Sustainable Agriculture",
    description:
      "Bio-fertilizer production and agricultural solutions, supporting farmers with sustainable, high-yield inputs.",
    color1: "#26ae90",
    color2: "#f2f231",
    image: financeImg,
    icon: Sprout,
  },
  {
    name: "Indexia Securities",
    tag: "Risk & Compliance",
    description:
      "Security and compliance services ensuring the protection of assets, data, and operations across the group.",
    color1: "#f2f231",
    color2: "#7b7b7b",
    image: financeImg,
    icon: ShieldCheck,
  },
  {
    name: "Indexia Foundation",
    tag: "Social Impact (NGO)",
    description:
      "Community-focused initiatives, education, and welfare programs driven by the Indexia Foundation.",
    color1: "#7b7b7b",
    color2: "#26ae90",
    image: financeImg,
    icon: HeartHandshake,
  },
  {
    name: "Indexia Warehouse",
    tag: "Logistics Infrastructure",
    description:
      "Large-scale warehousing and logistics facilities adjacent to key ports, enabling seamless supply-chain operations.",
    color1: "#26ae90",
    color2: "#f2f231",
    image: financeImg,
    icon: Warehouse,
  },
  {
    name: "Indexia Advertising",
    tag: "Brand & Media",
    description:
      "Strategic advertising and brand visibility solutions, showcased through high-impact media and outdoor campaigns.",
    color1: "#f2f231",
    color2: "#7b7b7b",
    image: financeImg,
    icon: Megaphone,
  },
];

const reasons = [
  {
    title: "Diversified Expertise",
    desc:
      "From finance and logistics to agro and advertising, we bring deep domain knowledge across multiple sectors.",
  },
  {
    title: "Integrated Solutions",
    desc:
      "Our group structure allows seamless collaboration between businesses for end-to-end solutions.",
  },
  {
    title: "Trust & Governance",
    desc:
      "Strong leadership, compliance frameworks, and a focus on long-term value creation.",
  },
  {
    title: "Growth-Oriented",
    desc:
      "Every business is built to scale — supporting clients, partners, and communities in their growth journey.",
  },
];

const Home = () => {
  return (
    <main className="bg-white">
      {/* Hero */}
      <Banner title="Indexia Group" description="Multi-business group" />

      {/* Intro Section */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#066a9c] sm:text-4xl">
              One Group. Multiple Solutions.
            </h2>
            <p className="mt-4 text-base leading-7 text-[#7b7b7b]">
              Indexia Group is a diversified holding of companies spanning finance, trade, agriculture, logistics,
              securities, social impact, and advertising. We build businesses that empower clients, partners, and
              communities to grow with confidence.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center rounded-full bg-[#26ae90] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(38,174,144,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#1e9478]"
              >
                Explore Our Businesses
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center rounded-full border-2 border-[#066a9c] px-6 py-3 text-sm font-bold text-[#066a9c] transition-all duration-200 hover:bg-[#066a9c] hover:text-white"
              >
                About Indexia
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Businesses Grid */}
      <section className="relative bg-[#f8fafc]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#066a9c] sm:text-4xl">
              Our Businesses
            </h2>
            <p className="mt-4 text-base leading-7 text-[#7b7b7b]">
              Each company under the Indexia umbrella is designed to solve specific challenges while contributing to
              a larger, integrated ecosystem.
            </p>
          </div>

          <div
            className="
        mt-12 grid gap-5
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        lg:auto-rows-[170px]
      "
          >
            {businesses.map((biz, index) => {
              const Icon = biz.icon;
              const filterId = `gooey-${index}`;

              const desktopPositions = [
                "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
                "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-3",
                "lg:col-start-4 lg:col-end-5 lg:row-start-1 lg:row-end-2",
                "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
                "lg:col-start-2 lg:col-end-3 lg:row-start-2 lg:row-end-3",
                "lg:col-start-4 lg:col-end-5 lg:row-start-2 lg:row-end-3",
                "lg:col-start-1 lg:col-end-3 lg:row-start-3 lg:row-end-4",
                "lg:col-start-3 lg:col-end-5 lg:row-start-3 lg:row-end-4",
              ];

              return (
                <motion.div
                  key={biz.name}
                  initial="rest"
                  whileHover="hover"
                  className={`group relative min-h-[230px] overflow-hidden rounded-2xl border border-white/60 bg-white shadow-sm transition-shadow duration-500 hover:shadow-xl lg:min-h-0 ${desktopPositions[index]}`}
                >
                  {/* Card image */}
                  {biz.image && (
                    <img
                      src={biz.image}
                      alt={`${biz.name} visual`}
                      className="
            absolute inset-0 h-full w-full object-cover
            transition-transform duration-700
            group-hover:scale-105
          "
                    />
                  )}

                  {/* SVG gooey filter */}
                  <svg
                    className="absolute h-0 w-0"
                    aria-hidden="true"
                  >
                    <defs>
                      <filter
                        id={filterId}
                        x="-50%"
                        y="-50%"
                        width="200%"
                        height="200%"
                        colorInterpolationFilters="sRGB"
                      >
                        <feGaussianBlur
                          in="SourceGraphic"
                          stdDeviation="18"
                          result="blur"
                        />

                        <feColorMatrix
                          in="blur"
                          mode="matrix"
                          values="
                1 0 0 0 0
                0 1 0 0 0
                0 0 1 0 0
                0 0 0 32 -14
              "
                          result="goo"
                        />
                      </filter>
                    </defs>
                  </svg>

                  {/* Default dark overlay */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-10 bg-black/25"
                    variants={{
                      rest: {
                        opacity: 1,
                      },
                      hover: {
                        opacity: 0,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* Two animated blobs */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
                    variants={{
                      rest: {
                        opacity: 0,
                      },
                      hover: {
                        opacity: 1,
                      },
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <div
                      className="absolute inset-0"
                      style={{
                        filter: `url(#${filterId})`,
                        isolation: "isolate",
                      }}
                    >
                      {/* Top-left blob */}
                      <motion.div
                        className="absolute h-56 w-56 rounded-full"
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: "-7rem",
                          marginTop: "-7rem",
                          backgroundColor: biz.color1,
                          mixBlendMode: "screen",
                        }}
                        variants={{
                          rest: {
                            x: "-125%",
                            y: "-125%",
                            scale: 0.9,
                          },
                          hover: {
                            x: "0%",
                            y: "0%",
                            scale: 3,
                          },
                        }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />

                      {/* Bottom-right blob */}
                      <motion.div
                        className="
              absolute h-56 w-56 rounded-full
            "
                        style={{
                          left: "50%",
                          top: "50%",
                          marginLeft: "-7rem",
                          marginTop: "-7rem",
                          backgroundColor: biz.color2,
                          mixBlendMode: "screen",
                        }}
                        variants={{
                          rest: {
                            x: "125%",
                            y: "125%",
                            scale: 0.9,
                          },
                          hover: {
                            x: "0%",
                            y: "0%",
                            scale: 3,
                          },
                        }}
                        transition={{
                          duration: 0.9,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </motion.div>

                  {/* Final blended gradient wash */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-30"
                    variants={{
                      rest: {
                        opacity: 0,
                      },
                      hover: {
                        opacity: 0.3,
                      },
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.25,
                    }}
                    style={{
                      background: `radial-gradient(
            circle at center,
            ${biz.color1} 0%,
            rgba(6, 106, 156, 0.8) 48%,
            rgba(4, 78, 116, 0.95) 100%
          )`,
                    }}
                  />

                  {/* Bottom readability gradient */}
                  <motion.div
                    className="
          pointer-events-none absolute inset-x-0 bottom-0
          z-40 h-44
          bg-gradient-to-t from-black/75 via-black/30 to-transparent
        "
                    variants={{
                      rest: {
                        opacity: 1,
                      },
                      hover: {
                        opacity: 0,
                      },
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                  />

                  {/* Card content */}
                  <div className="relative z-50 flex h-full flex-col justify-between p-5">
                    {/* Tag and icon */}
                    <motion.div
                      className="flex items-start justify-between gap-3"
                      variants={{
                        rest: {
                          opacity: 1,
                          y: 0,
                        },
                        hover: {
                          opacity: 0,
                          y: -15,
                        },
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/85">
                        {biz.tag}
                      </p>

                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm">
                        <Icon
                          size={20}
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                      </div>
                    </motion.div>

                    {/* Business name */}
                    <motion.h3
                      className="mt-auto max-w-[90%] text-xl font-extrabold leading-tight text-white"
                      variants={{
                        rest: {
                          opacity: 1,
                          y: 0,
                        },
                        hover: {
                          opacity: 0,
                          y: 15,
                        },
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      {biz.name}
                    </motion.h3>

                    {/* Description shown after blobs merge */}
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-[60] flex items-center justify-center p-6 text-center"
                      variants={{
                        rest: {
                          opacity: 0,
                          y: 25,
                          scale: 0.9,
                        },
                        hover: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        },
                      }}
                      transition={{
                        duration: 0.55,
                        delay: 0,
                        ease: "easeOut",
                      }}
                    >
                      <p className="max-w-md text-sm font-medium leading-6 text-white drop-shadow-lg">
                        {biz.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/services"
              className="inline-flex items-center rounded-full bg-[#066a9c] px-6 py-3 text-sm font-bold text-white shadow-[0_4px_16px_rgba(6,106,156,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#055780]"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Indexia */}
      <section className="relative bg-[#044e74] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Why Partner With Indexia?
            </h2>

            <p className="mt-4 text-base leading-7 text-white/80">
              Our group approach combines specialization with collaboration,
              delivering more value than any single business could on its own.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, idx) => (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.06,
                  y: -8,
                }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  opacity: {
                    duration: 0.5,
                    delay: idx * 0.08,
                  },
                  y: {
                    duration: 0.5,
                    delay: idx * 0.08,
                  },
                  scale: {
                    duration: 0.3,
                    ease: "easeOut",
                  },
                }}
                className="
            group relative min-h-[190px]
            overflow-hidden rounded-2xl
            border border-white/15
            bg-white/5 p-6
            backdrop-blur-sm
            will-change-transform
          "
              >
                {/* Animated gradient overlay */}
                <div
                  className="
              pointer-events-none absolute inset-0 z-0
              bg-[length:220%_220%]
              bg-[position:0%_0%]
              opacity-0
              transition-[opacity,background-position]
              duration-700
              ease-in-out
              group-hover:bg-[position:100%_100%]
              group-hover:opacity-100
            "
                  style={{
                    backgroundImage: `
                linear-gradient(
                  135deg,
                  #26ae90 0%,
                  #066a9c 50%,
                  #f2f231 100%
                )
              `,
                  }}
                />

                {/* Soft glow */}
                <div
                  className="
              pointer-events-none absolute inset-0 z-10
              opacity-0 blur-2xl
              transition-opacity duration-700
              group-hover:opacity-40
            "
                  style={{
                    background:
                      "radial-gradient(circle at center, #26ae90 0%, transparent 65%)",
                  }}
                />

                {/* Content */}
                <div className="relative z-20">
                  <h3 className="text-base font-bold text-[#f2f231] transition-colors duration-500 group-hover:text-white">
                    {r.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/80 transition-colors duration-500 group-hover:text-white/95">
                    {r.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#066a9c] sm:text-4xl">
              Ready to Explore What Indexia Can Do for You?
            </h2>
            <p className="mt-4 text-base leading-7 text-[#7b7b7b]">
              Whether you need financial advisory, logistics support, agricultural solutions, or brand-building
              services, our group has the right experts for the job.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center rounded-full bg-[#f2f231] px-6 py-3 text-sm font-bold text-[#1f2000] shadow-[0_4px_16px_rgba(242,242,49,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#f7f75f]"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center rounded-full border-2 border-[#066a9c] px-6 py-3 text-sm font-bold text-[#066a9c] transition-all duration-200 hover:bg-[#066a9c] hover:text-white"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;