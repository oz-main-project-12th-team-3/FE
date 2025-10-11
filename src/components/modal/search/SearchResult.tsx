/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { BsChatDots } from "react-icons/bs";

export function SearchResult({  result }: { result: Chat.SearchRes }) {
  return (
    <div css={searchResultCss}>
      <div className="result-header">
        <BsChatDots className="chat-icon" />
        <span className="result-id">#{result.id}</span>
      </div>
      
      <div className="result-content">
        <p className="result-title">{result.session}</p>
        <p className="result-preview">
          {result.message}
        </p>
      </div>

    </div>
  );
}

const searchResultCss = css`
  width: 100%;
  padding: 1rem;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #3b82f6;
    box-shadow: 0 2px 8px rgba(59, 130, 246, 0.1);
  }

  .result-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.75rem;

    .chat-icon {
      color: #6b7280;
      font-size: 1.125rem;
    }

    .result-id {
      font-size: 0.875rem;
      color: #9ca3af;
      font-weight: 500;
    }
  }

  .result-content {
    margin-bottom: 0.75rem;

    .result-title {
      font-size: 1rem;
      font-weight: 600;
      color: #111827;
      margin-bottom: 0.5rem;
      line-height: 1.4;
    }

    .result-preview {
      font-size: 0.875rem;
      color: #6b7280;
      line-height: 1.5;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }


`;