import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const AiMessageFormate = ({ content }) => {
  return (
    <div className="w-full max-w-none break-words text-[15px] leading-7 text-slate-300">

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{

          // HEADINGS

          h1: ({ children }) => (
            <h1 className="mb-5 mt-3 border-b border-slate-700/60 pb-3 text-2xl font-bold tracking-tight text-white">
              {children}
            </h1>
          ),

          h2: ({ children }) => (
            <h2 className="mb-3 mt-7 text-xl font-bold tracking-tight text-white">
              {children}
            </h2>
          ),

          h3: ({ children }) => (
            <h3 className="mb-2 mt-6 text-lg font-semibold text-indigo-200">
              {children}
            </h3>
          ),

          h4: ({ children }) => (
            <h4 className="mb-2 mt-4 font-semibold text-slate-100">
              {children}
            </h4>
          ),

          // PARAGRAPH

          p: ({ children }) => (
            <p className="mb-4 leading-7 text-slate-300 last:mb-0">
              {children}
            </p>
          ),

          // UNORDERED LIST

          ul: ({ children }) => (
            <ul className="mb-4 ml-6 list-disc space-y-2 marker:text-indigo-400">
              {children}
            </ul>
          ),

          // ORDERED LIST

          ol: ({ children }) => (
            <ol className="mb-4 ml-6 list-decimal space-y-2 marker:font-semibold marker:text-violet-400">
              {children}
            </ol>
          ),

          // LIST ITEM

          li: ({ children }) => (
            <li className="pl-1 leading-7 text-slate-300">
              {children}
            </li>
          ),

          // BOLD

          strong: ({ children }) => (
            <strong className="font-semibold text-white">
              {children}
            </strong>
          ),

          // ITALIC

          em: ({ children }) => (
            <em className="text-indigo-200">
              {children}
            </em>
          ),

          // INLINE CODE

          code: ({ children, className }) => {
            const isCodeBlock = className?.includes("language-");

            if (isCodeBlock) {
              return (
                <code
                  className={`${className || ""} block font-mono text-[13px] leading-7 text-indigo-100`}
                >
                  {children}
                </code>
              );
            }

            return (
              <code className="rounded-md border border-indigo-500/20 bg-indigo-500/10 px-1.5 py-0.5 font-mono text-[13px] text-indigo-300">
                {children}
              </code>
            );
          },

          // CODE BLOCK

          pre: ({ children }) => (
            <pre className="my-5 overflow-x-auto rounded-xl border border-slate-700/70 bg-[#0b1020] p-4 text-sm leading-7 shadow-lg shadow-black/10 [&>code]:whitespace-pre">
              {children}
            </pre>
          ),

          // BLOCKQUOTE

          blockquote: ({ children }) => (
            <blockquote className="my-5 rounded-r-lg border-l-[3px] border-indigo-500 bg-indigo-500/[0.06] py-3 pl-4 pr-3 text-slate-300">
              {children}
            </blockquote>
          ),

          // HORIZONTAL LINE

          hr: () => (
            <hr className="my-7 border-slate-700/70" />
          ),

          // LINKS

          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-400 underline decoration-indigo-400/30 underline-offset-4 transition-colors hover:text-violet-300 hover:decoration-violet-300"
            >
              {children}
            </a>
          ),

          // LINE BREAK

          br: () => <br />,

          // TABLE

          table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto rounded-xl border border-slate-700/70 bg-slate-900/40">
              <table className="w-full border-collapse text-left text-sm">
                {children}
              </table>
            </div>
          ),

          thead: ({ children }) => (
            <thead className="bg-gradient-to-r from-indigo-500/15 to-violet-500/15">
              {children}
            </thead>
          ),

          tbody: ({ children }) => (
            <tbody className="divide-y divide-slate-700/60">
              {children}
            </tbody>
          ),

          tr: ({ children }) => (
            <tr className="transition-colors hover:bg-indigo-500/[0.06]">
              {children}
            </tr>
          ),

          th: ({ children }) => (
            <th className="whitespace-nowrap border-b border-slate-700 px-4 py-3 text-left font-semibold text-indigo-200">
              {children}
            </th>
          ),

          td: ({ children }) => (
            <td className="min-w-[150px] px-4 py-3 align-top leading-7 text-slate-300 [&>p]:mb-0">
              {children}
            </td>
          ),

          // STRIKETHROUGH

          del: ({ children }) => (
            <del className="text-slate-500">
              {children}
            </del>
          ),

          // TASK LIST CHECKBOX

          input: ({ checked, ...props }) => (
            <input
              type="checkbox"
              checked={checked}
              readOnly
              className="mr-2 accent-indigo-500"
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default AiMessageFormate;