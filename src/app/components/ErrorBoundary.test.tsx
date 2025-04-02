import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary, { ErrorBoundaryWithGlobalErrorHandler } from '@/app/components/ErrorBoundary';

// 테스트를 위한 에러 발생 컴포넌트
const ErrorThrowingComponent = ({ shouldThrow = true }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('테스트 에러 발생');
  }
  return <div>에러가 발생하지 않음</div>;
};

// 콘솔 에러 억제
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe('ErrorBoundary 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('자식 컴포넌트에서 에러가 발생하면 오류 UI를 표시한다', () => {
    // ErrorBoundary와 에러 발생 컴포넌트 렌더링
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // 오류 UI 확인
    expect(screen.getByText('오류가 발생했습니다')).toBeInTheDocument();
    expect(screen.getByText(/테스트 에러 발생/)).toBeInTheDocument();
    expect(screen.getByText('다시 시도')).toBeInTheDocument();
  });

  test('다시 시도 버튼을 클릭하면 자식 컴포넌트를 다시 렌더링한다', () => {
    // State를 관리할 컴포넌트
    const TestStateComponent = () => {
      return (
        <ErrorBoundary>
          <ErrorThrowingComponent />
        </ErrorBoundary>
      );
    };

    render(<TestStateComponent />);

    // 오류 UI 표시 확인
    expect(screen.getByText('오류가 발생했습니다')).toBeInTheDocument();

    // 다시 시도 버튼 클릭
    fireEvent.click(screen.getByText('다시 시도'));

    // 에러가 다시 발생하므로 오류 UI가 계속 표시되어야 함
    expect(screen.getByText('오류가 발생했습니다')).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  test('fallback prop을 제공하면 커스텀 오류 UI를 표시한다', () => {
    // 커스텀 fallback UI 렌더링
    render(
      <ErrorBoundary fallback={<div>커스텀 오류 화면입니다</div>}>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    // 커스텀 오류 UI 확인
    expect(screen.getByText('커스텀 오류 화면입니다')).toBeInTheDocument();

    // 기본 오류 UI가 표시되지 않음
    expect(screen.queryByText('오류가 발생했습니다')).not.toBeInTheDocument();
  });

  test('에러가 없으면 자식 컴포넌트를 정상적으로 렌더링한다', () => {
    // 에러가 발생하지 않는 컴포넌트 렌더링
    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow={false} />
      </ErrorBoundary>
    );

    // 자식 컴포넌트가 정상적으로 렌더링 됨
    expect(screen.getByText('에러가 발생하지 않음')).toBeInTheDocument();

    // 오류 UI가 표시되지 않음
    expect(screen.queryByText('오류가 발생했습니다')).not.toBeInTheDocument();
  });
});

describe('ErrorBoundaryWithGlobalErrorHandler 컴포넌트', () => {
  test('전역 에러 핸들링 이벤트 리스너를 등록한다', () => {
    // addEventListener 모킹
    const addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

    const { unmount } = render(
      <ErrorBoundaryWithGlobalErrorHandler>
        <div>테스트 컴포넌트</div>
      </ErrorBoundaryWithGlobalErrorHandler>
    );

    // 이벤트 리스너 등록 확인
    expect(addEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));

    // 컴포넌트 언마운트
    unmount();

    // 이벤트 리스너 제거 확인
    expect(removeEventListenerSpy).toHaveBeenCalledWith('error', expect.any(Function));

    // 스파이 정리
    addEventListenerSpy.mockRestore();
    removeEventListenerSpy.mockRestore();
  });

  test('자식 컴포넌트를 정상적으로 렌더링한다', () => {
    render(
      <ErrorBoundaryWithGlobalErrorHandler>
        <div>글로벌 에러 핸들러 테스트</div>
      </ErrorBoundaryWithGlobalErrorHandler>
    );

    // 자식 컴포넌트가 정상적으로 렌더링 됨
    expect(screen.getByText('글로벌 에러 핸들러 테스트')).toBeInTheDocument();
  });
});
