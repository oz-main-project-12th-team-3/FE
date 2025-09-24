/**
 * 
 * @param apiMethod API 호출 콜백 (예: () => api.get(url))
 * @param method 메서드 이름 (대문자: 'GET', 'DELETE' 등)
 * @param url 엔드포인트 URL (예: '/notifications?status=read')
 * @returns 
 */
export async function handleApiCall<T>(
  apiMethod: () => Promise<any>,  
  method: string,  
  url: string  
): Promise<T> {
  try {
    const res = await apiMethod();
    return res.data;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(`!ERROR! \n method : ${method} \n url : ${url} \n  details: ${message}`);
  }
}