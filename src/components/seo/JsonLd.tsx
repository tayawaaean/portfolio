// Server component: renders a JSON-LD <script> for structured data.
// Accepts a single schema object or an array of them.
type Schema = Record<string, unknown>;

export default function JsonLd({ data }: { data: Schema | Schema[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe to inline; no user input is interpolated.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
