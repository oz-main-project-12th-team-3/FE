import { apiPlan } from '../../api/plan/plan';
import type { Plan } from '../../api/plan/plan';
import { dummyPlans } from '../../api/dummyData/plan';

const USE_DUMMY_API = true; // false로 변경하면 실제 API 호출

export const usePlans = () => {
  /**
   * 모든 요금제 조회
   */
  const getAllPlans = async (): Promise<Plan[]> => {
    console.log('usePlans.getAllPlans 호출');

    if (USE_DUMMY_API) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('Dummy API - 요금제 목록:', dummyPlans);
          resolve(dummyPlans);
        }, 500);
      });
    }

    return await apiPlan.GET.plans();
  };

  /**
   * 특정 요금제 상세 조회
   */
  const getPlanById = async (id: number): Promise<Plan> => {
    console.log('usePlans.getPlanById 호출:', id);

    if (USE_DUMMY_API) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const plan = dummyPlans.find((p) => p.id === id);
          if (!plan) {
            reject(new Error('요금제를 찾을 수 없습니다.'));
            return;
          }
          console.log('Dummy API - 요금제 상세:', plan);
          resolve(plan);
        }, 500);
      });
    }

    return await apiPlan.GET.planById(id);
  };

  /**
   * 요금제별 기능 목록 생성 ( 예시 )
   */
  const getPlanFeatures = (plan: Plan): string[] => {
    const features: string[] = [];

    // 전송 횟수 관련
    if (plan.included_units === null) {
      features.push('무제한 전송 가능');
    } else if (plan.included_units > 0) {
      features.push(`월 ${plan.included_units}회 전송 가능`);
    }

    // 가격대별 기능 설명
    if (plan.price === 0) {
      // 무료 요금제
      features.push('기본 거래 내역 조회');
      features.push('이메일 고객 지원');
      features.push('제한된 통화 지원 (USD, EUR, GBP)');
      features.push('기본 보안 기능 제공');
    } else if (plan.price < 15) {
      // 스탠다드 요금제
      features.push('거래 내역 조회 및 내보내기 기능');
      features.push('우선순위 이메일 지원');
      features.push('확장된 통화 지원');
      features.push('고급 보안 기능 제공');
    } else {
      // 프리미엄 요금제
      features.push('우선 처리되는 무제한 전송');
      features.push('종합 거래 분석 기능');
      features.push('24시간 프리미엄 고객 지원');
      features.push('모든 통화 완전 지원');
      features.push('강화된 보안 기능');
    }

    return features;
  };

  return {
    getAllPlans,
    getPlanById,
    getPlanFeatures,
  };
};