interface AILoadingStateProps {
  message?: string;
}

export default function AILoadingState({
  message = 'AI is crafting your ad copy...',
}: AILoadingStateProps) {
  return (
    <div className="flex items-center gap-3 p-4 rounded-xl bg-lavender-50 border border-lavender-200">
      <div className="h-5 w-5 border-2 border-orange border-t-transparent rounded-full animate-spin" />
      <span className="text-sm font-medium text-gray-600">{message}</span>
    </div>
  );
}
