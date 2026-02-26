import { 
  FiCheckSquare, 
  FiTarget, 
  FiBook, 
  FiEdit3, 
  FiBarChart2, 
  FiTrendingUp,
  FiZap,
  FiShield,
  FiSmartphone
} from 'react-icons/fi';

const Features = () => {
  const mainFeatures = [
    {
      icon: FiCheckSquare,
      title: 'Task Management',
      description: 'Organize your daily tasks with priority levels, due dates, and status tracking. Get daily scores based on completion.',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiTarget,
      title: 'Goal Tracking',
      description: 'Set and track personal or professional goals. Monitor your progress with visual indicators and auto-completion.',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      icon: FiBook,
      title: 'Skill Development',
      description: 'Log practice sessions for any skill. Track hours, see your progress, and level up automatically as you improve.',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      icon: FiEdit3,
      title: 'Weekly Reflections',
      description: 'Take time every Sunday to reflect on your week. Document wins, challenges, lessons, and set intentions.',
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      icon: FiBarChart2,
      title: 'Powerful Analytics',
      description: 'Visualize your productivity with streak tracking, heatmaps, consistency scores, and smart insights.',
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500',
    },
    {
      icon: FiTrendingUp,
      title: 'Progress Insights',
      description: 'Get AI-powered insights about your productivity patterns. Discover your most productive days and optimize your workflow.',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-500',
    },
  ];

  const additionalFeatures = [
    {
      icon: FiZap,
      title: 'Lightning Fast',
      description: 'Built with modern tech for instant load times and smooth interactions.',
    },
    {
      icon: FiShield,
      title: 'Secure & Private',
      description: 'Your data is encrypted and protected. We never share your information.',
    },
    {
      icon: FiSmartphone,
      title: 'Mobile Friendly',
      description: 'Fully responsive design works perfectly on any device, anywhere.',
    },
  ];

  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Boost Productivity
            </span>
          </h2>
          <p className="text-lg text-gray-600">
            Powerful features designed to help you achieve more, learn faster, and stay motivated.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl p-8 border-2 border-gray-100 hover:border-transparent hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-8 h-8 text-white" />
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>

              {/* Hover Effect Line */}
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${feature.gradient} rounded-full mt-6 transition-all duration-300`}></div>
            </div>
          ))}
        </div>

        {/* Additional Features */}
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-center mb-12">
            And Much More...
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md">
                  <feature.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;