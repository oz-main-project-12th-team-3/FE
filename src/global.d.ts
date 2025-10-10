declare global {
  // ============ Auth ============
  namespace Auth {
    type loginResponse = {
      detail: string;
      user_id: number;
      email: string;
      expires_in: number;
      access_token: string;
      tfa_required: boolean;
      tfa_step: string;
      temporary_access_token: string | null;
      temporary_refresh_toke: string | null;
      profile_image_url: string | null;
    };
  }

  // ============ Chat ============
  namespace Chat {
    // 채팅 발화자
    type SenderEnum = "user" | "ai";
    // 단일 채팅 로그
    type Log = {
      id: number;
      session: number;
      message: string;
      sender: SenderEnum;
      timestamp: string;
    };
    // 챗 세션
    type Session = {
      id: number;
      user_id: number;
      title: string;
      last_message: string;
      updated_at: string;
    };
    type PatchSession = {
      id: number;
      user_id: number;
      title: string;
      last_message: string;
      updated_at: string;
    };
  }

  // ============ Notification ============
  namespace Noti {
    // 알림 타입
    type Type = {
      id: number;
      code: string;
      description: string;
      default_enabled: boolean;
      created_at: string;
      updated_at: string;
    };
    // 알림
    type Item = {
      id: number;
      title: string;
      message: string;
      link: string;
      is_read: boolean;
      read_at: string;
      created_at: string;
      updated_at: string;
      recipient: number;
      // 알림 생성자(채팅 생성자와는 다름)
      sender: number;
      notification_type: NotificationType;
    };
    // nullable도 안줄거면 patch 타입은 왜 분리?
    type Patch = {
      id: number;
      title: string;
      message: string;
      link: string;
      is_read: boolean;
      read_at: string;
      created_at: string;
      updated_at: string;
      recipient: number;
      sender: number;
      notification_type: NotificationType;
    };
  }

  // ============ User ============
  namespace User {
    type UserProfile = {
      nickname: string;
      profile_image_url: string;
      last_login: string;
    };
    type Item = {
      email: string;
      profile: UserProfile;
    };
    type CreatePasswordRetype = {
      email: string;
      id: number;
      password: string;
      re_password: string;
    };
    type Patched = {
      email: string;
      profile: UserProfile;
    };
    type Activation = {
      uid: string;
      token: string;
    };

    type SendEmailReset = { email: string };

    type UsernameResetConfirm = {
      new_email: string;
    };
    type PasswordResetConfirm = {
      new_password: string;
      new_password_confirm: String;
    };
    // 여기는 또 왜 api명세상 유저네임 세팅 네이밍에
    // 현재비밀번호, 새로운 이메일이 들어가나?
    type SetUsername = {
      current_password: string;
      new_email: string;
    };
    type SetPassword = {
      new_password: string;
      current_password: string;
    };
  }

  // ============ Schedule ============
  namespace Schedule {
    // 스캐줄 형식
    type Item = {
      id: number;
      user: number;
      title: string;
      description: string;
      start_time: string;
      end_time: string;
      is_completed: boolean;
      created_at: string;
      updated_at: string;
    };
    // 일정 알림
    type Reminder = {
      id: number;
      scheduled_time: string;
      sent_at: string;
      status: string;
      created_at: string;
      updated_at: string;
      user: number;
      // NotificationType
      notification: number;
    };
  }

  // ============ Search ============
  namespace Search {
    type Log = {
      id: number;
      user: number;
      keyword: string;
      search_type: string;
      result_count: number;
      clicked_result_id: number;
      created_at: string;
      updated_at: string;
    };
  }

  // 결제

  // ============ Subscription ============
  namespace Subscription {
    type StatusEnum = "active" | "canceled" | "expired" | "pending";
    type Item = {
      id: number;
      user: number;
      plan: number;
      plan_name: string;
      price: string;
      status: StatusEnum;
      remaining_units: number;
      start_date: string;
      end_date: string;
      created_at: string;
      updated_at: string;
    };
  }

  // ============ Plan ============
  namespace Plan {
    type item = {
      id: number;
      name: string;
      description: string;
      price: string;
      billing_cycle: string;
      included_units: number;
      is_active: boolean;
    };
  }

  // ============ API Response ============
  namespace API {
    // type Detail = {
    //   detail?: string | null;
    //   description?: string | null;
    // };
    // Detail, Description => ?

    // 어떤건 Description 이 res 바디로 오고
    // 어떤건 Description 이 주석처럼 쓰이고
    // 혼란하다 진짜...
    // 용어 통일이 안되어 있음 일단 detail로 진행

    // 그냥 Description은 전부 주석 처리.
    // detail도 마찬가지.
    // 프론트 쪽에서 응답 코드만 보고 처리하는게 안전함

    type Paginated<T> = {
      count: number;
      next: string | null;
      previous: string | null;
      results: T[];
    };

    type PageReq = {
      page: number;
      page_size: number;
    };
  }
}

export {};
