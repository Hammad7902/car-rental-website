import React from "react";

const testimonialData = [
  {
    name: "Muhammad osama",
    image: "",
    description: "This was one of the best experiences. I had problems at the airport and the driver stayed I would recommend this company to anyone. Thank you for such fabulous service!",
    aosDelay: "0",
  },
  {
    name: "Hammad",
    image: "",
    description: "Ich möchte mich für den super Service Ihrer Fahrer/in bedanken. Das war Klasse, sehr flexibel und absolut empfehlenswert!",
    aosDelay: "300",
  },
  {
    name: "faizan",
    image: "",
    description: "We were very pleased with the service and would happily use it again when we are next in Karachi",
    aosDelay: "1000",
  },
];
const Testimonial = () => {
  return (
    <>
      <span id="about"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:pb-24">
        <div className="container">
          {/* Header */}
          <div className="space-y-4 pb-12">
            <p
              data-aos="fade-up"
              className="text-3xl font-semibold text-center sm:text-4xl font-serif"
            >
              What Our Clients Say About Us
            </p>
            <p data-aos="fade-up" className="text-center sm:px-44">
              Our clients rave about our top-notch service, affordable rates, and seamless car rental experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-black dark:text-white">
            {testimonialData.map((skill) => (
              <div
                key={skill.name}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center group space-y-3 sm:space-y-6 p-4 sm:py-12 dark:bg-white/20 bg-gray-100 duration-300  rounded-lg "
              >
                <div className="grid place-items-center ">
                  <img
                    src="https://picsum.photos/200"
                    alt=""
                    className="rounded-full w-20 h-20"
                  />
                </div>
                <div className="text-2xl">⭐⭐⭐⭐⭐</div>
                <p>{skill.description}</p>
                <p className="text-center font-semibold">{skill.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial;
