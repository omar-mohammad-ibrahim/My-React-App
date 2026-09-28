import ActiveFilterChips from "@/components/filters/ActiveFilterChips";

export default function PlpControlBar() {
  return (
    <div className="w-full flex flex-col gap-3">
      <ActiveFilterChips />
    </div>
  );
}
