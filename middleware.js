// 50% 확률로 API 호출이 실패하도록 하는 미들웨어
module.exports = (req, res, next) => {
  // OPTIONS 요청은 항상 성공하도록 처리 (CORS 프리플라이트 요청)
  if (req.method === 'OPTIONS') {
    return next();
  }

  // 50% 확률로 실패 응답 반환
  if (Math.random() < 0.5) {
    // 다양한 HTTP 상태 코드로 실패 응답 생성
    const errorStatusCodes = [400, 401, 403, 404, 500];
    const randomIndex = Math.floor(Math.random() * errorStatusCodes.length);
    const statusCode = errorStatusCodes[randomIndex];

    // 상태 코드에 따른 에러 메시지
    let errorMessage;
    switch (statusCode) {
      case 400:
        errorMessage = '잘못된 요청입니다.';
        break;
      case 401:
        errorMessage = '인증이 필요합니다.';
        break;
      case 403:
        errorMessage = '접근이 금지되었습니다.';
        break;
      case 404:
        errorMessage = '요청한 리소스를 찾을 수 없습니다.';
        break;
      case 500:
      default:
        errorMessage = '서버 내부 오류가 발생했습니다.';
        break;
    }

    // 에러 응답 반환
    res.status(statusCode).json({
      error: errorMessage,
      path: req.path,
      method: req.method,
      timestamp: new Date().toISOString(),
    });
    return;
  }

  // 50%는 정상 처리
  next();
};
