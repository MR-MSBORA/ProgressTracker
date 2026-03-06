import { useSkill } from '../../context/SkillContext';
import SkillCard from './SkillCard';
import { FiBook } from 'react-icons/fi';

const SkillsList = ({ onLogPractice }) => {
  const { skills, loading } = useSkill();

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="w-8 h-8 border-4 border-green-200 dark:border-green-800 border-t-green-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (skills.length === 0) {
    return (
      <div className="text-center py-12">
        <FiBook className="w-16 h-16 text-green-400 dark:text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
          No skills yet
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Add your first skill to start tracking your learning journey!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {skills.map(skill => (
        <SkillCard key={skill._id} skill={skill} onLogPractice={onLogPractice} />
      ))}
    </div>
  );
};

export default SkillsList;