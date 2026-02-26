const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Software Developer',
      image: '👩‍💻',
      content: 'This app completely transformed how I manage my learning journey. The skill tracking feature is incredible!',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Entrepreneur',
      image: '👨‍💼',
      content: 'Finally, a productivity tool that actually helps me achieve my goals. The analytics are super insightful.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Designer',
      image: '👩‍🎨',
      content: 'Love the weekly reflections feature. It helps me stay mindful and continuously improve my workflow.',
      rating: 5,
    },
  ];

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Loved by Thousands
          </h2>
          <p className="text-lg text-gray-600">
            See what our users have to say about their experience
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 hover:shadow-xl transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="text-4xl">{testimonial.image}</div>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-gray-500">{testimonial.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;