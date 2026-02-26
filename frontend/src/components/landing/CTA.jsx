import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const CTA = () => {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Ready to Boost Your Productivity?
        </h2>
        <p className="text-xl text-blue-100 mb-10">
          Join thousands of users who are achieving more every day
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="group bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all flex items-center gap-2"
          >
            Start Free Today
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <span className="text-white/80 text-sm">
            No credit card required • Free forever
          </span>
        </div>
      </div>
    </section>
  );
};

export default CTA;