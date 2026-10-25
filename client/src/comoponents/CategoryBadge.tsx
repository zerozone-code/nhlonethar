import { getBadgeClass } from "../lib/cagories";

export default function CategoryBadge({ category }: { category: string }) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${getBadgeClass(category)}`}
    >
      {category}
    </span>
  );
}
