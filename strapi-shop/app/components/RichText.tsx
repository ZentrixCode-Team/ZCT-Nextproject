"use client";

import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";

interface RichTextProps {
  content: BlocksContent;
}

export default function RichText({
  content,
}: RichTextProps) {
  if (!content) {
    return null;
  }

  return (
    <div className="space-y-3 text-sm leading-7 text-slate-400 [&_a]:text-cyan-400 [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:font-semibold [&_strong]:text-white [&_em]:text-slate-300 [&_ul]:ml-5 [&_ul]:list-disc [&_ol]:ml-5 [&_ol]:list-decimal">
      <BlocksRenderer content={content} />
    </div>
  );
}