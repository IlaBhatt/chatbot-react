import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/arta.css';

const CustomMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
    // Pre-process the input string
    // const formattedText = text
    //   .replace(/\\n/g, '\n') // Convert literal \n to actual line breaks
    //   .replace(/"([^"]+)"/g, '**$1**') // Convert text inside double quotes to bold
    //   .replace(/~~~(.*?)~~~/gs, '```$1```'); // Convert text inside triple tildes to code blocks
  
    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
            code: ({node, ...props}) => <code style={{color: '#31bacd'}} {...props} />,
            a: ({node, ...props}) => <a style={{color: '#fbe3d7'}} {...props} />
          }}
      >
        {text}
      </ReactMarkdown>
    );
  };

  export default CustomMarkdownRenderer;