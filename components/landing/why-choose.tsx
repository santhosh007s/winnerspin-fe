export function WhyChoose() {
  // const reasons = [
  //   {
  //     title: "Flexible & Accessible",
  //     description: "Savings plans designed for everyone, with flexible payment options tailored to your lifestyle",
  //     icon: "🎯",
  //     gradient: "from-yellow-500/20 to-orange-500/10",
  //   },
  //   {
  //     title: "Fair & Transparent",
  //     description: "Lucky draws conducted with complete transparency and integrity you can trust",
  //     icon: "✨",
  //     gradient: "from-orange-500/20 to-yellow-500/10",
  //   },
  //   {
  //     title: "Life-Changing Rewards",
  //     description: "Win amazing prizes including gold, vehicles, electronics, and life-altering cash rewards",
  //     icon: "🏆",
  //     gradient: "from-yellow-500/20 to-orange-500/10",
  //   },
  //   {
  //     title: "Build Financial Discipline",
  //     description: "Enjoy exciting rewards while developing healthy and sustainable saving habits",
  //     icon: "📈",
  //     gradient: "from-orange-500/20 to-yellow-500/10",
  //   },
  // ]

   const reasons = [
    {
      title: "Flexible & Accessible",
      description: "Savings plans designed for everyone, with flexible payment options tailored to your lifestyle",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-yellow-100 icon icon-tabler icons-tabler-outline icon-tabler-users-group"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" /><path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M17 10h2a2 2 0 0 1 2 2v1" /><path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M3 13v-1a2 2 0 0 1 2 -2h2" /></svg>,
      gradient: "from-yellow-500/20 to-orange-500/10",
    },
    {
      title: "Fair & Transparent",
      description: "Lucky draws conducted with complete transparency and integrity you can trust",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-yellow-100 icon icon-tabler icons-tabler-outline icon-tabler-sparkles"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z" /></svg>,
      gradient: "from-orange-500/20 to-yellow-500/10",
    },
    {
      title: "Life-Changing Rewards",
      description: "Win amazing prizes including gold, vehicles, electronics, and life-altering cash rewards",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-yellow-100 icon icon-tabler icons-tabler-outline icon-tabler-award"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 9m-6 0a6 6 0 1 0 12 0a6 6 0 1 0 -12 0" /><path d="M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889" /><path d="M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889" /></svg>,
      gradient: "from-yellow-500/20 to-orange-500/10",
    },
    {
      title: "Build Financial Discipline",
      description: "Enjoy exciting rewards while developing healthy and sustainable saving habits",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/80 group-hover:text-yellow-100 icon icon-tabler icons-tabler-outline icon-tabler-trending-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 17l6 -6l4 4l8 -8" /><path d="M14 7l7 0l0 7" /></svg>,
      gradient: "from-orange-500/20 to-yellow-500/10",
    },
  ]

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/5 via-transparent to-orange-500/5 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-5xl sm:text-6xl font-bold text-white mb-6 text-balance">Why Choose Winnerspin?</h2>
          <p className="text-lg text-gray-400 text-balance max-w-2xl mx-auto leading-relaxed">
            Experience the perfect blend of financial discipline and exciting rewards
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="group relative">
              <div
                className={`relative bg-gradient-to-br ${reason.gradient} backdrop-blur-md rounded-2xl p-8 border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-500 h-full hover:shadow-2xl hover:shadow-yellow-500/20 hover:bg-gradient-to-br hover:from-yellow-500/30 hover:to-orange-500/20`}
              >
                <div className="mb-6 inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-yellow-400/20 to-orange-500/20 group-hover:from-yellow-400/40 group-hover:text-yellow-100 group-hover:to-orange-500/40 transition-all duration-300 border border-yellow-500/30 group-hover:border-yellow-500/50 group-hover:shadow-lg group-hover:shadow-yellow-500/30">
                  <span className="text-3xl transition-transform duration-300 ease-out group-hover:scale-110">
                    {reason.icon}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-200 transition-colors duration-300 ">
                  {reason.title}
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                  {reason.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1  bg-gradient-to-r from-transparent via-yellow-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-2xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
