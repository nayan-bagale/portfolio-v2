import { Fragment, type ReactNode } from "react";
import type { CodeEntry } from "@/content/home";

type Props = {
  filename: string;
  /** Name of the constant shown in the snippet. */
  name: string;
  entries: CodeEntry[];
};

function Str({ children }: { children: string }) {
  return <span className="text-moss">&quot;{children}&quot;</span>;
}

function renderValue(entry: CodeEntry): ReactNode {
  const { value } = entry;
  if (typeof value === "boolean") return <span className="text-accent">{String(value)}</span>;
  if (typeof value === "string") return <Str>{value}</Str>;
  if (entry.multiline) {
    return (
      <>
        {"[\n"}
        {value.map((item) => (
          <Fragment key={item}>
            {"    "}
            <Str>{item}</Str>
            {",\n"}
          </Fragment>
        ))}
        {"  ]"}
      </>
    );
  }
  return (
    <>
      [
      {value.map((item, index) => (
        <Fragment key={item}>
          {index > 0 && ", "}
          <Str>{item}</Str>
        </Fragment>
      ))}
      ]
    </>
  );
}

/** Editor-style card that prints an object as highlighted code. */
export function CodeCard({ filename, name, entries }: Props) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-card shadow-[0_30px_60px_-30px_rgb(28_25_23/0.25)]">
      <div className="flex items-center gap-1.5 border-b border-line px-[18px] py-3.5">
        <i className="size-2.5 rounded-full bg-line-strong" />
        <i className="size-2.5 rounded-full bg-line-strong" />
        <i className="size-2.5 rounded-full bg-line-strong" />
        <span className="ml-auto font-mono text-[11px] leading-4 font-medium text-muted">{filename}</span>
      </div>
      <pre className="m-0 p-6 font-mono text-[13px] leading-6 font-medium whitespace-pre-wrap text-body">
        <span className="text-accent">const</span> {name} = {"{\n"}
        {entries.map((entry) => (
          <Fragment key={entry.key}>
            {"  "}
            {entry.key}: {renderValue(entry)}
            {",\n"}
          </Fragment>
        ))}
        {"}; "}
        <span className="inline-block h-4 w-2 animate-blink bg-accent align-[-3px]" />
      </pre>
    </div>
  );
}
