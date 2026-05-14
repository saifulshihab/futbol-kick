// Renders plain-text article content with paragraph breaks and **bold** support.
// No markdown library needed — keeps the bundle small.

interface Segment { text: string; bold: boolean }

function parseLine(line: string): Segment[] {
  const segments: Segment[] = [];
  const parts = line.split(/\*\*(.*?)\*\*/g);
  parts.forEach((part, i) => {
    if (part) segments.push({ text: part, bold: i % 2 === 1 });
  });
  return segments;
}

export default function ArticleContent({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/);

  return (
    <div className="space-y-5 text-brand-muted leading-relaxed text-[15px]">
      {blocks.map((block, bi) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Heading-style lines that start with **text**:
        if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
          return (
            <h3
              key={bi}
              className="text-base font-bold text-brand-white mt-6"
              style={{ fontFamily: "var(--font-poppins)" }}
            >
              {trimmed.replace(/\*\*/g, "")}
            </h3>
          );
        }

        // Bullet list items
        if (trimmed.startsWith("- ")) {
          const items = trimmed.split("\n").filter((l) => l.startsWith("- "));
          return (
            <ul key={bi} className="space-y-2 pl-4">
              {items.map((item, ii) => (
                <li key={ii} className="flex gap-2">
                  <span className="text-brand-yellow mt-1 shrink-0">▸</span>
                  <span>
                    {parseLine(item.slice(2)).map((seg, si) =>
                      seg.bold ? (
                        <strong key={si} className="text-brand-white font-semibold">{seg.text}</strong>
                      ) : (
                        <span key={si}>{seg.text}</span>
                      ),
                    )}
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        // Regular paragraph
        return (
          <p key={bi}>
            {parseLine(trimmed).map((seg, si) =>
              seg.bold ? (
                <strong key={si} className="text-brand-white font-semibold">{seg.text}</strong>
              ) : (
                <span key={si}>{seg.text}</span>
              ),
            )}
          </p>
        );
      })}
    </div>
  );
}
