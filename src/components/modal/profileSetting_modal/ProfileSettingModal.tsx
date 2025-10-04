/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "../../../hooks/useThemeColors";
// import { useProfile } from '../../../hooks/api/useProfile'; // 실제 api
import AccountInfo from "./AccountInfo";
import ProfileImage from "./ProfileImage";
import Nickname from "./Nickname";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";

// 테스트용 더미 훅 (실제 API 대신 사용)
const useProfile = () => {
  const getProfile = async () => {
    return new Promise<{ profile_image_url: string; nickname: string }>(
      (resolve) => {
        setTimeout(() => {
          resolve({
            profile_image_url: "https://i.pravatar.cc/150?img=37",
            nickname: "테스트 유저",
          });
        }, 500);
      }
    );
  };

  const updateProfile = async (data: {
    profile_image_url?: string | null;
    nickname?: string;
  }) => {
    // console.log("프로필 업데이트 시도:", data);
    // 실제 API 대신 콘솔 출력
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        // console.log("업데이트 성공 (더미)", data);
        resolve();
      }, 500);
    });
  };

  return { getProfile, updateProfile };
};

const ProfileSettingsModal = () => {
  const navigate = useNavigate();
  const { getProfile, updateProfile } = useProfile();
  const { modalBackground, inputBorder, scheduleTitleColor } = useThemeColors();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 초기 데이터
  const [initialImageUrl, setInitialImageUrl] = useState<string | null>(null);
  const [initialNickname, setInitialNickname] = useState("");
  const [email, setEmail] = useState("");

  // 현재 편집 중인 데이터
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await getProfile();

      setInitialImageUrl(data.profile_image_url);
      setInitialNickname(data.nickname);
      setEmail("test@example.com"); // TODO: 실제 이메일 정보 연동 필요

      setPreviewImage(data.profile_image_url);
      setNickname(data.nickname);
    } catch (error) {
      toast.error(`프로필 정보를 불러오는데 실패했습니다:${error}`);
      navigate(-1);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (imageUrl: string) => {
    setPreviewImage(imageUrl);
  };

  const handleNicknameChange = (newNickname: string) => {
    setNickname(newNickname);
  };

  // 변경사항 자동 저장 (닉네임 또는 이미지 변경 시)
  useEffect(() => {
    if (loading || saving) return;

    const hasImageChange = previewImage !== initialImageUrl;
    const hasNicknameChange = nickname !== initialNickname;

    if (!hasImageChange && !hasNicknameChange) return;

    const saveChanges = async () => {
      try {
        setSaving(true);

        const updateData: {
          profile_image_url?: string | null;
          nickname?: string;
        } = {};
        if (hasImageChange) updateData.profile_image_url = previewImage;
        if (hasNicknameChange) updateData.nickname = nickname;

        await updateProfile(updateData);

        // 초기값 업데이트
        if (hasImageChange) setInitialImageUrl(previewImage);
        if (hasNicknameChange) setInitialNickname(nickname);

        // 플로팅 바 업데이트
        window.dispatchEvent(new Event("profile-updated"));
      } catch (error) {
        toast.error(`프로필 자동 저장 실패:${error}`);
        // 실패 시 원래 값으로 되돌리기
        setPreviewImage(initialImageUrl);
        setNickname(initialNickname);
      } finally {
        setSaving(false);
      }
    };

    // 디바운스 (500ms)
    const timeoutId = setTimeout(saveChanges, 500);
    return () => clearTimeout(timeoutId);
  }, [
    previewImage,
    nickname,
    initialImageUrl,
    initialNickname,
    loading,
    saving,
  ]);

  const modalStyle = css`
    background: ${modalBackground};
    border-radius: 16px;
    padding: 32px;
    width: 90vw;
    max-width: 500px;
  `;

  const headerStyle = css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
  `;

  const titleStyle = css`
    font-size: 24px;
    font-weight: 600;
    color: ${scheduleTitleColor};
  `;

  const subtitleStyle = css`
    font-size: 14px;
    color: ${scheduleTitleColor};
    opacity: 0.7;
    margin-bottom: 32px;
  `;

  const loadingStyle = css`
    text-align: center;
    padding: 40px;
    color: ${scheduleTitleColor};
  `;

  const hrStyle = css`
    border: 0.01rem solid ${inputBorder};
    margin-bottom: 2rem;
  `;

  if (loading) {
    return (
      <div css={modalStyle}>
        <div css={loadingStyle}>로딩 중...</div>
      </div>
    );
  }

  return (
    <div css={modalStyle}>
      <div css={headerStyle}>
        <FiUser size={24} />
        <h2 css={titleStyle}>프로필 설정</h2>
      </div>
      <p css={subtitleStyle}>닉네임과 프로필 이미지를 변경할 수 있습니다.</p>

      {/* 계정 정보 */}
      <AccountInfo
        nickname={nickname}
        email={email}
        profileImageUrl={previewImage}
      />

      <hr css={hrStyle} />

      {/* 프로필 이미지 */}
      <ProfileImage
        previewImage={previewImage}
        nickname={nickname}
        onImageChange={handleImageChange}
        disabled={saving}
      />

      <hr css={hrStyle} />

      {/* 닉네임 */}
      <Nickname
        nickname={nickname}
        onNicknameChange={handleNicknameChange}
        disabled={saving}
      />
    </div>
  );
};

export default ProfileSettingsModal;
