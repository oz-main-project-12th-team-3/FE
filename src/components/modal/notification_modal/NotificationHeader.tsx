/** @jsxImportSource @emotion/react */
import { IoNotifications, IoClose } from "react-icons/io5";
import { css } from "@emotion/react";

type TabType = "all" | "unread";

interface NotificationHeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  unreadCount: number;
  totalCount: number;
  onClose?: () => void;
  onMarkAllRead: () => void;
}

const header = css`
  padding: 20px 24px 16px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
`;

const headerTop = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const title = css`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
`;

const closeButton = css`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const subtitle = css`
  color: #999;
  font-size: 14px;
  margin: 0;
`;

const tabContainer = css`
  display: flex;
  border-bottom: 1px solid #f0f0f0;
`;

const tab = css`
  flex: 1;
  padding: 16px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #666;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;

  &:hover {
    background: #fafafa;
  }
`;

const activeTabStyle = css`
  color: #1a1a1a;
  font-weight: 500;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #007aff;
  }
`;

const badge = css`
  background: #007aff;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
  line-height: 1;
`;

const topActionBar = css`
  display: flex;
  justify-content: flex-end;
  padding: 12px 24px;
  border-bottom: 1px solid #f0f0f0;
`;

const markAllReadButton = css`
  font-size: 13px;
  color: #007aff;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;

  &:hover {
    background: #f5f5f5;
  }
`;

const NotificationHeader = ({
  activeTab,
  setActiveTab,
  unreadCount,
  totalCount,
  onClose,
  onMarkAllRead,
}: NotificationHeaderProps) => {
  return (
    <div>
      {/* 상단 타이틀 */}
      <div css={header}>
        <div css={headerTop}>
          <div css={title}>
            <IoNotifications size={20} />
            알림
          </div>
          {onClose && (
            <button css={closeButton} onClick={onClose}>
              <IoClose size={20} />
            </button>
          )}
        </div>
        <p css={subtitle}>
          {unreadCount > 0
            ? `${unreadCount}개의 읽지 않은 알림`
            : "모든 알림을 확인했습니다"}
        </p>
      </div>

      {/* 탭 */}
      <div css={tabContainer}>
        <button
          css={[tab, activeTab === "all" && activeTabStyle]}
          onClick={() => setActiveTab("all")}
        >
          전체
        </button>
        <button
          css={[tab, activeTab === "unread" && activeTabStyle]}
          onClick={() => setActiveTab("unread")}
        >
          읽지 않음
          {unreadCount > 0 && <span css={badge}>{unreadCount}</span>}
        </button>
      </div>

      {/* 전체 읽음 처리 */}
      <div css={topActionBar}>
        <button css={markAllReadButton} onClick={onMarkAllRead}>
          전체 읽음 처리
        </button>
      </div>
    </div>
  );
};

export default NotificationHeader;
