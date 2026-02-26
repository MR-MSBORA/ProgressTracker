import { FiUserPlus, FiTarget, FiTrendingUp, FiAward } from 'react-icons/fi';

const HowItWorks = () => {
  const steps = [
    {
      icon: FiUserPlus,
      title: 'Sign Up Free',
      description: 'Create your account in seconds. No credit card required.',
      color: 'blue',
    },
    {
      icon: FiTarget,
      title: 'Set Your Goals',
      description: 'Define what you want to achieve and break it into manageable tasks.',
      color: 'purple',
    },
    {
      icon: FiTrendingUp,
      title: 'Track Progress',
      description: 'Log your daily activities, practice sessions, and completed tasks.',
      color: 'green',
    },
    {
      icon: FiAward,
      title: 'Achieve More',
      description: 'Watch your streaks grow and gain insights to optimize your productivity.',
      color: 'orange',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get started in 4 simple steps and transform your productivity
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-green-200 -z-10"></div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-${step.color}-100 rounded-2xl flex items-center justify-center mb-6`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-600`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;