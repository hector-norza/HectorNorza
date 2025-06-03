import { useContrastColors } from '../../hooks/useContrastColors';

interface SkillCardProps {
  name: string;
  level: number;
}

export default function SkillCard({ name, level }: SkillCardProps) {
  const colors = useContrastColors();

  return (
    <div className={`p-4 rounded-lg ${colors.background.card} ${colors.border} border`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`font-medium ${colors.heading}`}>{name}</span>
        <span className={`text-sm ${colors.secondary}`}>{level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  );
}