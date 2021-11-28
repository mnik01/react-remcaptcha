import { renderHook } from '@testing-library/react-hooks';
import { useRecaptcha } from '../index'
import { ConfigV3, RecaptchaVersionEnum } from '../types';

describe('useRecaptcha v3 tests', () => {
  it('should be defined', () => {
    expect(useRecaptcha).toBeDefined();
  });

  const config: ConfigV3 = {
    version: RecaptchaVersionEnum.V3,
    apiKey: 'lol',
    onError: () => {},
    onLoad: () => {},
  }
  const idealKey = 'TODO'

  it('renders the hook correctly and checks types', () => {
    const { result } = renderHook(() => useRecaptcha(config));

    expect(result.current.execute).toBeDefined()
    expect(result.current.execute).toBeTruthy()
    expect(result.current.execute).toBeInstanceOf(Function)
    expect(typeof result.current.execute).toBe('function');
  });

  // TODO: async code test
  it('Should pass api object filled after load', () => {
  });

  it('Should call onLoad', () => {
  });

  it('Should add google script', () => {
  });

  it('Should call onError', () => {
  });
});
