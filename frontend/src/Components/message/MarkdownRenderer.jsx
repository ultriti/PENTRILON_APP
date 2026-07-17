import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const MarkdownRenderer = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="md-h1">{children}</h1>
        ),

        h2: ({ children }) => (
          <h2 className="md-h2">{children}</h2>
        ),

        h3: ({ children }) => (
          <h3 className="md-h3">{children}</h3>
        ),

        p: ({ children }) => (
          <p className="md-p">{children}</p>
        ),

        ol: ({ children }) => (
          <ol className="md-ol">{children}</ol>
        ),

        ul: ({ children }) => (
          <ul className="md-ul">{children}</ul>
        ),

        li: ({ children }) => (
          <li className="md-li">{children}</li>
        ),

        strong: ({ children }) => (
          <strong className="md-strong">{children}</strong>
        ),

        em: ({ children }) => (
          <em className="md-em">{children}</em>
        ),

        code({ inline, children }) {
          return inline ? (
            <code className="md-inline-code">
              {children}
            </code>
          ) : (
            <pre className="md-pre">
              <code>{children}</code>
            </pre>
          );
        },
      }}
    >
      {text}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;