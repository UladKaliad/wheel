export const WHEEL_COLORS = [
  '#6B7280', '#9CA3AF', '#D1D5DB', '#4B5563', '#374151',
  '#6366F1', '#8B5CF6', '#EC4899', '#EF4444', '#F59E0B',
  '#10B981', '#06B6D4', '#8B5A2B', '#84CC16', '#A855F7',
  '#DC2626', '#EA580C', '#CA8A04', '#65A30D', '#059669',
  '#0891B2', '#7C3AED', '#C2410C', '#16A34A', '#2563EB',
  '#7C2D12', '#92400E', '#166534', '#1E40AF', '#581C87'
];

export const generateRandomColor = (): string => {
  return WHEEL_COLORS[Math.floor(Math.random() * WHEEL_COLORS.length)];
};

export const generateUniqueColors = (count: number): string[] => {
  const colors: string[] = [];
  const availableColors = [...WHEEL_COLORS];

  for (let i = 0; i < count; i++) {
    if (availableColors.length === 0) {
      availableColors.push(...WHEEL_COLORS);
    }
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    colors.push(availableColors.splice(randomIndex, 1)[0]);
  }

  return colors;
};