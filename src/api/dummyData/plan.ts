import type {Plan} from "../../api/plan/plan"

export const dummyPlans: Plan[] = [
  {
    id: 1,
    name: "Free Plan",
    description: "기본 무료 플랜",
    price: 0,
    billing_cycle: "monthly",
    included_units: 2,
    is_active: true,
  },
  {
    id: 2,
    name: "Standard Plan",
    description: "표준 유료 플랜",
    price: 9900,
    billing_cycle: "monthly",
    included_units: null,
    is_active: true,
  },
  {
    id: 3,
    name: "Premium Plan",
    description: "프리미엄 플랜",
    price: 19990,
    billing_cycle: "monthly",
    included_units: null,
    is_active: true,
  },
];